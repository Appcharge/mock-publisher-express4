class GetOrdersRequest {
    startDate
    endDate
    recordLimit
    offset
    statuses

    static fromJson(data) {
        return Object.assign(new GetOrdersRequest(), data)
    }
}

module.exports.GetOrdersRequest = GetOrdersRequest

