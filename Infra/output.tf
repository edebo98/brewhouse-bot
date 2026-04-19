output "instance_id" {
  description = "Use this ID to connect via SSM"
  value       = aws_instance.brewhouse.id
}

output "jenkins_url" {
  description = "Open this in your browser once setup is done"
  value       = "http://${aws_instance.brewhouse.public_ip}:8080"
}

output "public_ip" {
  description = "Your EC2 public IP"
  value       = aws_instance.brewhouse.public_ip
}

output "ssm_connect_command" {
  description = "Run this to connect to your instance"
  value       = "aws ssm start-session --target ${aws_instance.brewhouse.id}"
}