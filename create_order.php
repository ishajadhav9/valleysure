<?php
header("Access-Control-Allow-Origin: https://www.valleysurenutrition.in");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

// Razorpay credentials
$key_id = ""; // ✅ Your live Key ID
$key_secret = ""; // 🔴 Replace this with your Razorpay live Key Secret

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['amount']) || !is_numeric($data['amount']) || $data['amount'] <= 0) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid amount"]);
    exit;
}

// Convert amount to paise
$amount_in_paise = intval($data['amount'] * 100);

$receipt_id = "order_rcptid_" . rand(1000, 9999);

$order_data = [
    "amount" => $amount_in_paise,
    "currency" => "INR",
    "receipt" => $receipt_id,
    "payment_capture" => 1
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.razorpay.com/v1/orders');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_USERPWD, $key_id . ':' . $key_secret);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($order_data));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

$response = curl_exec($ch);
$http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($http_status != 200) {
    http_response_code($http_status);
    echo json_encode(["error" => "Unable to create Razorpay order"]);
    exit;
}

// Success - return Razorpay order details to JS
echo $response;
exit;


















