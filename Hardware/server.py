from flask import Flask, render_template, request, jsonify, Response
import json
import time
import threading

app = Flask(__name__)

attendance_active = False
message_queue = []
clients = []

@app.route('/')
def index():
    return render_template('prof.html')

@app.route('/start', methods=['POST'])
def start_attendance():
    global attendance_active
    attendance_active = True
    print("Attendance session STARTED")
    

    message_queue.append("Attendance session started! Scanning for students...")
    
    return jsonify({"status": "started", "message": "Attendance session started!"})

@app.route('/beacon', methods=['POST'])
def handle_beacon():
    global attendance_active
    
    if not attendance_active:
        print("Attendance not active - ignoring beacon")
        return "Attendance not active", 200
    
    try:
        data = request.get_json()
        student_id = data.get('student_id', 'unknown')
        print(f"Student {student_id} is present!")
        
        
        message = f"Student {student_id} is here! Verify attendance?"
        message_queue.append(message)
        
        return "OK", 200
    except Exception as e:
        print(f"Error handling beacon: {e}")
        return "Error", 500

def get_new_messages():
    """Get any new messages from the queue"""
    global message_queue
    if message_queue:
        messages = message_queue.copy()
        message_queue.clear()
        return messages
    return []

@app.route('/stream')
def stream():
    def event_stream():
        client_id = id(threading.current_thread())
        print(f"SSE client connected: {client_id}")
        
        
        yield f"data: {json.dumps({'message': 'SSE Connected'})}\n\n"
        
        last_check = time.time()
        while True:
            
            if time.time() - last_check > 1:
                messages = get_new_messages()
                for message in messages:
                    yield f"data: {json.dumps({'message': message})}\n\n"
                last_check = time.time()
            
            time.sleep(0.1)  
    
    return Response(event_stream(), mimetype='text/event-stream',
                   headers={
                       'Cache-Control': 'no-cache',
                       'Connection': 'keep-alive',
                       'Access-Control-Allow-Origin': '*',
                       'Access-Control-Allow-Headers': 'Cache-Control'
                   })

@app.route('/status')
def status():
    return jsonify({
        "server": "running",
        "attendance_active": attendance_active,
        "message_queue_length": len(message_queue)
    })

if __name__ == '__main__':
    print("=== Attendance System Server ===")
    print("Server starting on http://localhost:5000")
    print("Available endpoints:")
    print("  GET  /         - Professor dashboard")
    print("  POST /start    - Start attendance session")
    print("  POST /beacon   - Receive student detection")
    print("  GET  /stream   - SSE for real-time updates")
    print("  GET  /status   - Server status")
    app.run(host='0.0.0.0', port=5000, debug=True)