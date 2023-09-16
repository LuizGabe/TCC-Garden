
#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>

const char* WIFI_SSID = "Bruna";     // Insira o nome da sua rede Wi-Fi
const char* WIFI_PASSWORD = "gabriel14179"; // Insira a senha da sua rede Wi-Fi

const char* SERVER_URL = "http://192.168.1.113:3000/deviceInfo/add"; // Insira a URL do servidor de destino
const char* AUTH_TOKEN = "";              // Insira o token de autorização

#define SOIL_MOISTURE_SENSOR_PIN A0 // Pino do sensor de umidade do solo

void setup() {
  Serial.begin(115200);..
  delay(1000);

  Serial.println("Conectando ao WiFi...");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
  }

  Serial.println("Conexão WiFi estabelecida!");
}

void loop() {
  int soilMoisture = analogRead(SOIL_MOISTURE_SENSOR_PIN);

  Serial.print("Umidade do Solo: ");
  Serial.println(soilMoisture);

  sendSensorData(soilMoisture);

  delay(5000); // Aguarda 5 segundos antes de enviar outra leitura
}

void sendSensorData(int soilMoisture) {
  WiFiClientSecure client;

  Serial.print("Conectando a ");
  Serial.println(SERVER_URL);

  if (client.connect(SERVER_URL, 443)) {
    Serial.println("Conexão bem-sucedida!");

    String postData = "umidade_solo=" + String(soilMoisture);

    String request = "POST /requisicao HTTP/1.1\r\n";
    request += "Host: exemplo.com\r\n";
    request += "Authorization: Bearer " + String(AUTH_TOKEN) + "\r\n";
    request += "Content-Type: application/x-www-form-urlencoded\r\n";
    request += "Content-Length: " + String(postData.length()) + "\r\n";
    request += "\r\n";
    request += postData;

    client.print(request);

    Serial.println("Requisição enviada!");

    // Aguarda a resposta do servidor
    while (client.connected()) {
      String line = client.readStringUntil('\n');
      if (line == "\r") {
        Serial.println("Resposta do servidor:");
        while (client.available()) {
          String response = client.readStringUntil('\n');
          Serial.println(response);
        }
        break;
      }
    }
  } else {
    Serial.println("Falha na conexão ao servidor!");
  }

  client.stop();
}
