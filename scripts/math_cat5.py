# Categories 5 through 10

def get_ratio_proportion(k):
    # Ratios & Proportions
    data = [
        # 0
        ("Two investment partners, Amanda and Brian, divide an annual corporate dividend of $150,000 in the ratio 3 : 2. How much does Amanda receive?",
         "$90,000", ["$85,000", "$95,000", "$100,000", "$80,000"],
         ["Total parts = 3 + 2 = 5.",
          "Value of 1 part = 150,000 / 5 = $30,000.",
          "Amanda's share (3 parts) = 3 * 30,000 = **$90,000**."]),
        # 1
        ("In an architecture firm, the ratio of senior designers to junior associates is 4 : 5. If there are 36 senior designers, how many junior associates work at the firm?",
         "45", ["40", "44", "48", "50"],
         ["Ratio = 4 / 5. Senior = 36.",
          "Value of 1 ratio part = 36 / 4 = 9.",
          "Junior associates = 5 * 9 = **45**."]),
        # 2
        ("A mortar mixture requires sand and cement in the ratio 5 : 2. If a mason uses 14 bags of cement, how many bags of sand are needed?",
         "35", ["30", "32", "36", "40"],
         ["Cement ratio = 2 parts = 14 bags -> 1 part = 7 bags.",
          "Sand = 5 parts = 5 * 7 = **35 bags**."]),
        # 3
        ("Three software founders divide 1,200 equity shares in the ratio 5 : 4 : 3. How many shares does the founder with the smallest allocation receive?",
         "300", ["280", "320", "350", "250"],
         ["Total parts = 5 + 4 + 3 = 12.",
          "1 part = 1,200 / 12 = 100 shares.",
          "Smallest share = 3 * 100 = **300 shares**."]),
        # 4
        ("On an engineering schematic, a scale of 1 inch : 15 feet is used. If a structural beam measures 4.5 inches on the drawing, what is its actual length in feet?",
         "67.5 feet", ["65.0 feet", "66.0 feet", "68.0 feet", "70.0 feet"],
         ["Actual length = 4.5 * 15 = **67.5 feet**."]),
        # 5
        ("In a survey of 120 consumers, the ratio of people who prefer brand A to brand B is 7 : 5. How many more people prefer brand A than brand B?",
         "20", ["15", "18", "24", "25"],
         ["Total parts = 7 + 5 = 12.",
          "1 part = 120 / 12 = 10 people.",
          "Difference in parts = 7 - 5 = 2 parts = 2 * 10 = **20 people**."]),
        # 6
        ("A bronze alloy consists of copper, tin, and zinc in the ratio 8 : 3 : 1 by weight. How many kilograms of tin are needed to produce 240 kg of this alloy?",
         "60 kg", ["50 kg", "55 kg", "65 kg", "70 kg"],
         ["Total parts = 8 + 3 + 1 = 12.",
          "1 part = 240 / 12 = 20 kg.",
          "Tin (3 parts) = 3 * 20 = **60 kg**."]),
        # 7
        ("The ratio of male to female applicants for a technical fellowship is 3 : 4. If 56 female candidates applied, what was the total number of applicants?",
         "98", ["92", "94", "96", "100"],
         ["4 parts = 56 -> 1 part = 14.",
          "Total parts = 3 + 4 = 7 parts = 7 * 14 = **98 applicants**."]),
        # 8
        ("A recipe scales flour, sugar, and butter in the ratio 4 : 2 : 1. If 600 grams of flour are used, how many grams of butter are required?",
         "150 grams", ["120 grams", "140 grams", "160 grams", "175 grams"],
         ["Flour = 4 parts = 600 g -> 1 part = 150 g.",
          "Butter = 1 part = **150 grams**."]),
        # 9
        ("Two corporate divisions generate revenue in the ratio 7 : 3. If Division 1 generated $280 million, what was the total combined revenue of both divisions?",
         "$400 million", ["$380 million", "$390 million", "$410 million", "$420 million"],
         ["7 parts = $280M -> 1 part = $40M.",
          "Total = (7 + 3) * $40M = 10 * $40M = **$400 million**."]),
        # 10
        ("A sum of $640 is divided among Alex, Ben, and Charlie in the ratio 1 : 3 : 4. How much does Ben receive?",
         "$240", ["$220", "$230", "$250", "$260"],
         ["Total parts = 1 + 3 + 4 = 8.",
          "1 part = 640 / 8 = $80.",
          "Ben's share = 3 * 80 = **$240**."]),
        # 11
        ("In an orchard, the ratio of apple trees to peach trees is 5 : 3. If there are 45 peach trees, how many apple trees are there?",
         "75", ["70", "72", "80", "85"],
         ["3 parts = 45 -> 1 part = 15.",
          "Apple trees = 5 * 15 = **75**."]),
        # 12
        ("The perimeter of a triangle is 72 cm, and the lengths of its sides are in the ratio 3 : 4 : 5. What is the length of the longest side?",
         "30 cm", ["28 cm", "32 cm", "34 cm", "36 cm"],
         ["Total parts = 3 + 4 + 5 = 12.",
          "1 part = 72 / 12 = 6 cm.",
          "Longest side = 5 * 6 = **30 cm**."]),
        # 13
        ("A graphic artist scales a digital logo maintaining a 16 : 9 aspect ratio. If the new width is 800 pixels, what is the new height?",
         "450 pixels", ["420 pixels", "440 pixels", "460 pixels", "480 pixels"],
         ["16 parts = 800 px -> 1 part = 50 px.",
          "Height = 9 * 50 = **450 pixels**."]),
        # 14
        ("A university lecture hall has a ratio of domestic to international students of 7 : 2. If there are 36 international students, what is the total enrollment in the hall?",
         "162", ["150", "156", "168", "172"],
         ["2 parts = 36 -> 1 part = 18.",
          "Total = (7 + 2) * 18 = 9 * 18 = **162 students**."]),
        # 15
        ("Two gear wheels mesh together. Wheel A has 24 teeth and Wheel B has 40 teeth. What is the simplified ratio of the number of teeth on Wheel A to Wheel B?",
         "3 : 5", ["2 : 3", "3 : 4", "4 : 5", "5 : 8"],
         ["Divide both by GCD(24, 40) = 8: 24/8 = 3, 40/8 = 5 -> **3 : 5**."]),
        # 16
        ("An estate of $900,000 is bequeathed to three charities in the ratio 2 : 3 : 5. How much does the charity with the largest allocation receive?",
         "$450,000", ["$400,000", "$425,000", "$475,000", "$500,000"],
         ["Total parts = 2 + 3 + 5 = 10.",
          "1 part = $90,000.",
          "Largest allocation (5 parts) = 5 * 90,000 = **$450,000**."]),
        # 17
        ("In a corporate department of 84 employees, the ratio of analysts to managers is 5 : 2. How many analysts work in the department?",
         "60", ["56", "58", "62", "64"],
         ["Total parts = 5 + 2 = 7.",
          "1 part = 84 / 7 = 12.",
          "Analysts = 5 * 12 = **60**."]),
        # 18
        ("A map has a scale where 2 cm represents 50 km. How many kilometers are represented by 7 cm on the map?",
         "175 km", ["160 km", "170 km", "180 km", "185 km"],
         ["1 cm represents 50 / 2 = 25 km.",
          "7 cm represents 7 * 25 = **175 km**."]),
        # 19
        ("A chemical compound uses Nitrogen and Hydrogen in a 1 : 3 mass ratio. If 12 grams of Nitrogen are used, how many grams of the total compound are formed?",
         "48 grams", ["40 grams", "44 grams", "45 grams", "50 grams"],
         ["1 part Nitrogen = 12 g.",
          "Total compound = 1 + 3 = 4 parts = 4 * 12 = **48 grams**."]),
        # 20
        ("The ratio of winning to losing games for a team in a season was 5 : 3. If the team played 64 games in total with no ties, how many games did they win?",
         "40", ["36", "38", "42", "45"],
         ["Total parts = 5 + 3 = 8.",
          "1 part = 64 / 8 = 8 games.",
          "Wins = 5 * 8 = **40**."]),
        # 21
        ("An investment fund allocates capital across bonds, equities, and real estate in the ratio 4 : 5 : 1. If real estate receives $20 million, how much does the fund invest in equities?",
         "$100 million", ["$80 million", "$90 million", "$110 million", "$120 million"],
         ["1 part (Real estate) = $20M.",
          "Equities (5 parts) = 5 * $20M = **$100 million**."]),
        # 22
        ("A cocktail recipe calls for cranberry juice, sparkling water, and lime cordial in the ratio 6 : 3 : 1. To make 500 mL of the beverage, how much cranberry juice in mL is needed?",
         "300 mL", ["280 mL", "310 mL", "320 mL", "250 mL"],
         ["Total parts = 6 + 3 + 1 = 10.",
          "1 part = 500 / 10 = 50 mL.",
          "Cranberry juice = 6 * 50 = **300 mL**."]),
        # 23
        ("In a school club, the ratio of boys to girls is 3 : 5. If there are 16 more girls than boys, how many students are in the club?",
         "64", ["56", "60", "68", "72"],
         ["Difference = 5 - 3 = 2 parts = 16 students -> 1 part = 8 students.",
          "Total students = (3 + 5) * 8 = 8 * 8 = **64**."]),
        # 24
        ("A high-protein trail mix contains almonds, cashews, and raisins in the ratio 4 : 3 : 2. If a bag weighs 450 grams, what is the weight of the almonds?",
         "200 grams", ["180 grams", "190 grams", "210 grams", "225 grams"],
         ["Total parts = 4 + 3 + 2 = 9.",
          "1 part = 450 / 9 = 50 g.",
          "Almonds = 4 * 50 = **200 grams**."]),
        # 25
        ("The ratio of the angles of a triangle is 2 : 3 : 4. What is the measure of the smallest angle in degrees?",
         "40°", ["30°", "35°", "45°", "50°"],
         ["Sum of angles in triangle = 180°.",
          "Total parts = 2 + 3 + 4 = 9.",
          "1 part = 180° / 9 = 20°.",
          "Smallest angle = 2 * 20° = **40°**."]),
        # 26
        ("A construction company mixes gravel and sand in the ratio 7 : 4. If 28 tons of sand are used, how many tons of gravel are needed?",
         "49 tons", ["45 tons", "48 tons", "52 tons", "56 tons"],
         ["4 parts = 28 tons -> 1 part = 7 tons.",
          "Gravel = 7 * 7 = **49 tons**."])
    ]
    return data[k % len(data)]

print("Ratio loaded")
