# Categories 4 through 8 (27 unique scenarios each)

def get_profit_loss(k):
    # Profit & Loss
    data = [
        # 0
        ("An antique dealer purchases a vintage desk for $400 and sells it for $500. What is the percentage profit on the cost price?",
         "25.0%", ["20.0%", "22.5%", "28.0%", "30.0%"],
         ["Profit = $500 - $400 = $100.",
          "Profit percentage on cost = (100 / 400) * 100% = **25.0%**."]),
        # 1
        ("An auto reseller sells a motorcycle for $4,500, incurring a 10% loss on the original acquisition cost. What was the original cost?",
         "$5,000", ["$4,950", "$5,100", "$5,200", "$4,800"],
         ["Selling price = 0.90 * Cost.",
          "Cost = $4,500 / 0.90 = **$5,000**."]),
        # 2
        ("A merchant sells an item such that the profit equals 20% of the SELLING price. What is the merchant's profit percentage based on the COST price?",
         "25.0%", ["20.0%", "22.0%", "24.0%", "30.0%"],
         ["Let Selling Price = 100. Profit = 20.",
          "Cost Price = 100 - 20 = 80.",
          "Profit % on Cost = (20 / 80) * 100% = **25.0%**."]),
        # 3
        ("A dishonest fruit vendor uses a modified scale where a weight reading of 1,000 grams actually only delivers 800 grams of fruit. If fruit is sold at cost price, what is the vendor's actual profit percentage?",
         "25.0%", ["20.0%", "22.5%", "27.5%", "30.0%"],
         ["Profit % = (Error / Weight handed out) * 100%.",
          "Error = 1,000 - 800 = 200 grams.",
          "Profit % = (200 / 800) * 100% = **25.0%**."]),
        # 4
        ("A merchant sells two smartphones for $600 each. On the first phone, the merchant gains 20%, and on the second, the merchant loses 20%. Across both sales combined, what is the overall net outcome?",
         "Loss of 4.0%", ["Break-even (0% shift)", "Gain of 2.0%", "Loss of 2.0%", "Loss of 5.0%"],
         ["Formula for equal selling prices with equal gain and loss percentage \\(x\\): Overall Loss % = \\((x / 10)^2\\)%.",
          "\\((20 / 10)^2 = 2^2 =\\) **Loss of 4.0%**."]),
        # 5
        ("A retail store owner sells a leather jacket for $360, earning a 20% profit on cost. What did the store pay for the jacket?",
         "$300", ["$288", "$310", "$320", "$290"],
         ["Cost = $360 / 1.20 = **$300**."]),
        # 6
        ("By selling a vintage watch for $720, a collector loses 25% of the initial purchase price. At what price should the watch have been sold to earn a 25% profit?",
         "$1,200", ["$1,100", "$1,150", "$1,250", "$1,000"],
         ["Cost price = $720 / 0.75 = $960.",
          "Price for 25% profit = $960 * 1.25 = **$1,200**."]),
        # 7
        ("A grocer buys 50 kg of sugar at $2.00 per kg and 50 kg at $3.00 per kg. If the grocer mixes them and sells the mixture at $3.00 per kg, what is the overall profit percentage?",
         "20.0%", ["15.0%", "18.0%", "22.5%", "25.0%"],
         ["Total cost = (50 * 2) + (50 * 3) = 100 + 150 = $250.",
          "Total revenue = 100 kg * $3.00 = $300.",
          "Profit % = ((300 - 250) / 250) * 100% = (50 / 250) * 100% = **20.0%**."]),
        # 8
        ("If the cost price of 12 pens is equal to the selling price of 8 pens, what is the profit percentage?",
         "50.0%", ["33.3%", "40.0%", "45.0%", "60.0%"],
         ["Let Cost of 1 pen = $1. Total cost of 12 pens = $12.",
          "Selling price of 8 pens = $12 -> Selling price of 1 pen = $12 / 8 = $1.50.",
          "Profit per pen = $1.50 - $1.00 = $0.50.",
          "Profit % = (0.50 / 1.00) * 100% = **50.0%**."]),
        # 9
        ("A bookstore owner sells a rare book for $180, losing 10% on the acquisition price. What selling price would have yielded a 15% profit?",
         "$230", ["$220", "$225", "$235", "$240"],
         ["Cost = $180 / 0.90 = $200.",
          "Target selling price = $200 * 1.15 = **$230**."]),
        # 10
        ("A hardware merchant claims to sell nails at cost, but uses a counterfeit weight of 900 grams for a 1-kilogram bag. What is the merchant's true profit percentage?",
         "11.1%", ["10.0%", "12.0%", "12.5%", "9.1%"],
         ["Profit % = (100 / 900) * 100% = 1/9 * 100% = **11.1%**."]),
        # 11
        ("An investor sells two corporate bonds for $990 each. On the first bond, the investor gains 10%, while on the second, the investor loses 10%. Across both transactions, what is the net dollar gain or loss?",
         "Loss of $20", ["Gain of $20", "Loss of $10", "Break-even ($0)", "Loss of $18"],
         ["Cost 1 = $990 / 1.10 = $900.",
          "Cost 2 = $990 / 0.90 = $1,100.",
          "Total cost = 900 + 1,100 = $2,000. Total revenue = 990 + 990 = $1,980.",
          "Net outcome = 1,980 - 2,000 = **Loss of $20**."]),
        # 12
        ("A shopkeeper sells a backpack for $75, making a profit of 25% on cost. What was the dollar profit earned?",
         "$15", ["$12", "$14", "$16", "$18"],
         ["Cost = $75 / 1.25 = $60.",
          "Dollar profit = $75 - $60 = **$15**."]),
        # 13
        ("If an appliance is sold at a 15% loss for $340, what was the original cost?",
         "$400", ["$385", "$390", "$410", "$420"],
         ["Cost = $340 / 0.85 = **$400**."]),
        # 14
        ("A boutique seller marks goods so that profit is 25% of the SELLING price. What is the profit percentage on the COST price?",
         "33.3%", ["30.0%", "35.0%", "28.0%", "25.0%"],
         ["SP = 100, Profit = 25, Cost = 75.",
          "Profit % on Cost = (25 / 75) * 100% = **33.3%**."]),
        # 15
        ("By selling 45 meters of cloth, a merchant gains the selling price of 15 meters of cloth. What is the merchant's profit percentage?",
         "50.0%", ["33.3%", "40.0%", "45.0%", "60.0%"],
         ["Let SP of 1 meter = $1. Revenue from 45 m = $45.",
          "Profit = SP of 15 m = $15.",
          "Cost of 45 m = $45 - $15 = $30.",
          "Profit % = (15 / 30) * 100% = **50.0%**."]),
        # 16
        ("A merchant purchases a shipment of goods for $1,200. One-third of the shipment is sold at a 10% loss. At what percentage gain must the remaining two-thirds be sold to break even overall?",
         "5.0%", ["4.0%", "6.0%", "7.5%", "10.0%"],
         ["Loss on first third ($400) = 0.10 * 400 = $40.",
          "Remaining goods cost = $800.",
          "Required gain on remaining goods = $40 / $800 = **5.0%**."]),
        # 17
        ("A wholesaler sells 20 crates of fruit for the same price they paid for 25 crates. What is the profit percentage?",
         "25.0%", ["20.0%", "30.0%", "22.5%", "24.0%"],
         ["Let Cost of 1 crate = $1. Cost of 25 crates = $25.",
          "Selling price of 20 crates = $25 -> SP of 1 crate = $1.25.",
          "Profit = (1.25 - 1.00) / 1.00 = **25.0%**."]),
        # 18
        ("An art dealer sells a painting for $880, making a profit of 10% on cost. If the painting had been sold for $760, what would have been the financial outcome?",
         "Loss of 5.0%", ["Loss of 4.0%", "Gain of 2.0%", "Break-even (0%)", "Loss of 6.0%"],
         ["Cost = $880 / 1.10 = $800.",
          "At $760: Loss = 800 - 760 = $40.",
          "Loss % = (40 / 800) * 100% = **Loss of 5.0%**."]),
        # 19
        ("A dishonest retailer uses a weight of 950 grams for a nominal 1,000 grams. What is the retailer's profit percentage when selling at marked cost price?",
         "5.26%", ["5.00%", "5.50%", "4.75%", "5.15%"],
         ["Profit % = (50 / 950) * 100% = 5/95 * 100% = **5.26%**."]),
        # 20
        ("Two vintage watches are sold for $480 each. On one watch the seller makes a 20% profit, and on the other incurs a 20% loss. What is the total net loss in dollars?",
         "Loss of $40", ["Loss of $20", "Loss of $30", "Break-even ($0)", "Loss of $50"],
         ["Cost 1 = 480 / 1.20 = $400.",
          "Cost 2 = 480 / 0.80 = $600.",
          "Total cost = 400 + 600 = $1,000. Total revenue = 480 + 480 = $960.",
          "Loss = 1,000 - 960 = **Loss of $40**."]),
        # 21
        ("A distributor buys 100 units of an item for $1,500. 20 units are found damaged and discarded. At what price per unit must the remaining 80 units be sold to make an overall 20% profit on the total investment?",
         "$22.50", ["$21.00", "$22.00", "$23.50", "$24.00"],
         ["Target revenue = $1,500 * 1.20 = $1,800.",
          "Units available to sell = 80.",
          "Price per unit = 1,800 / 80 = **$22.50**."]),
        # 22
        ("A merchant sells an item for $144, making a percentage profit equal to the numerical cost price in dollars. What was the cost price?",
         "$80", ["$75", "$85", "$90", "$70"],
         ["Let Cost = \\(C\\). Selling price = \\(C + C(C / 100) = 144\\).",
          "\\(C + C^2 / 100 = 144 \\implies C^2 + 100C - 14400 = 0\\).",
          "\\((C + 180)(C - 80) = 0 \\implies C =\\) **$80**."]),
        # 23
        ("If cost price is 80% of selling price, what is the profit percentage on cost?",
         "25.0%", ["20.0%", "22.5%", "28.0%", "30.0%"],
         ["Let SP = 100 -> Cost = 80.",
          "Profit = 100 - 80 = 20.",
          "Profit % on Cost = (20 / 80) * 100% = **25.0%**."]),
        # 24
        ("A commercial grower sells 15 crates of avocados for the cost price of 18 crates. What is the grower's profit percentage?",
         "20.0%", ["18.0%", "22.0%", "25.0%", "16.7%"],
         ["Cost of 18 crates = $18. Selling price of 15 crates = $18.",
          "SP of 1 crate = $18 / 15 = $1.20.",
          "Profit % = (0.20 / 1.00) * 100% = **20.0%**."]),
        # 25
        ("A computer monitor is sold for $240, yielding a 20% profit. What would the percentage profit be if it were sold for $260?",
         "30.0%", ["28.0%", "32.0%", "25.0%", "35.0%"],
         ["Cost = 240 / 1.20 = $200.",
          "At $260: Profit = 260 - 200 = $60.",
          "Profit % = (60 / 200) * 100% = **30.0%**."]),
        # 26
        ("A merchant sells an item at a 10% loss. If the merchant had sold it for $45 more, they would have made a 5% profit. What was the original cost price?",
         "$300", ["$280", "$290", "$310", "$320"],
         ["Difference between -10% and +5% is 15% of Cost.",
          "0.15 * Cost = $45.",
          "Cost = 45 / 0.15 = **$300**."])
    ]
    return data[k % len(data)]

print("Profit loss loaded")
