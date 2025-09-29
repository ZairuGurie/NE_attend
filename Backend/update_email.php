<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php'; // your db connection file

$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data['user_id'] ?? null;
$email   = $data['email'] ?? '';

if (!$user_id || empty($email)) {
    echo json_encode(["error" => "User ID and Email are required"]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["error" => "Invalid email format"]);
    exit;
}

$sql = "UPDATE users SET email=? WHERE user_id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $email, $user_id);

if ($stmt->execute()) {
    echo json_encode(["message" => "✅ Email saved successfully"]);
} else {
    echo json_encode(["error" => "❌ Database error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
