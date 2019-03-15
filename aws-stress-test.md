# AWS Proxy Stress Test Results

## Setup

```
Clients: 1000/second

Get Request 1: http://ec2-18-223-124-192.us-east-2.compute.amazonaws.com/

Get Request 2: http://ec2-18-223-124-192.us-east-2.compute.amazonaws.com/reviews/<random number between 1-10000000>
```

## Result

```
Avg Response Time: 5031ms

Min/Max Response Time: 77 / 20022 ms

Success Responses: 28769

Timeout Responses: 1830

400/500 Code Response:	0 / 0
```