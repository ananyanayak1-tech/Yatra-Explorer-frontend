/**
 * Multi-lingual Audio Guide Story Engine
 * Languages supported: English ('en'), Hindi ('hi'), Kannada ('kn')
 * Structure:
 *  - Chapter 1: Origin & History (Who built it, year/era, origin lore)
 *  - Chapter 2: Architectural Secrets & Hidden Wonders
 *  - Chapter 3: Local Folklore & Insider Tips
 */

export const CURATED_STORIES = {
  // Jaipur City Palace
  "jaipur-city-palace": {
    en: {
      title: "The Royal Symphony of the Pink City",
      chapters: [
        {
          tag: "Origin & History",
          heading: "How It Originated",
          text: "Welcome to Jaipur City Palace. In 1727, Maharaja Sawai Jai Singh II, a visionary astronomer and warrior king, found that his old fortress in Amer was running short of water. He decided to establish a brand-new capital in the plains, laying the foundation of India's first planned city. Combining Vedic Vastu Shastra with Mughal geometry, he constructed this majestic palace complex as the beating royal heart of Jaipur."
        },
        {
          tag: "Architecture & Wonders",
          heading: "Architectural Marvels",
          text: "As you wander into the Pritam Niwas Chowk, marvel at the four world-famous seasonal gates. Look closely at the Peacock Gate, dedicated to autumn and Lord Vishnu, studded with intricate glass mosaics of turquoise and emerald feathers. Nearby, you will see two enormous silver urns named Gangajalis, holding four thousand liters each, certified by the Guinness Book as the largest sterling silver objects ever created in human history."
        },
        {
          tag: "Local Tips & Lore",
          heading: "Local Legend & Traveler Tip",
          text: "Legend says the royal family still inhabits the Chandra Mahal wing. When the Maharaja is in residence, a special flag flutters atop the palace spire. For the most magical view, stand in the central courtyard during late afternoon when the warm Rajasthani sun turns the red sandstone and pink walls into glowing amber."
        }
      ]
    },
    hi: {
      title: "गुलाबी नगर का शाही वैभव",
      chapters: [
        {
          tag: "उत्पत्ति और इतिहास",
          heading: "कैसे हुई स्थापना",
          text: "जयपुर के ऐतिहासिक सिटी पैलेस में आपका स्वागत है। वर्ष १७२७ में, महान खगोलशास्त्री और कछवाहा शासक महाराजा सवाई जयसिंह द्वितीय ने आमेर से अपनी राजधानी को मैदानों में स्थानांतरित करने का निर्णय लिया। उन्होंने प्राचीन वैदिक वास्तुशास्त्र और शिल्पकला के सिद्धांतों पर आधारित भारत के पहले योजनाबद्ध शहर की नींव रखी, जिसका मुख्य केंद्र यह भव्य सिटी पैलेस बना।"
        },
        {
          tag: "वास्तुकला और रहस्य",
          heading: "अनोखी शिल्पकला",
          text: "प्रीतम निवास चौक में स्थित चार ऋतुओं को समर्पित चार ऐतिहासिक द्वार अपनी खूबसूरती के लिए दुनिया भर में प्रसिद्ध हैं। मोर द्वार पर की गई कांच की कारीगरी और मोर पंखों की नक्काशी देखते ही बनती है। इसके अतिरिक्त, दीवान-ए-खास में रखे शुद्ध चांदी के दो विशाल कलश गिनीज बुक ऑफ वर्ल्ड रिकॉर्ड्स में दुनिया के सबसे बड़े चांदी के बर्तनों के रूप में दर्ज हैं।"
        },
        {
          tag: "स्थानीय मान्यता और सुझाव",
          heading: "खास पहचान और यात्रा सुझाव",
          text: "कहा जाता है कि जब राजपरिवार के मुखिया महल में उपस्थित होते हैं, तो महल के सर्वोच्च शिखर चंद्र महल पर विशेष शाही ध्वज फहराया जाता है। सूर्यास्त के समय जब सूरज की किरणें इन गुलाबी दीवारों पर पड़ती हैं, तो इसका दृश्य बेहद मनमोहक लगता है।"
        }
      ]
    },
    kn: {
      title: "ಗುಲಾಬಿ ನಗರಿಯ ರಾಜವೈಭವ",
      chapters: [
        {
          tag: "ಮೂಲ ಮತ್ತು ಇತಿಹಾಸ",
          heading: "ಹೇಗೆ ಶುರುವಾಯಿತು",
          text: "ಜೈಪುರದ ಐತಿಹಾಸಿಕ ಅರಮನೆಗೆ ನಿಮಗೆ ಆತ್ಮೀಯ ಸ್ವಾಗತ. ೧೭೨೭ ರಲ್ಲಿ ಖಗೋಳಶಾಸ್ತ್ರಜ್ಞ ಮತ್ತು ಮಹಾರಾಜರಾದ ಸವಾಯಿ ಜೈಸಿಂಗ್ ಎರಡನೆಯವರು ಆಮೇರ್ ಕೋಟೆಯ ನೀರಿನ ಕೊರತೆಯಿಂದಾಗಿ ಬಯಲು ಸೀಮೆಯಲ್ಲಿ ಹೊಸ ರಾಜಧಾನಿಯನ್ನು ಸ್ಥಾಪಿಸಲು ನಿರ್ಧರಿಸಿದರು. ಪ್ರಾಚೀನ ವಾಸ್ತುಶಾಸ್ತ್ರದ ಪ್ರಕಾರ ಯೋಜಿತವಾಗಿ ನಿರ್ಮಿಸಲಾದ ಈ ಸುಂದರ ಅರಮನೆ ಇಡೀ ನಗರದ ಹೃದಯಭಾಗವಾಗಿದೆ."
        },
        {
          tag: "ವಾಸ್ತುಶಿಲ್ಪ ಮತ್ತು ರಹಸ್ಯಗಳು",
          heading: "ಭವ್ಯ ಕೆತ್ತನೆಗಳು",
          text: "ಇಲ್ಲಿನ ಪ್ರೀತಂ ನಿವಾಸ್ ಚೌಕದಲ್ಲಿರುವ ನಾಲ್ಕು ಋತುಗಳ ಬಾಗಿಲುಗಳು ಅತ್ಯಂತ ಪ್ರಸಿದ್ಧವಾಗಿವೆ. ವಿಶೇಷವಾಗಿ ನವಿಲು ಗೇಟ್‌ನಲ್ಲಿರುವ ಹಸಿರು ಮತ್ತು ನೀಲಿ ಗಾಜಿನ ಕಲಾಕೃತಿಗಳು ಕಣ್ಮನ ಸೆಳೆಯುತ್ತವೆ. ವಿಶ್ವ ದಾಖಲೆಯಲ್ಲಿ ಸ್ಥಾನ ಪಡೆದಿರುವ, ಪ್ರಪಂಚದ ಅತ್ಯಂತ ದೊಡ್ಡ ಶುದ್ಧ ಬೆಳ್ಳಿಯ ಗಂಗಾಜಲ ಪಾತ್ರೆಗಳನ್ನು ನೀವು ಇಲ್ಲಿ ಕಣ್ತುಂಬಿಕೊಳ್ಳಬಹುದು."
        },
        {
          tag: "ಸ್ಥಳೀಯ ಇತಿಹಾಸ ಮತ್ತು ಸಲಹೆ",
          heading: "ಪ್ರವಾಸಿಗರ ಸುಳಿವು",
          text: "ಇಂದಿಗೂ ರಾಜಮನೆತನದವರು ಈ ಚಂದ್ರ ಮಹಲ್‌ನಲ್ಲಿ ವಾಸಿಸುತ್ತಾರೆ. ಅವರು ಅರಮನೆಯಲ್ಲಿರುವಾಗ ಅರಮನೆಯ ತುದಿಯಲ್ಲಿ ವಿಶೇಷ ರಾಜಧ್ವಜ ಹಾರಾಡುತ್ತದೆ. ಸಂಜೆಯ ಹೊಂಬಿಸಿಲಿನಲ್ಲಿ ಈ ಗುಲಾಬಿ ಬಣ್ಣದ ಗೋಡೆಗಳು ಚಿನ್ನದಂತೆ ಹೊಳೆಯುವುದನ್ನು ನೋಡುವುದೇ ಒಂದು ಸುಂದರ ಅನುಭವ."
        }
      ]
    }
  },

  // Mysore Palace
  "mysore-palace": {
    en: {
      title: "The Golden Legacy of the Wadiyars",
      chapters: [
        {
          tag: "Origin & History",
          heading: "How It Originated",
          text: "Welcome to the world-renowned Mysore Palace, also known as the Amba Vilas. The palace dates back to the 14th century when the Yaduraya dynasty first built a wooden fortress. In 1897, during the royal wedding of Princess Jayalakshammanni, a tragic fire destroyed the wooden palace. Maharani Kempananjammanni promptly commissioned British master architect Henry Irwin to rebuild it into this breathtaking Indo-Saracenic stone marvel in 1912."
        },
        {
          tag: "Architecture & Wonders",
          heading: "Architectural Marvels",
          text: "Step inside the grand Kalyana Mantapa, an octagonal marriage pavilion capped with magnificent stained-glass ceilings imported from Glasgow, Scotland. The floor is lined with exquisite peacock mosaics crafted by Italian artists. The Durbar Hall features sculptured pillars painted in turquoise and gold leaf, designed so the king could address his subjects with acoustic clarity without any microphones."
        },
        {
          tag: "Local Tips & Lore",
          heading: "Local Legend & Traveler Tip",
          text: "During the famous Dasara festival, the legendary Golden Howdah, carved out of 750 kilograms of pure gold, carries the idol of Goddess Chamundeshwari through the streets. If you visit on Sunday evening or festival nights, nearly one hundred thousand light bulbs illuminate the entire facade in a blaze of golden light."
        }
      ]
    },
    hi: {
      title: "मैसूर का गौरवशाली अंबा विलास",
      chapters: [
        {
          tag: "उत्पत्ति और इतिहास",
          heading: "कैसे हुई स्थापना",
          text: "मैसूर के विश्वविख्यात अंबा विलास पैलेस में आपका स्वागत है। इस अरावली जैसी भव्य धरोहर की शुरुआत १४वीं शताब्दी में वाडियार राजवंश द्वारा लकड़ी के महल के रूप में हुई थी। १८९७ में एक शाही विवाह के दौरान दुर्घटनावश आग लगने से लकड़ी का महल जल गया। इसके पश्चात महारानी ने ब्रिटिश वास्तुकार हेनरी इरविन को इस भव्य पत्थरों वाले महल को बनाने का कार्य सौंपा, जो १९१२ में बनकर तैयार हुआ।"
        },
        {
          tag: "वास्तुकला और रहस्य",
          heading: "अनोखी शिल्पकला",
          text: "महल का विवाह मंडप अष्टकोणीय है, जिसकी छत पर स्कॉटलैंड से मंगवाए गए रंगीन बेल्जियम कांच लगे हैं। दरबार हॉल के फिरोजी और सुनहरे स्तंभ भारतीय और गोथिक कला का बेजोड़ संगम हैं। इन खंभों की बनावट ऐसी है कि राजा की आवाज बिना किसी आधुनिक लाउडस्पीकर के पूरे प्रांगण में गूंजती थी।"
        },
        {
          tag: "स्थानीय मान्यता और सुझाव",
          heading: "खास पहचान और यात्रा सुझाव",
          text: "दशहरे के पावन अवसर पर ७५० किलोग्राम शुद्ध सोने से बना भव्य हौदा मां चामुंडेश्वरी की सवारी के लिए निकाला जाता है। रविवार की शाम को करीब एक लाख लाइटों की रोशनी से जब यह महल जगमगाता है, तो इसकी भव्यता देखने लायक होती है।"
        }
      ]
    },
    kn: {
      title: "ಮೈಸೂರಿನ ಹೆಮ್ಮೆಯ ಅಂಬಾ ವಿಲಾಸ",
      chapters: [
        {
          tag: "ಮೂಲ ಮತ್ತು ಇತಿಹಾಸ",
          heading: "ಹೇಗೆ ಶುರುವಾಯಿತು",
          text: "ಕರ್ನಾಟಕದ ಸಾಂಸ್ಕೃತಿಕ ರಾಜಧಾನಿಯ ಹೆಮ್ಮೆಯ ಮೈಸೂರು ಅರಮನೆಗೆ ನಿಮಗೆ ಹೃತ್ಪೂರ್ವಕ ಸ್ವಾಗತ. ೧೪ ನೇ ಶತಮಾನದಲ್ಲಿ ಯದುರಾಯರು ಮೊದಲ ಬಾರಿಗೆ ಮರದ ಅರಮನೆಯನ್ನು ಕಟ್ಟಿಸಿದ್ದರು. ಆದರೆ ೧೮೯೭ ರಲ್ಲಿ ರಾಜಕುಮಾರಿ ಜಯಲಕ್ಷ್ಮಮ್ಮಣ್ಣಿಯವರ ವಿವಾಹದ ಸಂದರ್ಭದಲ್ಲಿ ಸಂಭವಿಸಿದ ಅಗ್ನಿ ಅನಾಹುತದಲ್ಲಿ ಹಳೆಯ ಅರಮನೆ ಸುಟ್ಟುಹೋಯಿತು. ನಂತರ ರಾಜಮಾತೆ ಕೆಂಪನಂಜಮ್ಮಣ್ಣಿಯವರು ಬ್ರಿಟಿಷ್ ವಾಸ್ತುಶಿಲ್ಪಿ ಹೆನ್ರಿ ಇರ್ವಿನ್ ಅವರ ನೇತೃತ್ವದಲ್ಲಿ ಈ ಅಪೂರ್ವ ಶಿಲಾ ಅರಮನೆಯನ್ನು ೧೯೧೨ ರಲ್ಲಿ ಪುನರ್ನಿರ್ಮಿಸಿದರು."
        },
        {
          tag: "ವಾಸ್ತುಶಿಲ್ಪ ಮತ್ತು ರಹಸ್ಯಗಳು",
          heading: "ಭವ್ಯ ಕೆತ್ತನೆಗಳು",
          text: "ಇಲ್ಲಿನ ಕಲ್ಯಾಣ ಮಂಟಪವು ಎಂಟು ಕೋನದ ಭವ್ಯ ಗಾಜಿನ ಛಾವಣಿಯನ್ನು ಹೊಂದಿದ್ದು, ಇದನ್ನು ಸ್ಕಾಟ್ಲೆಂಡ್‌ನಿಂದ ತರಿಸಲಾಗಿತ್ತು. ನೆಲದ ಮೇಲೆ ನವಿಲಿನ ಆಕರ್ಷಕ ಇಟಾಲಿಯನ್ ಮೊಸಾಯಿಕ್ ವಿನ್ಯಾಸವಿದೆ. ದರ್ಬಾರ್ ಹಾಲ್‌ನಲ್ಲಿರುವ ಸುಂದರ ಕಂಬಗಳ ಮೇಲೆ ಚಿನ್ನದ ಲೇಪನವಿದ್ದು, ರಾಜರು ಮಾತನಾಡಿದರೆ ಇಡೀ ಸಭಾಂಗಣಕ್ಕೆ ಸ್ಪಷ್ಟವಾಗಿ ಕೇಳಿಸುವಂತಹ ಧ್ವನಿ ರಚನೆಯನ್ನು ಹೊಂದಿದೆ."
        },
        {
          tag: "ಸ್ಥಳೀಯ ಇತಿಹಾಸ ಮತ್ತು ಸಲಹೆ",
          heading: "ಪ್ರವಾಸಿಗರ ಸುಳಿವು",
          text: "ನಾಡಹಬ್ಬ ಮೈಸೂರು ದಸರಾ ಸಮಯದಲ್ಲಿ ೭೫೦ ಕೆಜಿ ಶುದ್ಧ ಚಿನ್ನದ ಅಂಬಾರಿಯಲ್ಲಿ ತಾಯಿ ಚಾಮುಂಡೇಶ್ವರಿಯ ವಿಗ್ರಹವನ್ನು ಆನೆಗಳ ಮೇಲೆ ಮೆರವಣಿಗೆ ಮಾಡಲಾಗುತ್ತದೆ. ಭಾನುವಾರ ಸಂಜೆ ಮತ್ತು ಹಬ್ಬದ ದಿನಗಳಲ್ಲಿ ಸುಮಾರು ಒಂದು ಲಕ್ಷ ವಿದ್ಯುದ್ದೀಪಗಳಿಂದ ಇಡೀ ಅರಮನೆ ಧರೆಗಿಳಿದ ನಕ್ಷತ್ರಲೋಕದಂತೆ ಕಂಗೊಳಿಸುತ್ತದೆ."
        }
      ]
    }
  },

  // Taj Mahal
  "taj-mahal": {
    en: {
      title: "The Monument of Eternal Love",
      chapters: [
        {
          tag: "Origin & History",
          heading: "How It Originated",
          text: "Welcome to the Taj Mahal, one of the Seven Wonders of the World. Standing gracefully on the banks of the River Yamuna in Agra, it was commissioned in 1631 by the fifth Mughal Emperor Shah Jahan to house the tomb of his beloved empress, Mumtaz Mahal. Over twenty thousand master artisans, calligraphers, and stonemasons from India, Persia, and Central Asia toiled for over twenty-two years to craft this architectural masterpiece."
        },
        {
          tag: "Architecture & Wonders",
          heading: "Architectural Marvels",
          text: "Built entirely of translucent white Makrana marble from Rajasthan, the mausoleum is a triumph of optical symmetry. Notice how the four outer minarets lean slightly outwards; this was an ingenious engineering design so that in the event of an earthquake, they would fall away from the central dome. The delicate floral patterns you see are not painted—they are crafted using 'Pietra Dura', inlaying semi-precious jade, crystal, lapis lazuli, and turquoise directly into the marble."
        },
        {
          tag: "Local Tips & Lore",
          heading: "Local Legend & Traveler Tip",
          text: "Poets say the Taj Mahal changes color with the mood of the sky: soft pinkish in the early morning dawn, brilliant pearl white under the afternoon sun, and shimmering golden silver under a full moon night. Arrive early at sunrise for a quiet, ethereal view before the crowds arrive."
        }
      ]
    },
    hi: {
      title: "अमर प्रेम का पावन प्रतीक ताजमहल",
      chapters: [
        {
          tag: "उत्पत्ति और इतिहास",
          heading: "कैसे हुई स्थापना",
          text: "विश्व के सात अजूबों में शुमार भव्य ताजमहल में आपका स्वागत है। यमुना नदी के तट पर स्थित इस अनुपम स्मारक का निर्माण १६३१ में मुगल बादशाह शाहजहां ने अपनी प्रिय बेगम मुमताज महल की याद में शुरू करवाया था। बीस हजार से अधिक कारीगरों, नक्काशीकारों और मजदूरों ने लगातार २२ वर्षों की कड़ी मेहनत के बाद इस प्रेम के प्रतीक को तैयार किया।"
        },
        {
          tag: "वास्तुकला और रहस्य",
          heading: "अनोखी शिल्पकला",
          text: "राजस्थान के मकराना से लाए गए सफेद संगमरमर से बने इस मकबरे में अद्भुत ज्यामितीय संतुलन है। इसके चारों मीनारें बाहर की ओर हल्की सी झुकी हुई हैं ताकि भूकंप की स्थिति में मुख्य गुंबद सुरक्षित रहे। दीवारों पर की गई फूलों की नक्काशी रंगाई नहीं है, बल्कि पिएत्रा ड्यूरा तकनीक से नीलम, फिरोजा, और जेड जैसे बहुमूल्य रत्नों को संगमरमर में जड़ा गया है।"
        },
        {
          tag: "स्थानीय मान्यता और सुझाव",
          heading: "खास पहचान और यात्रा सुझाव",
          text: "कहा जाता है कि ताजमहल दिन के समय के अनुसार अपना रंग बदलता है—सुबह हल्का गुलाबी, दोपहर में दूधिया सफेद और पूर्णिमा की रात को सुनहरी चांदनी जैसा चमकता है। सूर्योदय के समय यहां का नजारा सबसे शांत और अद्भूत होता है।"
        }
      ]
    },
    kn: {
      title: "ಶಾಶ್ವತ ಪ್ರೇಮದ ಅದ್ಭುತ ತಾಜ್ ಮಹಲ್",
      chapters: [
        {
          tag: "ಮೂಲ ಮತ್ತು ಇತಿಹಾಸ",
          heading: "ಹೇಗೆ ಶುರುವಾಯಿತು",
          text: "ವಿಶ್ವದ ಏಳು ಅದ್ಭುತಗಳಲ್ಲಿ ಒಂದಾದ ತಾಜ್ ಮಹಲ್‌ಗೆ ಸ್ವಾಗತ. ಆಗ್ರಾದ ಯಮುನಾ ನದಿಯ ದಡದಲ್ಲಿರುವ ಈ ಸುಂದರ ಸೌಧವನ್ನು ೧೬೩೧ ರಲ್ಲಿ ಮೊಘಲ್ ಚಕ್ರವರ್ತಿ ಷಹಜಹಾನ್ ತನ್ನ ನೆಚ್ಚಿನ ರಾಣಿ ಮುಮ್ತಾಜ್ ಮಹಲ್ ಅವರ ಸ್ಮರಣಾರ್ಥವಾಗಿ ನಿರ್ಮಿಸಲು ಪ್ರಾರಂಭಿಸಿದರು. ಭಾರತ, ಪರ್ಷಿಯಾ ಮತ್ತು ಮಧ್ಯ ಏಷ್ಯಾದ ಇಪ್ಪತ್ತು ಸಾವಿರಕ್ಕೂ ಹೆಚ್ಚು ನುರಿತ ಕುಶಲಕರ್ಮಿಗಳು ೨೨ ವರ್ಷಗಳ ಕಾಲ ಶ್ರಮಿಸಿ ಇದನ್ನು ನಿರ್ಮಿಸಿದರು."
        },
        {
          tag: "ವಾಸ್ತುಶಿಲ್ಪ ಮತ್ತು ರಹಸ್ಯಗಳು",
          heading: "ಭವ್ಯ ಕೆತ್ತನೆಗಳು",
          text: "ರಾಜಸ್ಥಾನದ ಮಕ್ರಾನಾ ಬಿಳಿ ಅಮೃತಶಿಲೆಯಿಂದ ನಿರ್ಮಿಸಲಾದ ಈ ಸೌಧವು ಅದ್ಭುತ ಸಮ್ಮಿತಿಯನ್ನು ಹೊಂದಿದೆ. ಹೊರಗಿನ ನಾಲ್ಕು ಮಿನಾರ್‌ಗಳು ಹೊರಮುಖವಾಗಿ ಸ್ವಲ್ಪ ಬಾಗಿವೆ; ಭೂಕಂಪ ಸಂಭವಿಸಿದರೂ ಮುಖ್ಯ ಗುಮ್ಮಟದ ಮೇಲೆ ಬೀಳದಂತೆ ಈ ವಾಸ್ತು ತಂತ್ರಜ್ಞಾನವನ್ನು ಬಳಸಲಾಗಿದೆ. ಗೋಡೆಗಳ ಮೇಲಿನ ಹೂವಿನ ವಿನ್ಯಾಸಗಳನ್ನು ಕೆತ್ತಿ ಅವುಗಳಲ್ಲಿ ರತ್ನ ಮತ್ತು ಹರಳುಗಳನ್ನು ಜೋಡಿಸಲಾಗಿದೆ."
        },
        {
          tag: "ಸ್ಥಳೀಯ ಇತಿಹಾಸ ಮತ್ತು ಸಲಹೆ",
          heading: "ಪ್ರವಾಸಿಗರ ಸುಳಿವು",
          text: "ಸೂರ್ಯನ ಬೆಳಕಿಗೆ ತಕ್ಕಂತೆ ತಾಜ್ ಮಹಲ್ ಬಣ್ಣ ಬದಲಾಯಿಸುವಂತೆ ಕಾಣುತ್ತದೆ—ಮುಂಜಾನೆ ನಸುಗೆಂಪು, ಮಧ್ಯಾಹ್ನ ಮುತ್ತಿನ ಬಿಳುಪು ಮತ್ತು ಹುಣ್ಣಿಮೆಯ ಬೆಳದಿಂಗಳಲ್ಲಿ ಬೆಳ್ಳಿಯಂತೆ ಹೊಳೆಯುತ್ತದೆ. ಸೂರ್ಯೋದಯದ ಸಮಯದಲ್ಲಿ ಇಲ್ಲಿಗೆ ಭೇಟಿ ನೀಡುವುದು ಅತ್ಯುತ್ತಮ ಅನುಭವ ನೀಡುತ್ತದೆ."
        }
      ]
    }
  },

  // Hampi
  "hampi": {
    en: {
      title: "The Golden Ruins of the Forgotten Empire",
      chapters: [
        {
          tag: "Origin & History",
          heading: "How It Originated",
          text: "Welcome to Hampi, a UNESCO World Heritage Site in Karnataka. In the Ramayana, this rugged, boulder-strewn landscape was known as Kishkindha, the monkey kingdom where Lord Rama met Hanuman. Centuries later, in 1336, two visionary warrior brothers, Harihara and Bukka Raya, laid the foundation of the glorious Vijayanagara Empire here along the banks of the Tungabhadra River, turning it into one of the wealthiest metropolises in medieval history."
        },
        {
          tag: "Architecture & Wonders",
          heading: "Architectural Marvels",
          text: "Marvel at the Vijaya Vittala Temple, famous for its iconic Stone Chariot, a shrine carved to resemble a monolithic victory chariot carrying Garuda. Nearby, walk up to the Musical Pillars of the Ranga Mantapa—fifty-six granite pillars that produce the pure musical notes of Indian instruments (Sa, Re, Ga, Ma) when tapped lightly by hand."
        },
        {
          tag: "Local Tips & Lore",
          heading: "Local Legend & Traveler Tip",
          text: "The Virupaksha Temple has remained an active place of daily worship continuously since the 7th century without pause. Climb the nearby Matanga Hill just before dawn to catch the golden sun rising over miles of ancient granite boulders and centuries-old temple spires."
        }
      ]
    },
    hi: {
      title: "विजयनगर साम्राज्य का स्वर्णिम इतिहास हम्पी",
      chapters: [
        {
          tag: "उत्पत्ति और इतिहास",
          heading: "कैसे हुई स्थापना",
          text: "कर्नाटक के ऐतिहासिक हम्पी में आपका स्वागत है। रामायण काल में यह पावन भूमि किष्किंधा के नाम से प्रसिद्ध थी, जहां भगवान श्री राम और हनुमान जी का मिलन हुआ था। १३३६ में दो वीर भाइयों हरिहर और बुक्का राय ने तुंगभद्रा नदी के तट पर महान विजयनगर साम्राज्य की स्थापना की, जो अपने समय में दुनिया के सबसे समृद्ध और शक्तिशाली साम्राज्यों में गिना जाता था।"
        },
        {
          tag: "वास्तुकला और रहस्य",
          heading: "अनोखी शिल्पकला",
          text: "विजय विट्ठल मंदिर का प्रसिद्ध पत्थर का रथ भारतीय मूर्तिकला का बेजोड़ नमूना है। इसके ठीक पास स्थित रंग मंडप के ५६ संगीतमय स्तंभ वास्तुकला का सबसे बड़ा चमत्कार हैं। इन ग्रेनाइट के खंभों को उंगलियों से हल्के से थपथपाने पर भारतीय संगीत के सात सुरों की मधुर ध्वनि निकलती है।"
        },
        {
          tag: "स्थानीय मान्यता और सुझाव",
          heading: "खास पहचान और यात्रा सुझाव",
          text: "हम्पी का विरुपाक्ष मंदिर ७वीं शताब्दी से लेकर आज तक बिना रुके निरंतर पूजा-अर्चना का केंद्र रहा है। सुबह तड़के मतंग पहाड़ी की चोटी पर चढ़कर जब आप सूर्योदय देखते हैं, तो विशाल चट्टानों और प्राचीन मंदिरों का विहंगम दृश्य मन मोह लेता है।"
        }
      ]
    },
    kn: {
      title: "ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ಗತವೈಭವ ಹಂಪಿ",
      chapters: [
        {
          tag: "ಮೂಲ ಮತ್ತು ಇತಿಹಾಸ",
          heading: "ಹೇಗೆ ಶುರುವಾಯಿತು",
          text: "ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆ ತಾಣವಾದ ನಮ್ಮ ಹೆಮ್ಮೆಯ ಹಂಪಿಗೆ ಸುಸ್ವಾಗತ. ರಾಮಾಯಣ ಕಾಲದಲ್ಲಿ ಈ ತಾಣವನ್ನು ವಾನರ ಸಾಮ್ರಾಜ್ಯವಾದ 'ಕಿಷ್ಕಿಂಧೆ' ಎಂದು ಕರೆಯಲಾಗುತ್ತಿತ್ತು. ನಂತರ ೧೩೩೬ ರಲ್ಲಿ ಹರಿಹರ ಮತ್ತು ಬುಕ್ಕರಾಯ ಎಂಬ ಸಹೋದರರು ತುಂಗಭದ್ರಾ ನದಿಯ ತೀರದಲ್ಲಿ ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯವನ್ನು ಸ್ಥಾಪಿಸಿದರು. ಕೃಷ್ಣದೇವರಾಯರ ಕಾಲದಲ್ಲಿ ಮುತ್ತು-ರತ್ನಗಳನ್ನು ಬೀದಿಗಳಲ್ಲಿ ಅಳೆದು ಮಾರುತ್ತಿದ್ದ ವಿಶ್ವದ ಅತ್ಯಂತ ಶ್ರೀಮಂತ ನಗರಿಯಾಗಿ ಹಂಪಿ ಮೆರೆದಿತ್ತು."
        },
        {
          tag: "ವಾಸ್ತುಶಿಲ್ಪ ಮತ್ತು ರಹಸ್ಯಗಳು",
          heading: "ಭವ್ಯ ಕೆತ್ತನೆಗಳು",
          text: "ಇಲ್ಲಿನ ವಿಜಯ ವಿಠ್ಠಲ ದೇವಾಲಯದಲ್ಲಿರುವ ಏಕಶಿಲಾ ಕಲ್ಲಿನ ರಥವು ಭಾರತೀಯ ಶಿಲ್ಪಕಲೆಯ ಅದ್ಭುತ ಕೃತಿಯಾಗಿದೆ. ರಂಗ ಮಂಟಪದಲ್ಲಿರುವ ೫೬ ಸಂಗೀತ ಕಂಬಗಳನ್ನು ಬೆರಳಿನಿಂದ ತಟ್ಟಿದರೆ ಸಾ, ರಿ, ಗ, ಮ ಎಂಬ ಸಂಗೀತ ಸ್ವರಗಳು ಹೊಮ್ಮುತ್ತವೆ. ಇದು ಪ್ರಾಚೀನ ಶಿಲ್ಪಿಗಳ ಅದ್ಭುತ ಜ್ಞಾನಕ್ಕೆ ಸಾಕ್ಷಿಯಾಗಿದೆ."
        },
        {
          tag: "ಸ್ಥಳೀಯ ಇತಿಹಾಸ ಮತ್ತು ಸಲಹೆ",
          heading: "ಪ್ರವಾಸಿಗರ ಸುಳಿವು",
          text: "ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯದಲ್ಲಿ ೭ ನೇ ಶತಮಾನದಿಂದ ಇಂದಿನವರೆಗೂ ನಿರಂತರವಾಗಿ ಪೂಜೆ ನಡೆಯುತ್ತಾ ಬಂದಿದೆ. ಬೆಳಗಿನ ಮುಂಜಾನೆ ಮಾತಂಗ ಬೆಟ್ಟವನ್ನು ಹತ್ತಿ ಸೂರ್ಯೋದಯವನ್ನು ನೋಡುವುದರಿಂದ ಇಡೀ ಹಂಪಿಯ ಕಲ್ಲಿನ ಬೆಟ್ಟಗಳು ಮತ್ತು ಪುರಾತನ ದೇವಾಲಯಗಳ ಸೌಂದರ್ಯ ಕಣ್ಣಿಗೆ ಹಬ್ಬವನ್ನುಂಟು ಮಾಡುತ್ತದೆ."
        }
      ]
    }
  },

  // Kukke Subramanya Temple
  "kukke-subramanya": {
    en: {
      title: "The Sacred Sanctuary in the Western Ghats",
      chapters: [
        {
          tag: "Origin & Heritage",
          heading: "How It Originated",
          text: "Welcome to Kukke Subramanya Temple, one of the most sacred pilgrimage shrines in Karnataka. Nestled in the lush foothills of the Western Ghats along the holy Kumaradhara River, this ancient temple is dedicated to Lord Kartikeya, worshiped here as Subramanya, the divine protector of serpent king Vasuki."
        },
        {
          tag: "Sacred Architecture",
          heading: "Spiritual Marvels & Traditions",
          text: "The sanctum faces east and features a magnificent silver-covered Garuda pillar designed to shield devotees from the celestial flames of Vasuki. Pilgrims traditionally take a purifying dip in the Kumaradhara River before witnessing the sanctum where Lord Subramanya stands eternally atop Vasuki and Sesha."
        },
        {
          tag: "Pilgrim Lore & Tips",
          heading: "Local Lore & Best Time to Visit",
          text: "Towering behind the temple is the majestic Shesha Parvatha and the trekking peak of Kumara Parvatha. Devotees perform sacred rituals like Sarpa Samskara and Ashlesha Bali here. The best season to visit is between October and March, when the mountain breeze keeps the climate refreshingly cool."
        }
      ]
    },
    hi: {
      title: "पश्चिमी घाट का पावन कुक्के सुब्रमण्यम",
      chapters: [
        {
          tag: "उत्पत्ति और इतिहास",
          heading: "स्थान की उत्पत्ति और पृष्ठभूमि",
          text: "कर्नाटक के दक्षिण कन्नड़ जिले में स्थित कुक्के सुब्रमण्य मंदिर में आपका हार्दिक स्वागत है। पश्चिमी घाट की सुरम्य पहाड़ियों और पवित्र कुमारधारा नदी के तट पर बसा यह प्राचीन धाम भगवान कार्तिकेय को समर्पित है, जिन्हें यहाँ नागराज वासुकी के रक्षक सुब्रमण्य के रूप में पूजा जाता है।"
        },
        {
          tag: "धार्मिक महत्व",
          heading: "प्रमुख विशेषताएं एवं परंपरा",
          text: "मंदिर का मुख्य द्वार पूर्व दिशा की ओर है, जहाँ गर्भगृह के सामने चांदी का विशाल गरुड़ स्तंभ स्थापित है। मान्यता है कि पवित्र कुमारधारा नदी में स्नान करने के बाद भगवान सुब्रमण्य और शेषनाग के दर्शन करने से जीवन में सुख और शांति की प्राप्ति होती है।"
        },
        {
          tag: "यात्रा सुझाव",
          heading: "घूमने का सही समय और सलाह",
          text: "मंदिर के पीछे शेष पर्वत और प्रसिद्ध कुमार पर्वत की मनमोहक चोटियाँ हैं। यहाँ सर्प संस्कार और आश्लेषा बलि जैसी विशेष पूजाएं की जाती हैं। अक्टूबर से मार्च तक का समय यहाँ आने के लिए सबसे उत्तम है, जब घाटियों में सुहावनी ठंडक रहती है।"
        }
      ]
    },
    kn: {
      title: "ಪಶ್ಚಿಮ ಘಟ್ಟದ ಪವಿತ್ರ ಕುಕ್ಕೆ ಸುಬ್ರಹ್ಮಣ್ಯ ಕ್ಷೇತ್ರ",
      chapters: [
        {
          tag: "ಮೂಲ ಮತ್ತು ಇತಿಹಾಸ",
          heading: "ಕ್ಷೇತ್ರದ ಮಹಿಮೆ ಮತ್ತು ಹಿನ್ನೆಲೆ",
          text: "ದಕ್ಷಿಣ ಕನ್ನಡ ಜಿಲ್ಲೆಯ ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ಮಡಿಲಲ್ಲಿರುವ ಜಗತ್ಪ್ರಸಿದ್ಧ ಕುಕ್ಕೆ ಸುಬ್ರಹ್ಮಣ್ಯ ಮಹಾಕ್ಷೇತ್ರಕ್ಕೆ ನಿಮಗೆ ಹೃತ್ಪೂರ್ವಕ ಸುಸ್ವಾಗತ. ಪವಿತ್ರ ಕುಮಾರಧಾರ ನದಿಯ ತೀರದಲ್ಲಿರುವ ಈ ಪುಣ್ಯತಾಣದಲ್ಲಿ ಕಾರ್ತಿಕೇಯನನ್ನು ನಾಗರಾಜ ವಾಸುಕಿಯ ರಕ್ಷಕನಾದ ಸುಬ್ರಹ್ಮಣ್ಯ ಸ್ವಾಮಿಯಾಗಿ ಆರಾಧಿಸಲಾಗುತ್ತದೆ. ಸ್ಕಂದ ಪುರಾಣದಲ್ಲಿ ಈ ಕ್ಷೇತ್ರದ ಮಹಿಮೆಯನ್ನು ವಿಸ್ತಾರವಾಗಿ ವರ್ಣಿಸಲಾಗಿದೆ."
        },
        {
          tag: "ವಾಸ್ತುಶಿಲ್ಪ ಮತ್ತು ವಿಶೇಷತೆ",
          heading: "ದೇವಾಲಯದ ಪಾವಿತ್ರ್ಯತೆ",
          text: "ದೇವಾಲಯದ ಗರ್ಭಗುಡಿಯ ಎದುರು ಬೆಳ್ಳಿಯ ಕವಚವಿರುವ ಭವ್ಯ ಗರುಡಗಂಭವಿದೆ. ಭಕ್ತರು ಮೊದಲು ಪವಿತ್ರ ಕುಮಾರಧಾರ ನದಿಯಲ್ಲಿ ಪುಣ್ಯಸ್ನಾನ ಮಾಡಿ, ನಂತರ ವಾಸುಕಿ ಮತ್ತು ಶೇಷನ ಮೇಲೆ ನೆಲೆಸಿರುವ ಶ್ರೀ ಸುಬ್ರಹ್ಮಣ್ಯ ಸ್ವಾಮಿಯ ದರ್ಶನ ಪಡೆಯುತ್ತಾರೆ. ಈ ದರ್ಶನವು ಮನಸ್ಸಿಗೆ ಅಪಾರ ನೆಮ್ಮದಿ ಮತ್ತು ಭಕ್ತಿಯನ್ನು ತರುತ್ತದೆ."
        },
        {
          tag: "ಸ್ಥಳೀಯ ಇತಿಹಾಸ ಮತ್ತು ಸಲಹೆ",
          heading: "ಪ್ರವಾಸಿಗರ ಸುಳಿವು ಮತ್ತು ಕಾಲ",
          text: "ದೇವಾಲಯದ ಹಿನ್ನೆಲೆಯಲ್ಲಿ ಭವ್ಯ ಶೇಷ ಪರ್ವತ ಹಾಗೂ ಚಾರಣಿಗರ ಮೆಚ್ಚಿನ ಕುಮಾರ ಪರ್ವತ ಗಾಂಭೀರ್ಯದಿಂದ ಕಂಗೊಳಿಸುತ್ತವೆ. ಇಲ್ಲಿ ಆಶ್ಲೇಷಾ ಬಲಿ ಮತ್ತು ಸರ್ಪ ಸಂಸ್ಕಾರ ಪೂಜೆಗಳು ಅತ್ಯಂತ ಪ್ರಸಿದ್ಧವಾಗಿವೆ. ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್ ತಿಂಗಳಿನ ತಂಪಾದ ಹವಾಮಾನದಲ್ಲಿ ಇಲ್ಲಿಗೆ ಭೇಟಿ ನೀಡುವುದು ಅತ್ಯಂತ ಹಿತಕರ ಅನುಭವವನ್ನು ನೀಡುತ್ತದೆ."
        }
      ]
    }
  },

  // Coorg (Madikeri)
  "coorg": {
    en: {
      title: "The Scotland of India & Land of Warriors",
      chapters: [
        {
          tag: "Origin & History",
          heading: "How It Originated",
          text: "Welcome to Coorg, known traditionally as Kodagu. Nestled amidst the Western Ghats of Karnataka, this misty paradise is the sacred birthplace of the River Cauvery at Talakaveri. Coorg was ruled for over two centuries by the Haleri kings from Madikeri Fort, creating a distinct culture of proud Kodava martial warriors who are renowned for their bravery, hospitality, and coffee estates."
        },
        {
          tag: "Architecture & Wonders",
          heading: "Natural Wonders & Heritage",
          text: "Coorg is carpeted in lush arabica and robusta coffee plantations shaded by towering silver oak and pepper vines. In Madikeri town, Raja's Seat stands perched over a sheer cliff—this was the favorite sunset viewpoint where the Haleri kings watched the golden sun dip below rolling misty valleys surrounded by vibrant seasonal blooms."
        },
        {
          tag: "Local Tips & Lore",
          heading: "Local Legend & Traveler Tip",
          text: "According to sacred legend, sage Agastya held the holy waters in his kamandalu until Lord Ganesha, in the form of a crow, tipped it over to unleash the life-giving River Cauvery across South India. When visiting, do not miss tasting authentic Kodava pandi curry or bamboo shoot delicacies, and plan your visit between October and March for cool, crisp mountain air."
        }
      ]
    },
    hi: {
      title: "भारत का स्कॉटलैंड और वीरों की भूमि कूर्ग",
      chapters: [
        {
          tag: "उत्पत्ति और इतिहास",
          heading: "कैसे हुई स्थापना",
          text: "कर्नाटक के खूबसूरत पर्वतीय क्षेत्र कूर्ग (कोडागु) में आपका स्वागत है। पश्चिमी घाट की धुंधली पहाड़ियों में बसा यह स्थान पवित्र कावेरी नदी का उद्गम स्थल तालकावेरी है। कूर्ग पर हलेरी राजवंश के राजाओं ने मडिकेरी किले से २०० से अधिक वर्षों तक शासन किया। यहाँ के स्थानीय कोडवा लोग अपनी अटूट बहादुरी, आतिथ्य सत्कार और कॉफी की खेती के लिए प्रसिद्ध हैं।"
        },
        {
          tag: "वास्तुकला और रहस्य",
          heading: "प्राकृतिक सुंदरता और विरासत",
          text: "कूर्ग की हरियाली में दूर-दूर तक फैले कॉफी और काली मिर्च के बागान मन को शांति देते हैं। मडिकेरी में 'राजा की सीट' नामक स्थान से डूबते सूरज का नजारा अद्भुत दिखाई देता है, जहाँ प्राचीन काल में राजा अपनी रानियों के साथ शाम का समय बिताते थे।"
        },
        {
          tag: "स्थानीय मान्यता और सुझाव",
          heading: "खास पहचान और यात्रा सुझाव",
          text: "धार्मिक मान्यता है कि महर्षि अगस्त्य के कमंडल से छलक कर ही पवित्र कावेरी नदी इस धरती पर बही थी। कूर्ग भ्रमण का सबसे शानदार समय अक्टूबर से मार्च का होता है जब पहाड़ियों पर सुहानी ठंड और कॉफी के फूलों की भीनी-भीनी खुशबू फैली रहती है।"
        }
      ]
    },
    kn: {
      title: "ಭಾರತದ ಸ್ಕಾಟ್‌ಲ್ಯಾಂಡ್ ಮತ್ತು ವೀಕ್ಷಕರ ತಾಣ ಕೊಡಗು",
      chapters: [
        {
          tag: "ಮೂಲ ಮತ್ತು ಇತಿಹಾಸ",
          heading: "ಹೇಗೆ ಶುರುವಾಯಿತು",
          text: "ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ಮಡಿಲಲ್ಲಿರುವ ಕರ್ನಾಟಕದ ಸುಂದರ ಮಲೆನಾಡು ಕೊಡಗಿಗೆ (ಕೂರ್ಗ್) ನಿಮಗೆ ಆತ್ಮೀಯ ಸ್ವಾಗತ. ಇದು ಕರ್ನಾಟಕದ ಜೀವನದಿ ಪವಿತ್ರ ಕಾವೇರಿ ತಾಯಿಯ ಉಗಮ ಸ್ಥಾನವಾದ ತಲಕಾವೇರಿಯನ್ನು ಹೊಂದಿರುವ ಪುಣ್ಯಭೂಮಿ. ಮಡಿಕೇರಿ ಕೋಟೆಯಿಂದ ಹಾಲೇರಿ ರಾಜರು ಈ ನಾಡನ್ನು ಆಳಿದರು. ಇಲ್ಲಿನ ವೀರ ಕೊಡುವ ಜನಾಂಗದವರು ತಮ್ಮ ಸಾಹಸ, ಶೌರ್ಯ ಮತ್ತು ಅತಿಥಿ ಸತ್ಕಾರಕ್ಕೆ ಜಗತ್ಪ್ರಸಿದ್ಧರಾಗಿದ್ದಾರೆ."
        },
        {
          tag: "ವಾಸ್ತುಶಿಲ್ಪ ಮತ್ತು ರಹಸ್ಯಗಳು",
          heading: "ನೈಸರ್ಗಿಕ ಸೌಂದರ್ಯ",
          text: "ಕೊಡಗು ಹಚ್ಚ ಹಸಿರಿನ ಕಾಫಿ ತೋಟಗಳು, ಏಲಕ್ಕಿ ಮತ್ತು ಮೆಣಸಿನ ಬಳ್ಳಿಗಳಿಂದ ಆವೃತವಾಗಿದೆ. ಮಡಿಕೇರಿಯ ಪ್ರಸಿದ್ಧ 'ರಾಜಾ ಸೀಟ್' ಎಂಬ ಸ್ಥಳದಿಂದ ಕಣಿವೆಯ ಸೂರ್ಯಾಸ್ತವನ್ನು ವೀಕ್ಷಿಸುವುದು ಹಾಲೇರಿ ರಾಜರಿಗೆ ಅತ್ಯಂತ ಪ್ರಿಯವಾಗಿತ್ತು. ಇಲ್ಲಿಂದ ಕಾಣುವ ಮಂಜಿನ ಕಣಿವೆಗಳ ಸೌಂದರ್ಯ ಮನಸ್ಸಿಗೆ ಅಪಾರ ಮುದ ನೀಡುತ್ತದೆ."
        },
        {
          tag: "ಸ್ಥಳೀಯ ಇತಿಹಾಸ ಮತ್ತು ಸಲಹೆ",
          heading: "ಪ್ರವಾಸಿಗರ ಸುಳಿವು",
          text: "ಪುರಾಣದ ಪ್ರಕಾರ ಅಗಸ್ತ್ಯ ಮುನಿಗಳ ಕಮಂಡಲವನ್ನು ಗಣೇಶನು ಕಾಗೆಯ ರೂಪದಲ್ಲಿ ಬಂದು ಮಗುಚಿದಾಗ ಪವಿತ್ರ ಕಾವೇರಿ ನದಿ ಪ್ರವಹಿಸಿತು ಎಂಬ ಪ್ರತೀತಿಯಿದೆ. ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್ ತಿಂಗಳಿನ ತಂಪಾದ ಹವಾಮಾನದಲ್ಲಿ ಇಲ್ಲಿನ ಪ್ರಕೃತಿಯನ್ನು ಆಸ್ವಾದಿಸುವುದು ಮರೆಯಲಾಗದ ಅನುಭವ."
        }
      ]
    }
  }
};

/**
 * Dynamic Story Generator Engine
 * For places without a pre-written static script (e.g. newly added by admin),
 * this dynamically generates an engaging 3-chapter origin & heritage story in English, Hindi, or Kannada.
 */
function localizeCategory(cat, lang) {
  const c = (cat || "").toLowerCase();
  if (lang === "kn") {
    if (c.includes("temple")) return "ಪುಣ್ಯಕ್ಷೇತ್ರ ಮತ್ತು ದೇವಸ್ಥಾನ";
    if (c.includes("beach")) return "ಕಡಲತೀರ";
    if (c.includes("hill")) return "ತಂಪಾದ ಗಿರಿಧಾಮ";
    if (c.includes("wildlife")) return "ವನ್ಯಜೀವಿ ಅಭಯಾರಣ್ಯ";
    if (c.includes("fort")) return "ಐತಿಹಾಸಿಕ ಕೋಟೆ";
    return "ಸುಪ್ರಸಿದ್ಧ ಪ್ರವಾಸಿ ತಾಣ";
  }
  if (lang === "hi") {
    if (c.includes("temple")) return "धार्मिक मंदिर एवं पावन धाम";
    if (c.includes("beach")) return "सुंदर समुद्र तट";
    if (c.includes("hill")) return "मनोरम पर्वतीय स्थल";
    if (c.includes("wildlife")) return "वन्यजीव अभयारण्य";
    if (c.includes("fort")) return "ऐतिहासिक किला";
    return "प्रसिद्ध पर्यटन स्थल";
  }
  return cat || "Tourist Destination";
}

function localizeTime(time, lang) {
  if (!time) return lang === "kn" ? "ವರ್ಷಪೂರ್ತಿ" : lang === "hi" ? "वर्षभर" : "throughout the year";
  let str = time;
  if (lang === "kn") {
    str = str.replace(/january/gi, "ಜನವರಿ")
             .replace(/february/gi, "ಫೆಬ್ರವರಿ")
             .replace(/march/gi, "ಮಾರ್ಚ್")
             .replace(/april/gi, "ಏಪ್ರಿಲ್")
             .replace(/may/gi, "ಮೇ")
             .replace(/june/gi, "ಜೂನ್")
             .replace(/july/gi, "ಜುಲೈ")
             .replace(/august/gi, "ಆಗಸ್ಟ್")
             .replace(/september/gi, "ಸೆಪ್ಟೆಂಬರ್")
             .replace(/october/gi, "ಅಕ್ಟೋಬರ್")
             .replace(/november/gi, "ನವೆಂಬರ್")
             .replace(/december/gi, "ಡಿಸೆಂಬರ್")
             .replace(/to|-|–/g, "ನಿಂದ")
             .replace(/throughout the year/gi, "ವರ್ಷಪೂರ್ತಿ");
    return `${str} ತಿಂಗಳವರೆಗೆ`;
  }
  if (lang === "hi") {
    str = str.replace(/january/gi, "जनवरी")
             .replace(/february/gi, "फरवरी")
             .replace(/march/gi, "मार्च")
             .replace(/april/gi, "अप्रैल")
             .replace(/may/gi, "मई")
             .replace(/june/gi, "जून")
             .replace(/july/gi, "जुलाई")
             .replace(/august/gi, "अगस्त")
             .replace(/september/gi, "सितंबर")
             .replace(/october/gi, "अक्टूबर")
             .replace(/november/gi, "नवंबर")
             .replace(/december/gi, "दिसंबर")
             .replace(/to|-|–/g, "से")
             .replace(/throughout the year/gi, "वर्षभर");
    return `${str} तक`;
  }
  return time;
}

export function generateDynamicAudioStory(place, language = "en") {
  const name = place.name || "This Destination";
  const city = place.city || "the region";
  const state = place.state || "India";
  const category = place.category || "Sightseeing Landmark";
  const bestTime = place.bestTime || "throughout the year";

  if (language === "hi") {
    const hiCat = localizeCategory(category, "hi");
    const hiTime = localizeTime(bestTime, "hi");
    return {
      title: `${name} का ऐतिहासिक परिचय`,
      chapters: [
        {
          tag: "उत्पत्ति और इतिहास",
          heading: "स्थान की उत्पत्ति और पृष्ठभूमि",
          text: `भारत के गौरवशाली पर्यटन स्थल ${name} में आपका हार्दिक स्वागत है। यह प्रसिद्ध ${hiCat} अपनी समृद्ध ऐतिहासिक विरासत और प्राकृतिक सुंदरता के लिए देश-विदेश में विख्यात है। यहाँ का वातावरण पर्यटकों को एक अद्भुत शांति का अनुभव कराता है।`
        },
        {
          tag: "वास्तुकला और रहस्य",
          heading: "प्रमुख विशेषताएं एवं आकर्षण",
          text: "यहाँ की अनुपम स्थापत्य कला और प्राकृतिक छटा हर किसी का मन मोह लेती है। शांत परिवेश और सांस्कृतिक धरोहर का यह संगम यात्रियों को एक अविस्मरणीय अनुभव प्रदान करता है।"
        },
        {
          tag: "स्थानीय मान्यता और सुझाव",
          heading: "खास पहचान और यात्रा सुझाव",
          text: `इस स्थान के भ्रमण के लिए सबसे उत्तम समय ${hiTime} माना जाता है। सुबह की सुहानी धूप और शाम के शांत वातावरण में यहाँ घूमना अत्यंत आनंददायक होता है।`
        }
      ]
    };
  }

  if (language === "kn") {
    const knCat = localizeCategory(category, "kn");
    const knTime = localizeTime(bestTime, "kn");
    return {
      title: `${name} ನ ಇತಿಹಾಸ ಮತ್ತು ಹಿನ್ನೆಲೆ`,
      chapters: [
        {
          tag: "ಮೂಲ ಮತ್ತು ಇತಿಹಾಸ",
          heading: "ಕ್ಷೇತ್ರದ ಮಹಿಮೆ ಮತ್ತು ಆರಂಭ",
          text: `ಭಾರತದ ಪವಿತ್ರ ತಾಣವಾದ ${name} ಗೆ ನಿಮಗೆ ಹೃತ್ಪೂರ್ವಕ ಸ್ವಾಗತ. ಈ ಸುಂದರ ${knCat} ತನ್ನ ಪ್ರಾಚೀನ ಇತಿಹಾಸ ಮತ್ತು ನೈಸರ್ಗಿಕ ಸೌಂದರ್ಯದಿಂದ ಪ್ರವಾಸಿಗರನ್ನು ಆಕರ್ಷಿಸುತ್ತಿದೆ. ಪರಂಪರೆ ಮತ್ತು ಭಕ್ತಿಭಾವದ ಅಪೂರ್ವ ಸಮ್ಮಿಲನವನ್ನು ಈ ಕ್ಷೇತ್ರದಲ್ಲಿ ಕಣ್ತುಂಬಿಕೊಳ್ಳಬಹುದು.`
        },
        {
          tag: "ವಾಸ್ತುಶಿಲ್ಪ ಮತ್ತು ರಹಸ್ಯಗಳು",
          heading: "ಪ್ರಮುಖ ಆಕರ್ಷಣೆಗಳು",
          text: "ಈ ತಾಣದ ವಾಸ್ತುಶಿಲ್ಪ ಮತ್ತು ಪ್ರಶಾಂತ ವಾತಾವರಣವು ಸಂದರ್ಶಕರಿಗೆ ಹೊಸ ಅನುಭವ ಮತ್ತು ಮನಸ್ಸಿಗೆ ಶಾಂತಿಯನ್ನು ನೀಡುತ್ತದೆ. ಸುತ್ತಲಿನ ಪ್ರಕೃತಿ ಸೌಂದರ್ಯ ಮತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ರಚನೆಗಳು ಇಲ್ಲಿನ ವೈಶಿಷ್ಟ್ಯವನ್ನು ಹೆಚ್ಚಿಸುತ್ತವೆ."
        },
        {
          tag: "ಸ್ಥಳೀಯ ಇತಿಹಾಸ ಮತ್ತು ಸಲಹೆ",
          heading: "ಪ್ರವಾಸಿಗರ ಸುಳಿವು ಮತ್ತು ಭೇಟಿಯ ಸಮಯ",
          text: `ಈ ತಾಣಕ್ಕೆ ಭೇಟಿ ನೀಡಲು ಅತ್ಯಂತ ಪ್ರಶಸ್ತವಾದ ಕಾಲ ${knTime}. ಮುಂಜಾನೆಯ ತಂಪಾದ ಹೊತ್ತಿನಲ್ಲಿ ಅಥವಾ ಸಂಜೆಯ ಹೊಂಬಿಸಿಲಿನಲ್ಲಿ ಈ ತಾಣವನ್ನು ಸಂದರ್ಶಿಸುವುದು ಅತ್ಯುತ್ತಮ ಅನುಭವವನ್ನು ನೀಡುತ್ತದೆ.`
        }
      ]
    };
  }

  // Default: English
  return {
    title: `The Story of ${name}`,
    chapters: [
      {
        tag: "Origin & History",
        heading: "How It Originated",
        text: `Welcome to ${name}, situated in ${city}, ${state}. As an iconic ${category.toLowerCase()} destination, its origins are rooted in centuries of culture and scenic landscape. Travelers and pilgrims journey here to immerse themselves in its peaceful ambiance and timeless charm.`
      },
      {
        tag: "Architecture & Wonders",
        heading: "Architectural Marvels & Highlights",
        text: "The distinctive craftsmanship and surrounding natural beauty make every pathway and viewpoint here memorable. Visitors are greeted with panoramic vistas and a serene atmosphere that rejuvenates the spirit."
      },
      {
        tag: "Local Tips & Lore",
        heading: "Local Legend & Traveler Tip",
        text: `Local travel guides recommend visiting ${name} during ${bestTime}, when the climate is at its most pleasant. Plan your visit during the morning or late afternoon golden hours to capture the most breathtaking views.`
      }
    ]
  };
}

/**
 * Main selector function to retrieve the full 3-chapter audio story
 */
export function getAudioStory(place, language = "en") {
  if (!place) return null;

  const slug = (place.name || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  let curated = CURATED_STORIES[slug];
  if (!curated) {
    if (slug.includes("kukke") || slug.includes("subramanya")) curated = CURATED_STORIES["kukke-subramanya"];
    else if (slug.includes("jaipur") || slug.includes("city-palace")) curated = CURATED_STORIES["jaipur-city-palace"];
    else if (slug.includes("mysore") || slug.includes("mysuru")) curated = CURATED_STORIES["mysore-palace"];
    else if (slug.includes("taj") || slug.includes("mahal")) curated = CURATED_STORIES["taj-mahal"];
    else if (slug.includes("hampi")) curated = CURATED_STORIES["hampi"];
    else if (slug.includes("coorg") || slug.includes("madikeri") || slug.includes("kodagu")) curated = CURATED_STORIES["coorg"];
  }

  if (curated && curated[language]) {
    return curated[language];
  }

  return generateDynamicAudioStory(place, language);
}

/**
 * Combines all chapters into a single seamless audio narration script
 */
export function getFullNarrationText(story) {
  if (!story || !story.chapters) return "";
  return story.chapters.map(c => `${c.heading}. ${c.text}`).join(" ");
}
