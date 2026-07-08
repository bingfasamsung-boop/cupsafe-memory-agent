from flask import Flask, jsonify, request

app = Flask(__name__)


@app.route("/", defaults={"path": ""}, methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"])
@app.route("/<path:path>", methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"])
def cupsafe(path):
    payload = {
        "service": "CupSafe Memory Agent",
        "runtime": "Alibaba Cloud Function Compute Web Function",
        "region": "cn-hangzhou",
        "function": "cupsafe-memory-agent",
        "qwenProvider": "Alibaba Cloud DashScope / Qwen",
        "safety": "No private keys, no wallet signatures, no transaction execution",
        "status": "ok",
        "path": "/" + path if path else "/",
    }
    return jsonify(payload)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=9000)
