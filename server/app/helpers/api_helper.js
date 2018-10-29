response_success = function (data = null) {
    if (data!=null)
    return {
        success : true,
        data: data
    }
    else
        return {
        success : true
    }
};