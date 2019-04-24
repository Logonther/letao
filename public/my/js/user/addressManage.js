$(function () {
    var cityPicker = new mui.PopPicker({layer: 3});
    cityPicker.setData(cityData);

    var addressId = location.search.split('=')[1];

    if (addressId) {
        $('h3').html('修改收货地址');
        getAddressData(function (data) {
            var detail = data[addressId - 1];
            $('[name="recipients"]').val(detail.recipients);
            $('[name="postCode"]').val(detail.postCode);
            $('[name="address"]').val(detail.address);
            $('[name="addressDetail"]').val(detail.addressDetail);
        });
    } else {
        $('h3').html('添加收货地址');
    }

    $('.submit').on('tap', function () {
        var data = {
            recipients: $.trim($('[name="recipients"]').val()),
            postcode: $.trim($('[name="postCode"]').val()),
            address: $.trim($('[name="address"]').val()),
            addressDetail: $.trim($('[name="addressDetail"]').val())
        };
        if (!data.recipients) {
            mui.toast('请输入收货人');
            return false;
        }
        if (!data.postcode) {
            mui.toast('请输入邮编');
            return false;
        }

        if (!/^\d{6}$/.test(data.postcode)) {
            mui.toast('请输入合法邮编');
            return false;
        }

        if (!data.address) {
            mui.toast('请选择省市区');
            return false;
        }

        if (!data.addressDetail) {
            mui.toast('请输入详细地址');
            return false;
        }

        var editUrl = '';
        var tip = '';
        if (addressId) {
            editUrl = '/address/updateAddress';
            tip = '修改';
            data.id = addressId;
        } else {
            editUrl = '/address/addAddress';
            tip = '添加';
        }
        editAddress(data, editUrl, function () {
            console.log(111);
            mui.toast(tip + '成功！');
            location.href = 'address.html';
        });
    })

    $('[name="address"]').on('tap', function () {
        cityPicker.show(function (items) {
            if (items[0].text == items[1].text) {
                items[0].text = '';
            }
            $('[name="address"]').val(items[0].text + items[1].text + (items[2].text || ''));
            //返回 false 可以阻止选择框的关闭
        });
    });
})

var getAddressData = function (callback) {
    WT.loginAjax({
        type: 'get',
        url: '/address/queryAddress',
        data: {},
        dataType: 'json',
        success: function (data) {
            callback && callback(data);
        }
    });
};

var editAddress = function (data, url, callback) {
    WT.loginAjax({
        url: url,
        type: 'post',
        data: data,
        dataType: 'json',
        beforeSend: function () {
            $('.submit').html('正在提交...');
        },
        success: function (data) {
            callback && callback(data);
        },
        error: function () {
            $('.submit').html('提交');
        }
    });
};