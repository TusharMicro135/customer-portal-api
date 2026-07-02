variable "name" { type = string }
resource "aws_vpc" "this" { cidr_block = "10.42.0.0/16"; enable_dns_hostnames = true; tags = { Name = var.name } }
output "vpc_id" { value = aws_vpc.this.id }
