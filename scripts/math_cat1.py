# Math Categories 1 through 8 (27 unique scenarios each)

def get_speed_distance(k):
    # 27 unique scenarios
    data = [
        # 0
        ("A high-speed maglev train travels 360 miles between two capitals at 180 mph. On the return trip, inclement weather reduces its speed to 120 mph. What is the average speed for the entire round trip?",
         "144 mph", ["150 mph", "140 mph", "148 mph", "135 mph"],
         ["Total distance = 360 + 360 = 720 miles.",
          "Outbound time = 360 / 180 = 2 hours. Return time = 360 / 120 = 3 hours.",
          "Total time = 2 + 3 = 5 hours.",
          "Average speed = Total distance / Total time = 720 / 5 = **144 mph**."]),
        # 1
        ("A river cargo barge travels 72 miles downstream with a 3 mph river current in 4 hours. How many hours will it take to return the same 72 miles upstream against the 3 mph current?",
         "6 hours", ["5.5 hours", "6.5 hours", "7 hours", "8 hours"],
         ["Effective downstream speed = 72 / 4 = 18 mph.",
          "Still water speed of barge = 18 - 3 = 15 mph.",
          "Effective upstream speed = 15 - 3 = 12 mph.",
          "Upstream time = 72 / 12 = **6 hours**."]),
        # 2
        ("A courier on an electric motorcycle departs from a depot at 8:00 AM traveling at 40 mph. At 8:30 AM, an express highway patrol car departs from the same depot along the same highway traveling at 60 mph to deliver an urgent dispatch. At what time will the patrol car overtake the courier?",
         "9:30 AM", ["9:15 AM", "9:45 AM", "10:00 AM", "9:00 AM"],
         ["Courier head start = 30 minutes = 0.5 hours.",
          "Head start distance = 40 mph * 0.5 h = 20 miles.",
          "Relative overtaking speed = 60 - 40 = 20 mph.",
          "Time to overtake = 20 miles / 20 mph = 1 hour.",
          "Overtake time = 8:30 AM + 1 hour = **9:30 AM**."]),
        # 3
        ("A commercial turboprop plane with an airspeed of 280 mph flies from Airport A to Airport B against a 40 mph headwind in 3 hours. How many hours will the return flight take with the same 40 mph wind as a tailwind?",
         "2.25 hours", ["2.5 hours", "2.0 hours", "2.75 hours", "1.8 hours"],
         ["Effective outbound speed against headwind = 280 - 40 = 240 mph.",
          "Distance between airports = 240 mph * 3 h = 720 miles.",
          "Effective return speed with tailwind = 280 + 40 = 320 mph.",
          "Return time = 720 / 320 = **2.25 hours** (2 hours 15 minutes)."]),
        # 4
        ("Two automated parcel drones depart simultaneously from distribution centers located 90 miles apart, flying directly toward each other. Drone Alpha flies at 35 mph and Drone Beta flies at 25 mph. How many minutes after takeoff will they cross paths?",
         "90 minutes", ["75 minutes", "80 minutes", "100 minutes", "105 minutes"],
         ["Combined closing speed = 35 + 25 = 60 mph.",
          "Time in hours = 90 / 60 = 1.5 hours.",
          "Convert to minutes: 1.5 * 60 = **90 minutes**."]),
        # 5
        ("A commuter drives 45 miles to a regional office at an average speed of 60 mph, and then drives back along the same route during evening rush hour at 30 mph. What is the commuter's overall average speed for the round trip?",
         "40 mph", ["45 mph", "42 mph", "38 mph", "36 mph"],
         ["Total distance = 45 + 45 = 90 miles.",
          "Morning time = 45 / 60 = 0.75 hours (45 min).",
          "Evening time = 45 / 30 = 1.50 hours (90 min).",
          "Total time = 0.75 + 1.50 = 2.25 hours.",
          "Average speed = 90 / 2.25 = **40 mph**."]),
        # 6
        ("A mountain hiker ascends a 12-mile wilderness trail at a steady pace of 2 mph, and descends the same trail at 4 mph. What was the average speed of the hiker over the entire 24-mile trek?",
         "2.67 mph", ["3.0 mph", "2.5 mph", "2.8 mph", "3.2 mph"],
         ["Ascent time = 12 / 2 = 6 hours.",
          "Descent time = 12 / 4 = 3 hours.",
          "Total time = 6 + 3 = 9 hours.",
          "Average speed = 24 / 9 = 8/3 = **2.67 mph**."]),
        # 7
        ("Two cyclists start at opposite ends of a 48-mile paved trail and ride toward each other. Cyclist 1 pedals at 14 mph and Cyclist 2 pedals at 10 mph. How many miles will Cyclist 1 have ridden when they meet?",
         "28 miles", ["24 miles", "26 miles", "30 miles", "32 miles"],
         ["Combined speed = 14 + 10 = 24 mph.",
          "Time until meeting = 48 / 24 = 2 hours.",
          "Distance by Cyclist 1 = 14 mph * 2 h = **28 miles**."]),
        # 8
        ("An express subway train travels 6 miles between terminal stations in exactly 6 minutes, including a 1-minute stop at an intermediate station. What was the train's average running speed while in motion?",
         "72 mph", ["60 mph", "65 mph", "70 mph", "80 mph"],
         ["Total running time in motion = 6 min - 1 min = 5 minutes.",
          "5 minutes = 5 / 60 hours = 1/12 hour.",
          "Average speed = Distance / Time = 6 / (1/12) = **72 mph**."]),
        # 9
        ("A passenger ferry crosses a 15-mile coastal sound in 45 minutes. What is the ferry's speed in miles per hour?",
         "20 mph", ["18 mph", "22 mph", "24 mph", "25 mph"],
         ["Time in hours = 45 / 60 = 0.75 hours.",
          "Speed = 15 / 0.75 = **20 mph**."]),
        # 10
        ("Two runners run on a 400-meter oval track starting from the same line simultaneously in opposite directions. Runner A runs at 5 m/s and Runner B runs at 3 m/s. After how many seconds will they meet for the first time?",
         "50 seconds", ["45 seconds", "55 seconds", "60 seconds", "40 seconds"],
         ["Combined relative speed = 5 + 3 = 8 m/s.",
          "Time to meet = Distance / Relative speed = 400 / 8 = **50 seconds**."]),
        # 11
        ("A freight train measuring 250 meters in length travels at 20 m/s. How many seconds does it take for the entire train to completely clear a 350-meter bridge?",
         "30 seconds", ["25 seconds", "28 seconds", "35 seconds", "40 seconds"],
         ["Total distance to clear = Train length + Bridge length = 250 + 350 = 600 meters.",
          "Time = 600 / 20 = **30 seconds**."]),
        # 12
        ("A motorist leaves Town X at 9:00 AM traveling at 50 mph toward Town Y. A second motorist leaves Town X at 10:00 AM along the same highway at 75 mph. At what time will the second motorist catch the first?",
         "12:00 PM", ["11:30 AM", "12:30 PM", "1:00 PM", "11:45 AM"],
         ["First motorist distance lead at 10:00 AM = 50 miles.",
          "Relative speed = 75 - 50 = 25 mph.",
          "Time to overtake = 50 / 25 = 2 hours.",
          "10:00 AM + 2 hours = **12:00 PM**."]),
        # 13
        ("A motorboat can travel at 16 mph in still water. If it travels 45 miles downstream with a 4 mph current, how long does the trip take?",
         "2.25 hours", ["2.0 hours", "2.5 hours", "2.8 hours", "3.0 hours"],
         ["Downstream speed = 16 + 4 = 20 mph.",
          "Time = 45 / 20 = 9/4 = **2.25 hours** (2 hours 15 minutes)."]),
        # 14
        ("An electric vehicle travels 180 miles on a highway using 45 kWh of battery energy. What is the vehicle's efficiency in miles per kilowatt-hour?",
         "4.0 miles/kWh", ["3.5 miles/kWh", "4.2 miles/kWh", "4.5 miles/kWh", "3.8 miles/kWh"],
         ["Efficiency = Distance / Energy = 180 / 45 = **4.0 miles/kWh**."]),
        # 15
        ("Two runners run in the same direction on a 500-meter circular track. Runner X runs at 6 m/s and Runner Y runs at 4 m/s. Starting from the same point, after how many seconds will Runner X lap Runner Y for the first time?",
         "250 seconds", ["200 seconds", "240 seconds", "275 seconds", "300 seconds"],
         ["Relative separation speed = 6 - 4 = 2 m/s.",
          "Distance to lap = 1 full lap = 500 meters.",
          "Time = 500 / 2 = **250 seconds**."]),
        # 16
        ("A delivery van travels the first 60 miles of a journey at 40 mph and the remaining 90 miles at 60 mph. What is the average speed for the entire 150-mile journey?",
         "50 mph", ["48 mph", "52 mph", "54 mph", "46 mph"],
         ["Time for first leg = 60 / 40 = 1.5 hours.",
          "Time for second leg = 90 / 60 = 1.5 hours.",
          "Total time = 1.5 + 1.5 = 3.0 hours.",
          "Average speed = 150 / 3 = **50 mph**."]),
        # 17
        ("A surveillance helicopter flies around the perimeter of a square military base measuring 15 miles on each side at an average speed of 120 mph. How many minutes does one complete patrol take?",
         "30 minutes", ["25 minutes", "28 minutes", "32 minutes", "35 minutes"],
         ["Perimeter of square = 4 * 15 = 60 miles.",
          "Time in hours = 60 / 120 = 0.5 hours.",
          "0.5 hours = **30 minutes**."]),
        # 18
        ("A cross-country skier glides across a frozen lake at 9 km/h for 20 minutes, then through woods at 6 km/h for 40 minutes. What is the total distance covered in kilometers?",
         "7 km", ["6.5 km", "7.5 km", "8 km", "6 km"],
         ["Lake distance = 9 * (20/60) = 3 km.",
          "Woods distance = 6 * (40/60) = 4 km.",
          "Total distance = 3 + 4 = **7 km**."]),
        # 19
        ("A sailboat sails 24 nautical miles due East, then turns due North and sails 10 nautical miles. How far is the sailboat from its starting harbor in a straight line?",
         "26 nautical miles", ["25 nautical miles", "27 nautical miles", "28 nautical miles", "34 nautical miles"],
         ["Right triangle hypotenuse: \\(d = \\sqrt{24^2 + 10^2} = \\sqrt{576 + 100} = \\sqrt{676}\\).",
          "\\(\\sqrt{676} =\\) **26 nautical miles**."]),
        # 20
        ("A tram ascends a 1,200-meter mountain incline at 4 m/s and returns down the incline at 6 m/s. What is the total round-trip time in seconds, excluding passenger loading stops?",
         "500 seconds", ["480 seconds", "520 seconds", "540 seconds", "450 seconds"],
         ["Ascent time = 1,200 / 4 = 300 seconds.",
          "Descent time = 1,200 / 6 = 200 seconds.",
          "Total time = 300 + 200 = **500 seconds**."]),
        # 21
        ("A motorist drives 120 miles in 2 hours and 30 minutes. What was the average speed in miles per hour?",
         "48 mph", ["46 mph", "50 mph", "52 mph", "45 mph"],
         ["2 hours 30 minutes = 2.5 hours.",
          "Speed = 120 / 2.5 = **48 mph**."]),
        # 22
        ("A runner completes a 10-kilometer road race in exactly 45 minutes. What was the runner's average pace per kilometer in minutes and seconds?",
         "4 minutes 30 seconds", ["4 minutes 15 seconds", "4 minutes 45 seconds", "5 minutes 00 seconds", "4 minutes"],
         ["Pace = 45 minutes / 10 km = 4.5 minutes/km.",
          "0.5 minutes = 30 seconds.",
          "Pace = **4 minutes 30 seconds** per km."]),
        # 23
        ("Two ships depart simultaneously from a port. Ship Alpha sails North at 12 knots and Ship Beta sails East at 16 knots. How many nautical miles apart are they after 1 hour?",
         "20 nautical miles", ["18 nautical miles", "22 nautical miles", "24 nautical miles", "28 nautical miles"],
         ["After 1 hour: North distance = 12 nm, East distance = 16 nm.",
          "Distance = \\(\\sqrt{12^2 + 16^2} = \\sqrt{144 + 256} = \\sqrt{400} =\\) **20 nautical miles**."]),
        # 24
        ("A cyclist accelerates uniformly from rest to a speed of 10 m/s over a distance of 50 meters. What was the constant acceleration in m/s²?",
         "1.0 m/s²", ["0.8 m/s²", "1.2 m/s²", "1.5 m/s²", "2.0 m/s²"],
         ["Kinematic formula: \\(v^2 = u^2 + 2as\\).",
          "\\(10^2 = 0 + 2a(50) \\implies 100 = 100a \\implies a =\\) **1.0 m/s²**."]),
        # 25
        ("A passenger rides an airport moving walkway measuring 100 meters long. The walkway moves at 1.5 m/s. If the passenger walks forward on the walkway at 1.0 m/s, how many seconds will it take to reach the end?",
         "40 seconds", ["35 seconds", "45 seconds", "50 seconds", "30 seconds"],
         ["Combined speed relative to ground = 1.5 + 1.0 = 2.5 m/s.",
          "Time = 100 / 2.5 = **40 seconds**."]),
        # 26
        ("An intercity train travels at 75 mph. How many feet does the train travel in 4 seconds? (1 mile = 5,280 feet)",
         "440 feet", ["400 feet", "420 feet", "460 feet", "480 feet"],
         ["Convert 75 mph to ft/s: 75 * 5280 / 3600 = 75 * 22 / 15 = 110 ft/s.",
          "Distance in 4 seconds = 110 * 4 = **440 feet**."])
    ]
    return data[k % len(data)]

print("Speed distance loaded")
