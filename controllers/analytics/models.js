class AnalyticsRequest {
    startDate
    endDate
    metrics
    incomeType

    static fromJson(data) {
        return Object.assign(new AnalyticsRequest(), data)
    }
}

module.exports.AnalyticsRequest = AnalyticsRequest;

