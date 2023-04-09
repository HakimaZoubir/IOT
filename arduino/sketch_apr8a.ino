
void setup() {
  
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(A3, OUTPUT);
  pinMode(A0, INPUT);
  Serial.begin(115200);

}
void loop() {
 
  digitalWrite(A3, HIGH); 
  digitalWrite(LED_BUILTIN, HIGH);  
  delay(1000);                      
  digitalWrite(LED_BUILTIN, LOW);   
  digitalWrite(A3, LOW);   
  delay(1000);              
  int luminosite = analogRead(A0);
  Serial.println("Luminosite: " + String(luminosite));

}
