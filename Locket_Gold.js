var req = $request;

const joinDate = "2025-02-03T01:01:01Z";
const expireDate = "2099-01-01T01:01:01Z";

const opt = {
    url: "https://api.revenuecat.com/v1/product_entitlement_mapping",
    headers: {
        'Authorization': req.headers["authorization"],
        'X-Platform': 'iOS',
        'User-Agent': req.headers["user-agent"]
    }
};

$httpClient.get(opt, (err, res, data) => {
    const ent = JSON.parse(data);
    let json = {
        "request_date_ms": 1704070861000,
        "request_date": joinDate,
        "subscriber": {
            "first_seen": joinDate,
            "original_application_version": "1.100.0",
            "last_seen": joinDate,
            "original_purchase_date": joinDate,
            "original_app_user_id": "70B24288-83C4-4035-B001-572285B21AE1",
            "entitlements": {},
            "subscriptions": {}
        }
    };

    Object.entries(ent.product_entitlement_mapping).forEach(([id, { product_identifier, entitlements }]) => {
        entitlements.forEach(ent => {
            let data = {
                "purchase_date": joinDate,
                "original_purchase_date": joinDate,
                "expires_date": expireDate,
                "is_sandbox": false,
                "ownership_type": "PURCHASED",
                "store": "app_store",
                "product_identifier": product_identifier
            };
            json.subscriber.entitlements[ent] = data;
            json.subscriber.subscriptions[product_identifier] = { ...data };
        });
    });

    $done({ body: JSON.stringify(json) });
});
