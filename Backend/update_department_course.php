<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data['user_id'] ?? null;
$department_id = $data['department_id'] ?? null;
$course_id = $data['course_id'] ?? null;

if (!$user_id || !$department_id || !$course_id) {
    echo json_encode(["error" => "User ID, Department ID, and Course ID are required"]);
    exit;
}

$sql = "UPDATE users SET department_id=?, course_id=? WHERE user_id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iii", $department_id, $course_id, $user_id);

if ($stmt->execute()) {
    echo json_encode(["message" => "✅ Department and Course saved successfully"]);
} else {
    echo json_encode(["error" => "❌ Database error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
