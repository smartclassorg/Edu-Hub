#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEScan.h>
#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "Pellissery";
const char* password = "71aj20sa#";
const char* serverURL = "http://192.168.100.45:5000/beacon";

void setup() {
  Serial.begin(115200);
  
  
  BLEDevice::init("");  
  

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi");
  }
  Serial.println("Connected to WiFi");
}

void loop() {
  
  BLEScan* pScan = BLEDevice::getScan();
  pScan->setActiveScan(true); 
  pScan->setInterval(100);
  pScan->setWindow(99);
  

  BLEScanResults* results = pScan->start(5, false); 
  
  if (results) {
    Serial.print("Found ");
    Serial.print(results->getCount());
    Serial.println(" devices");
    
    bool foundStudent = false;
    
    for(int i = 0; i < results->getCount(); i++) {
      BLEAdvertisedDevice device = results->getDevice(i);
      
      
      Serial.print("Device ");
      Serial.print(i);
      Serial.print(": ");
      if (device.haveName()) {
        Serial.print("Name='");
        Serial.print(device.getName().c_str());
        Serial.print("'");
      } else {
        Serial.print("No Name");
      }
      Serial.print(", RSSI=");
      Serial.println(device.getRSSI());
      
      
      if (device.haveName() && device.getName() == "Student-ID-123") {
        Serial.println("*** Found the student's badge! ***");
        sendDetectionToServer();
        foundStudent = true;
      }
    }
    
    if (!foundStudent) {
      Serial.println("Student badge not found in this scan.");
    }
    
  } else {
    Serial.println("Scan failed or no devices found.");
  }
  
  pScan->clearResults(); 
  delay(5000); 
}

void sendDetectionToServer() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverURL);
    http.addHeader("Content-Type", "application/json");
    String payload = "{\"student_id\": \"123\"}";
    
    int httpResponseCode = http.POST(payload);
    
    if (httpResponseCode > 0) {
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
    } else {
      Serial.print("Error in HTTP request: ");
      Serial.println(httpResponseCode);
    }
    http.end();
  } else {
    Serial.println("WiFi not connected!");
  }
}