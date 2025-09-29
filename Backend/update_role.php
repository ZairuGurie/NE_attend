<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php'; // your database connection file

$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data['user_id'] ?? null;
$role    = $data['role'] ?? '';

if (!$user_id || empty($role)) {
    echo json_encode(["error" => "User ID and Role are required"]);
    exit;
}

// Map role string to role_id based on your roles table
$roleMap = [
    "student"    => 1,
    "instructor" => 2,
    "admin"      => 3
];

if (!array_key_exists($role, $roleMap)) {
    echo json_encode(["error" => "Invalid role"]);
    exit;
}

$role_id = $roleMap[$role];

$sql = "UPDATE users SET role_id=? WHERE user_id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $role_id, $user_id);

if ($stmt->execute()) {
    echo json_encode(["message" => "✅ Role saved successfully"]);
} else {
    echo json_encode(["error" => "❌ Database error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
