
void setup() {
  pinMode(A3, OUTPUT);
  pinMode(A0, INPUT);
  Serial.begin(115200);
}

void loop() {

  int luminosite = analogRead(A0);
  delay(1000);
  Serial.println(luminosite);

Serial.println("Enter data:");
  if(Serial.available() != 0) {     //wait for data available
    String teststr = Serial.readString();  //read until timeout
    teststr.trim();                        // remove any \r \n whitespace at the end of the String
    if(teststr == "on") {
      digitalWrite(A3, HIGH);
    } else if(teststr == "off") {
      digitalWrite(A3, LOW);
    }
  }

  
}
