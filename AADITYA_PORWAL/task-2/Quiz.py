

cnt = 0

print("Welcome to the Maths Quiz!")
print("Answer the following questions:\n")


print("1. What is the value of π (pi) approximately?")
print("a) 2.14\nb) 3.14\nc) 4.13\nd) 3.41")
ans = input("Your answer: ").lower()
if ans == "b":
    print("Correct!\n")
    cnt += 1
else:
    print("Incorrect! The correct answer is b) 3.14\n")

print("2. Solve: 7 + 6 × 2 = ?")
print("a) 26\nb) 20\nc) 19\nd) 14")
ans = input("Your answer: ").lower()
if ans == "c":
    print("Correct!\n")
    cnt += 1
else:
    print("Incorrect! The correct answer is c) 19\n")


print("3. What is the square root of 144?")
print("a) 10\nb) 11\nc) 12\nd) 14")
ans= input("Your answer: ").lower()
if ans == "c":
    print("Correct!\n")
    cnt += 1
else:
    print("Incorrect! The correct answer is c) 12\n")


print("4. Zero is an even number. True or False?")
ans = input("Your answer (True/False): ").lower()
if ans== "true":
    print("Correct!\n")
    cnt += 1
else:
    print("Incorrect! The correct answer is True\n")


print("5. What is the value of 15 × 4?")
ans = input("Your answer: ")
if ans== "60":
    print("Correct!\n")
    cnt += 1
else:
    print("Incorrect! The correct answer is 60\n")


print("The Final score is :" ,cnt,"/5")