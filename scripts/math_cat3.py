# Categories 3 through 10 (27 unique scenarios each)

def get_markup_discount(k):
    # Percentage markups and discounts
    data = [
        # 0
        ("A department store purchases a winter coat for $120, marks it up by 50%, and later offers a 20% discount during a holiday sale. What is the final selling price?",
         "$144", ["$140", "$150", "$152", "$138"],
         ["Marked price = $120 * 1.50 = $180.",
          "20% discount = 0.20 * $180 = $36.",
          "Final price = $180 - $36 = **$144**."]),
        # 1
        ("An electronics store marks up a laptop wholesale cost by 40%. During a clearance promotion, they offer a 25% discount off the marked price. What is the net percentage profit on the original wholesale cost?",
         "5.0%", ["6.0%", "4.5%", "7.5%", "8.0%"],
         ["Let wholesale cost = 100.",
          "Marked price = 140.",
          "25% discount on 140 = 0.25 * 140 = 35.",
          "Sale price = 140 - 35 = 105.",
          "Net profit percentage = (105 - 100) / 100 = **5.0%**."]),
        # 2
        ("A boutique offers successive discounts of 20% followed by an additional 10% on all clearance apparel. What is the single equivalent overall discount percentage?",
         "28.0%", ["30.0%", "26.0%", "27.5%", "25.0%"],
         ["Let original price = 100.",
          "After 20% discount = 80.",
          "After additional 10% discount = 80 * 0.90 = 72.",
          "Total discount = 100 - 72 = **28.0%**."]),
        # 3
        ("A furniture manufacturer marks up an oak dining table by 60% above the production cost of $500. If an executive discount of 15% is applied at checkout, what is the customer's purchase price?",
         "$680", ["$650", "$700", "$675", "$690"],
         ["Marked price = $500 * 1.60 = $800.",
          "15% discount on $800 = 0.15 * $800 = $120.",
          "Sale price = $800 - $120 = **$680**."]),
        # 4
        ("A camera retailer marks down a mirrorless camera by 10%, and then applies a storewide promotional coupon for another 20% off the reduced price. If the camera was originally listed at $800, what is the final price?",
         "$576", ["$560", "$580", "$590", "$600"],
         ["Price after 10% off = $800 * 0.90 = $720.",
          "Price after additional 20% coupon = $720 * 0.80 = **$576**."]),
        # 5
        ("A jewelry gallery increases the price of an antique pendant by 25%. A week later, they reduce the new price by 20%. How does the final price compare to the original price?",
         "Exactly equal (0% change)", ["2.5% increase", "5% decrease", "5% increase", "2.5% decrease"],
         ["Let original price = 100.",
          "After 25% increase = 125.",
          "After 20% reduction = 125 * 0.80 = 100.",
          "The final price is **Exactly equal (0% change)**."]),
        # 6
        ("An art supply store marks up canvas oil sets by 80% over wholesale cost, and later offers a promotional 30% discount. What is the store's net profit percentage on cost?",
         "26.0%", ["25.0%", "28.0%", "24.0%", "30.0%"],
         ["Let cost = 100.",
          "Marked price = 180.",
          "30% discount on 180 = 54.",
          "Sale price = 180 - 54 = 126.",
          "Net profit = 126 - 100 = **26.0%**."]),
        # 7
        ("A merchant marks up goods by 30% above cost, but allows a 10% discount for cash payments. What is the merchant's net profit percentage on cash transactions?",
         "17.0%", ["15.0%", "18.0%", "20.0%", "16.5%"],
         ["Let cost = 100.",
          "Marked price = 130.",
          "10% discount on 130 = 13.",
          "Cash price = 130 - 13 = 117.",
          "Profit = 117 - 100 = **17.0%**."]),
        # 8
        ("A winter sporting goods shop discounts ski jackets originally priced at $250 by successive discounts of 20% and then another 20%. What is the final clearance price?",
         "$160", ["$150", "$165", "$170", "$155"],
         ["First discount = $250 * 0.80 = $200.",
          "Second discount = $200 * 0.80 = **$160**."]),
        # 9
        ("A book distributor marks up novels by 50% and offers bookstores a trade discount of 30%. What is the distributor's net profit margin percentage on wholesale cost?",
         "5.0%", ["6.0%", "4.0%", "7.5%", "8.0%"],
         ["Cost = 100 -> Marked = 150.",
          "Trade price = 150 * 0.70 = 105.",
          "Profit = 105 - 100 = **5.0%**."]),
        # 10
        ("A retailer offers two successive discounts of 30% and 10%. What is the equivalent single discount percentage?",
         "37.0%", ["40.0%", "35.0%", "38.0%", "36.5%"],
         ["100 * (1 - 0.30) * (1 - 0.10) = 100 * 0.70 * 0.90 = 63.",
          "Total discount = 100 - 63 = **37.0%**."]),
        # 11
        ("An outdoor gear store sells a camping tent for $270 after applying a 10% promotional discount off the marked price. What was the marked price before the discount?",
         "$300", ["$290", "$295", "$305", "$310"],
         ["Sale price = 0.90 * Marked Price.",
          "Marked Price = $270 / 0.90 = **$300**."]),
        # 12
        ("A tool manufacturer offers a 40% markup on drills costing $80 to produce, followed by a 15% discount for contractor loyalty members. What is the contractor price?",
         "$95.20", ["$92.00", "$94.50", "$96.00", "$98.20"],
         ["Marked price = $80 * 1.40 = $112.",
          "Contractor price = $112 * 0.85 = **$95.20**."]),
        # 13
        ("A luxury wristwatch marked at $1,200 is sold after successive discounts of 25% and 10%. What is the final purchase price?",
         "$810", ["$800", "$820", "$840", "$790"],
         ["$1,200 * 0.75 = $900.",
          "$900 * 0.90 = **$810**."]),
        # 14
        ("A computer monitor originally listed at $400 is reduced to $320. What is the percentage discount?",
         "20.0%", ["18.0%", "22.5%", "25.0%", "15.0%"],
         ["Discount amount = $400 - $320 = $80.",
          "Percentage = (80 / 400) * 100% = **20.0%**."]),
        # 15
        ("A wholesaler sells goods at a 20% discount off the list price. If a retailer pays $480 for an order, what was the original list price?",
         "$600", ["$580", "$620", "$640", "$560"],
         ["List price = $480 / 0.80 = **$600**."]),
        # 16
        ("A pair of noise-canceling headphones originally costing $200 is discounted by 15%, then by an additional 10% during an online flash sale. What is the final price?",
         "$153", ["$150", "$155", "$158", "$160"],
         ["$200 * 0.85 = $170.",
          "$170 * 0.90 = **$153**."]),
        # 17
        ("A bicycle shop purchases mountain bikes for $400 each, marks them up by 75%, and then offers a 20% end-of-season discount. What is the shop's profit per bike in dollars?",
         "$160", ["$150", "$170", "$180", "$140"],
         ["Marked price = $400 * 1.75 = $700.",
          "Sale price = $700 * 0.80 = $560.",
          "Profit = $560 - $400 = **$160**."]),
        # 18
        ("A hardware retailer offers successive discounts of 15% and 15% on power generators. What is the net overall discount percentage?",
         "27.75%", ["30.00%", "28.50%", "26.50%", "27.00%"],
         ["100 * 0.85 * 0.85 = 100 * 0.7225 = 72.25.",
          "Discount = 100 - 72.25 = **27.75%**."]),
        # 19
        ("A merchant marks up inventory by 35%. During an economic downturn, the merchant discounts the marked prices by 20%. What is the net percentage gain on the original cost?",
         "8.0%", ["7.0%", "9.0%", "10.0%", "7.5%"],
         ["100 * 1.35 * 0.80 = 108.",
          "Net gain = 108 - 100 = **8.0%**."]),
        # 20
        ("An electronics store sells a 4K television for $855 after applying a 5% discount for store credit card holders. What was the original price before the discount?",
         "$900", ["$890", "$910", "$920", "$895"],
         ["Original price = $855 / 0.95 = **$900**."]),
        # 21
        ("A luggage set listed at $300 receives a promotional discount of 30%, followed by an additional 10% senior citizen discount. What is the customer's final price?",
         "$189", ["$180", "$192", "$195", "$185"],
         ["$300 * 0.70 = $210.",
          "$210 * 0.90 = **$189**."]),
        # 22
        ("A specialty coffee roaster marks up green beans by 100% after roasting, then provides wholesale cafes with a 35% discount. What is the roaster's profit percentage on cost?",
         "30.0%", ["25.0%", "28.0%", "32.0%", "35.0%"],
         ["Cost = 100 -> Marked = 200.",
          "Wholesale price = 200 * 0.65 = 130.",
          "Profit = 130 - 100 = **30.0%**."]),
        # 23
        ("A garden center offers successive discounts of 25% and 20% on all outdoor pottery. What is the single equivalent discount percentage?",
         "40.0%", ["45.0%", "38.0%", "42.0%", "35.0%"],
         ["100 * 0.75 * 0.80 = 100 * 0.60 = 60.",
          "Total discount = 100 - 60 = **40.0%**."]),
        # 24
        ("A digital storefront marks up downloadable asset packs by 60% and gives newsletter subscribers a 25% discount. What is the net profit percentage?",
         "20.0%", ["18.0%", "22.0%", "25.0%", "15.0%"],
         ["Cost = 100 -> Marked = 160.",
          "Discount price = 160 * 0.75 = 120.",
          "Profit = 120 - 100 = **20.0%**."]),
        # 25
        ("A footwear boutique marks down designer boots originally priced at $320 by 25%. If an employee uses an additional 10% staff discount on the reduced price, what do they pay?",
         "$216", ["$210", "$220", "$224", "$218"],
         ["$320 * 0.75 = $240.",
          "$240 * 0.90 = **$216**."]),
        # 26
        ("A retailer prices a dining set at $1,500. After applying three successive discounts of 10%, 10%, and 10%, what is the final price?",
         "$1,093.50", ["$1,080.00", "$1,100.00", "$1,110.00", "$1,090.00"],
         ["$1,500 * (0.90)^3 = $1,500 * 0.729 = **$1,093.50**."])
    ]
    return data[k % len(data)]

print("Markup discount loaded")
