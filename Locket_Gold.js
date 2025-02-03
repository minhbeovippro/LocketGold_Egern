var request = $request;

const options = {
    url: "https://api.revenuecat.com/v1/product_entitlement_mapping",
    headers: {
        'Authorization': request.headers["authorization"],
        'X-Platform': 'iOS',
        'User-Agent': request.headers["user-agent"]
    }
};

$httpClient.get(options, function(error, newResponse, data) {
    const ent = JSON.parse(data);

    let jsonToUpdate = {
        "request_date_ms": 1704070861000,
        "request_date": "2025-02-03T01:01:01Z",
        "subscriber": {
            "first_seen": "2025-02-03T01:01:01Z",
            "original_application_version": "1.100.0",
            "last_seen": "2025-02-03T01:01:01Z",
            "original_purchase_date": "2025-02-03T01:01:01Z",
            "original_app_user_id": "70B24288-83C4-4035-B001-572285B21AE1",
            "entitlements": {},
            "subscriptions": {}
        }
    };

    Object.entries(ent.product_entitlement_mapping).forEach(([entitlementId, { product_identifier, entitlements }]) => {
        entitlements.forEach(entitlement => {
            const commonData = {
                "purchase_date": "2025-02-03T01:01:01Z",
                "original_purchase_date": "2025-02-03T01:01:01Z",
                "expires_date": "2099-01-01T01:01:01Z",
                "is_sandbox": false,
                "ownership_type": "PURCHASED",
                "store": "app_store",
                "product_identifier": product_identifier
            };

            jsonToUpdate.subscriber.entitlements[entitlement] = commonData;
            jsonToUpdate.subscriber.subscriptions[product_identifier] = { ...commonData, "purchase_date": "2025-02-03T01:01:01Z" };
        });
    });

    $done({body: JSON.stringify(jsonToUpdate)});
});
