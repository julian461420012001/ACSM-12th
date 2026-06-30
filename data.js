// ACSM 12th 疾病/情境運動處方資料庫 (v3 — 完整 48 情境，依七大分類)
// 內容整理自 ACSM's Guidelines for Exercise Testing and Prescription, 12th Edition
//
// 資料結構:
//   id, cat, name, en, page(數字), pageStr("頁碼範圍"), status, detailed
//   status: "full"=書中有獨立FITT box | "approx"=有相關內容但無獨立box | "none"=無FITT僅Special Considerations
//   detailed: true=已補完整臨床原則+特別提醒 | false=骨架待補
//   aerobic/resistance/flex/extra : {f,i,t,ty}  FITT 表格
//   clinical:[{h,items}]  一、臨床原則與注意事項
//   special:[{h,items}]   三、特別提醒
//   items 條目可為字串，或 {t:"主條目", sub:["子條目"]}

const DISEASES = [
  {
    id:"p_physical_fitness", kind:"principle", cat:"核心原則 General Principles", chapter:"第1章 益處與風險 Benefits & Risks", name:"體適能組成", en:"Components of Physical Fitness",
    fullname:"體適能組成 Components of Physical Fitness", page:81, pageStr:"81-83", desc:"健康相關與技術相關體適能(Box 1.1)", detailed:true,
    sections:[
      {h:"健康相關體適能 Health-Related Components（Box 1.1，PDF p.81）",
       list:[
         {t:"心肺耐力 Cardiorespiratory Endurance", sub:["循環與呼吸系統在持續身體活動時供應氧氣的能力"]},
         {t:"身體組成 Body Composition", sub:["身體中肌肉、脂肪、骨骼及其他重要組成的相對比例"]},
         {t:"肌力 Muscular Strength", sub:["肌肉施力的能力"]},
         {t:"肌耐力 Muscular Endurance", sub:["肌肉在不疲勞的狀態下持續執行動作的能力"]},
         {t:"柔軟度 Flexibility", sub:["關節可達到的動作範圍（Range of Motion）"]}
       ]},
      {h:"技術相關體適能 Skill-Related Components（Box 1.1，PDF p.81）",
       list:[
         {t:"敏捷性 Agility", sub:["以速度與準確性改變身體在空間中位置的能力"]},
         {t:"協調性 Coordination", sub:["將感官（視覺、聽覺等）與肢體動作整合、流暢精準執行任務的能力"]},
         {t:"平衡 Balance", sub:["靜止或移動中維持身體平衡的能力"]},
         {t:"爆發力 Power", sub:["做功速率（力量 × 速度）"]},
         {t:"反應時間 Reaction Time", sub:["從受到刺激到開始反應所需的時間"]},
         {t:"速度 Speed", sub:["在短時間內完成動作的能力"]}
       ]},
      {h:"絕對強度分級 MET 範例（Table 1.1，PDF p.82-83）",
       table:{head:["強度等級","MET 範圍","步行範例","休閒／運動範例"],
              rows:[
                ["輕度 Light","1.6–2.9 METs","在室內緩慢行走 = 2.0","撞球 Billiards = 2.5；釣魚（坐姿）= 2.5"],
                ["中度 Moderate","3.0–5.9 METs","步行 3.0 mi·h⁻¹ = 3.0；快步 4 mi·h⁻¹ = 5.0","網球雙打 = 5.0；桌球 = 4.0；高爾夫（走路拉桿）= 4.3"],
                ["激烈 Vigorous","≥6.0 METs","慢跑 5 mi·h⁻¹ = 8.0；跑步 7 mi·h⁻¹ = 11.5","籃球比賽 = 8.0；網球單打 = 8.0；游泳中等／激烈 = 8.0–11.0"]
              ]}},
      {h:"相對強度 vs. 絕對強度（PDF p.83）",
       body:"相同 MET 水準對不同族群的相對負擔（%VO₂max）並不相同。老年人因心肺適能下降，在相同 MET 下會承受比年輕人更高的相對運動強度（%VO₂max）。同理，健康程度較低者在相同絕對 MET 下，比健康程度較高者多使用較高比例的最大攝氧量。因此開立強度處方時，應同時考慮絕對強度（METs）與相對強度（%HRR、%VO₂R）。（PDF p.83）"}
    ]
  },
  {
    id:"p_preparticipation", kind:"principle", cat:"核心原則 General Principles", chapter:"第2章 運動前評估 Preparticipation", name:"運動前篩檢", en:"Preparticipation Screening",
    fullname:"運動前健康篩檢 Preparticipation Screening", page:131, pageStr:"131-147", desc:"ACSM 篩檢流程:誰需要先就醫、自我引導法", detailed:true,
    sections:[
      {h:"篩檢目的（PDF p.131）",
       list:[
         "識別需要在開始中至高強度運動前取得醫療許可的人",
         "識別有臨床顯著疾病、可受益於醫療監督運動的人",
         "識別需暫緩參與運動直到病情穩定的人"
       ]},
      {h:"ACSM 篩檢演算法三大關鍵因子（Figure 2.3，PDF p.138-140）",
       list:[
         {t:"① 目前運動習慣", sub:["定義：過去 3 個月內，每週 ≥3 天、每次 ≥30 分鐘、中度以上強度的計畫性運動 → 視為「目前有運動習慣者」"]},
         {t:"② 已知 CV、代謝或腎臟疾病，或疑似症狀", sub:["CV 疾病（冠心病、心臟病、腦血管疾病、周邊動脈疾病）","代謝疾病（第 1/2 型糖尿病）","腎臟疾病","或出現 Table 2.1 列出的任一徵象/症狀"]},
         {t:"③ 預計運動強度", sub:["輕度 Light < 3.0 METs","中度 Moderate 3.0–5.9 METs","激烈 Vigorous ≥ 6.0 METs"]}
       ]},
      {h:"是否需要醫療許可（6 種情境，PDF p.143-146）",
       table:{head:["目前有運動習慣？","已知 CV/代謝/腎疾病？","症狀？","預計強度","需醫療許可？"],
              rows:[
                ["是","是","無","激烈","是"],
                ["否","否","無","中度","否"],
                ["否","否","有","激烈","是（先排除心臟問題）"],
                ["是","是","無","中度","是"],
                ["是","否","無","激烈","否"]
              ]}},
      {h:"Table 2.1 — 疑似 CV/代謝/腎疾病的主要徵象與症狀（PDF p.135-137）",
       list:[
         {t:"胸痛或等同心絞痛症狀", sub:["性質：緊縮、擠壓、燒灼、沉重感","位置：胸骨下方、前胸、上肢、頸部、下巴","誘發：運動、情緒激動、寒冷、飯後","支持缺血：以上特徵；反對缺血：呼吸時加重的刺痛"]},
         {t:"休息或輕微活動時呼吸困難 Dyspnea", sub:["在不應出現喘息的運動量下出現 → 提示心肺疾病，特別是左心室功能不全或 COPD"]},
         {t:"頭暈或暈厥 Dizziness / Syncope", sub:["運動中暈厥 → 可能嚴重心臟疾病（肥厚性心肌病、主動脈瓣狹窄、惡性心律不整）"]},
         {t:"臥位呼吸困難 Orthopnea / 夜間陣發性呼吸困難 PND", sub:["兩者均為左心室功能不全的症狀"]},
         {t:"踝部水腫 Ankle Edema", sub:["雙側水腫 → 心臟衰竭或慢性靜脈功能不全；單側 → 靜脈血栓或淋巴阻塞"]},
         {t:"心悸或心跳過速 Palpitations / Tachycardia", sub:["各種心律異常的表現，亦見於焦慮、高心輸出狀態（貧血、甲亢）"]},
         {t:"間歇性跛行 Intermittent Claudication", sub:["運動時下肢疼痛，休息後 1-2 分鐘緩解；因動脈粥樣硬化導致血流不足；糖尿病患者風險增加"]},
         {t:"已知心雜音 Known Heart Murmur", sub:["需排除肥厚性心肌病、主動脈瓣狹窄 — 兩者為運動猝死常見原因"]},
         {t:"日常活動中異常疲勞或呼吸急促", sub:["可能為 CV 疾病或代謝疾病惡化的早期訊號"]}
       ]},
      {h:"自我篩檢工具 PAR-Q+（PDF p.146）",
       body:"無專業人員協助時，可使用 PAR-Q+（Physical Activity Readiness Questionnaire Plus）自我篩檢。共 7 題基本問題 + 附加追問，結果指引是否需在運動前諮詢醫師。設計目的是降低過度篩檢（false-positive）並減少運動障礙。"},
      {h:"運動測試風險補充（PDF p.146-147）",
       body:"51 項研究結果：最大運動測試在表面健康的無症狀者中，致死事件風險 0.2–0.8:10,000 次測試，非致死事件 1.4:10,000 次；次最大測試風險更低。ACSM 不強制要求以運動測試作為醫療許可的一部分；是否進行測試由醫師或合格醫療人員臨床判斷決定。"}
    ]
  },
  {
    id:"p_met", kind:"principle", cat:"核心原則 General Principles", chapter:"第1章 益處與風險 Benefits & Risks", name:"MET", en:"Metabolic Equivalent",
    fullname:"MET 代謝當量 Metabolic Equivalent", page:73, pageStr:"73-96", desc:"MET 定義、估算能量消耗、強度分級對照", detailed:true,
    sections:[
      {h:"核心定義（PDF p.80-81）",
       list:[
         {t:"身體活動 Physical Activity (PA)", sub:["任何骨骼肌收縮所產生的身體動作，使熱量消耗超過靜態代謝率"]},
         {t:"運動 Exercise", sub:["PA 的一種；計畫性、結構性、反覆性的身體動作，目的是改善或維持體適能"]},
         {t:"MET（代謝當量）", sub:["1 MET = 靜態代謝率 ≈ 3.5 mL O₂·kg⁻¹·min⁻¹（坐著休息時的耗氧量）","是量化各種活動強度的實用、標準化方法（PDF p.81）"]}
       ]},
      {h:"強度等級分類（PDF p.81）",
       table:{head:["強度","MET 範圍","定義補充"],
              rows:[
                ["靜態行為 Sedentary","≤1.5 METs","坐、躺、倚靠姿勢下的清醒行為（PDF p.91）"],
                ["輕度 Light","1.6–2.9 METs","低於增加健康效益的運動強度門檻"],
                ["中度 Moderate","3.0–5.9 METs","明顯增加心跳與呼吸，但仍可說話"],
                ["激烈 Vigorous","≥6.0 METs","大幅增加心跳與呼吸；觸發急性心臟事件的強度門檻"]
              ]}},
      {h:"常見活動 MET 範例（Table 1.1，PDF p.82-83）",
       table:{head:["強度","步行","家務／職業","休閒運動"],
              rows:[
                ["輕度 1.6–2.9","室內緩慢步行 = 2.0","輕度家事（燙衣等）= 2.0–2.5","撞球 = 2.5；坐釣 = 2.5"],
                ["中度 3.0–5.9","步行 3 mi·h⁻¹ = 3.0；快步 4 mi·h⁻¹ = 5.0","吸塵拖地 = 3.0–3.5；木工 = 3.6；割草 = 5.5","羽球 = 4.5；桌球 = 4.0；網球雙打 = 5.0；高爾夫走路 = 4.3"],
                ["激烈 ≥6.0","健走 4.5 mi·h⁻¹ = 6.3；慢跑 5 mi·h⁻¹ = 8.0；跑步 7 mi·h⁻¹ = 11.5","鏟土 = 7.0–8.5；搬重物 = 7.5","自行車中等努力 = 8.0；籃球比賽 = 8.0；游泳激烈 = 8.0–11.0"]
              ]}},
      {h:"PA 建議量（Box 1.3，美國 PA Guidelines 第 2 版，PDF p.87）",
       list:[
         "成人應每週至少 150–300 分鐘中度有氧 PA，或 75–150 分鐘激烈有氧 PA，或等效混合",
         "有氧活動宜分散於整週",
         "每週 ≥2 天進行中度以上、涵蓋所有主要肌群的肌力訓練",
         "多動少坐；任何量的中至激烈 PA 均有健康效益"
       ]},
      {h:"相對強度注意事項（PDF p.83）",
       body:"相同絕對 MET 值對不同個體的相對運動強度（%VO₂max）不同：老年人或心肺適能較低者，在同一 MET 下所承擔的相對強度（%VO₂max）高於年輕人或高適能者。因此，制訂處方時應以相對強度（%HRR、%VO₂R、RPE）搭配絕對強度（METs）共同評估。"},
      {h:"規律 PA／運動的主要好處（Box 1.4，PDF p.94-95）",
       list:[
         {t:"心肺功能提升", sub:["最大攝氧量增加（中樞與周邊適應）","相同次大強度下：心率、血壓、心肌需氧量降低","增加骨骼肌微血管密度；提高乳酸及缺血症狀閾值"]},
         {t:"CVD 危險因子降低", sub:["降低靜態收縮壓／舒張壓","提高 HDL-C、降低三酸甘油酯","減少體脂肪及內臟脂肪；改善胰島素阻抗、血糖耐受","降低血小板黏附與凝集；降低發炎反應"]},
         {t:"降低發病率與死亡率", sub:["一級預防：與全因死亡率、CVD、第 2 型糖尿病、代謝症候群、骨質疏鬆、特定癌症（膀胱、乳房、大腸等）風險呈反比","二級預防：心臟復健降低心肌梗塞後心血管及全因死亡率（meta-analysis）"]},
         {t:"其他效益", sub:["降低焦慮與憂鬱；改善認知功能；提升主觀幸福感","改善睡眠品質；增強老年人功能獨立性；降低跌倒風險"]}
       ]}
    ]
  },
  {
    id:"p_intensity", kind:"principle", cat:"核心原則 General Principles", chapter:"第1章 益處與風險 Benefits & Risks", name:"運動強度測定", en:"Intensity Methods",
    fullname:"運動強度測定 Intensity Methods", page:94, pageStr:"94,224", desc:"HRR/Karvonen、%HRmax、VO2R、RPE/Borg、Talk test", detailed:true,
    sections:[
      {h:"強度分級對照表（Table 5.2，PDF p.345）",
       table:{head:["強度","%HRR 或 %VO₂R","%HRmax","%VO₂max","RPE (6–20 量表)","METs"],
              rows:[
                ["極輕 Very light","<30",   "<57",  "<37",  "Very light（RPE <9）",  "<2.0"],
                ["輕度 Light",     "30–39", "57–63","37–45","Very light to Fairly light（RPE 9–11）","2.0–2.9"],
                ["中度 Moderate",  "40–59", "64–76","46–63","Fairly light to Somewhat hard（RPE 12–13）","3.0–5.9"],
                ["激烈 Vigorous",  "60–89", "77–95","64–90","Somewhat hard to Very hard（RPE 14–17）","6.0–8.7"],
                ["接近最大/最大","≥90",    "≥96",  "≥91",  "Very hard（RPE ≥18）","≥8.8"]
              ]}},
      {h:"強度計算公式（Box 5.2，PDF p.346）",
       list:[
         {t:"HRR 法（Karvonen 法）— 最常用", sub:["目標心率 THR = [(HRmax − HRrest) × %強度] + HRrest","同等公式適用於 %VO₂R：target VO₂R = [(VO₂max − VO₂rest) × %強度] + VO₂rest"]},
         {t:"%HRmax 法", sub:["目標心率 = HRmax × %強度（直接乘，不減靜態心率）","比 HRR 法系統性高估約 5–10%"]},
         {t:"%VO₂max 法", sub:["目標 VO₂ = VO₂max × %強度"]},
         {t:"MET 法", sub:["目標 MET = (VO₂max ÷ 3.5 mL·kg⁻¹·min⁻¹) × %強度"]},
         {t:"「黃金標準」", sub:["直接量測 CPET（漸增式心肺運動測試）所得 HRmax 及 VO₂max，再套入公式 → 最準確"]}
       ]},
      {h:"HRmax 預測公式（Table 5.3，PDF p.347）",
       table:{head:["公式","適用族群","備註"],
              rows:[
                ["220 − age","一般成人","最簡便，但誤差大；ACSM 不建議使用"],
                ["208 − (0.7 × age)（Tanaka）","健康男女","較準確，廣泛使用"],
                ["207 − (0.7 × age)（Gellish）","成人體適能族群","與 Tanaka 近似"],
                ["206 − (0.88 × age)（Gulati）","無症狀中年女性（壓力測試轉介）","女性特定公式"]
              ]}},
      {h:"Talk Test（說話測試）評估強度（PDF p.348）",
       list:[
         "方法：請受試者誦讀約 30 字的段落，問「說話舒適嗎？」",
         {t:"解讀", sub:["答「是，可舒適說話」 → 強度在通氣閾值（VT）以下（約輕至中度）","答「不確定／勉強可以」 → 強度接近 VT","答「否，無法舒適說話」 → 強度超過 VT（激烈強度）"]},
         "效用：可作為首選強度監控方法（surrogate of lactate threshold/VT/respiratory compensation point），跨族群均有效（PDF p.348）"
       ]},
      {h:"RPE Borg 量表（6–20）使用要點",
       list:[
         "RPE 12–13（有些費力 Somewhat hard）≈ 中度（約 40–59% HRR）",
         "RPE 14–17（有些費力至非常費力）≈ 激烈（60–89% HRR）",
         "ACSM 建議與 HR 法併用；RPE 作為輔助指標",
         "相同 RPE 對應的絕對強度因個體適能差異而不同，宜先讓個案熟悉量表語意"
       ]},
      {h:"快速估算 MET 的心率指數法（PDF p.347）",
       body:"METs = 6 × 心率指數 − 5，其中心率指數 = 運動心率 ÷ 靜態心率。此公式可在無 VO₂ 儀器的情況下即時估算運動強度。"},
      {h:"注意：相對強度 vs. 絕對強度（PDF p.347）",
       body:"絕對強度（METs、kcal·min⁻¹）不考慮個體差異，對體能差或高齡者會低估實際負擔。相對強度（%HRR、%VO₂R）更適合個人化處方，特別是失能或去訓練族群。"}
    ]
  },
  {
    id:"p_risk_strat", kind:"principle", cat:"核心原則 General Principles", chapter:"第2章 運動前評估 Preparticipation", name:"AACVPR 風險分層", en:"Risk Stratification",
    fullname:"AACVPR 風險分層 Risk Stratification", page:164, pageStr:"164-175", desc:"事件風險的低/中/高分層準則", detailed:true,
    sections:[
      {h:"AACVPR 風險分層演算法（Box 2.2，PDF p.148）",
       body:"AACVPR 風險分層用於心臟復健（CR）族群，依照臨床指標將患者分為低、中、高三級事件風險，決定是否需要心電圖監測及監督強度。"},
      {h:"高風險 HIGH RISK — 有下列任一項即為高風險",
       list:[
         "左心室射出分率 LVEF < 40%",
         "心跳驟停（Cardiac Arrest）或猝死存活者",
         "休息或運動中出現複雜心室心律不整（Ventricular tachycardia；多形性 PVC > 6 次·min⁻¹）",
         "心肌梗塞或心臟手術後合併心因性休克、充血性心衰竭（CHF）或術後缺血徵象",
         "運動中血流動力學異常：收縮壓不升反降（flat or decreasing SBP）或心率時變能力不足（Chronotropic Incompetence）",
         "顯著無症狀性缺血（ST 下移 ≥ 2 mm，但無症狀）於運動中或恢復期",
         "低強度運動（< 5.0 METs）或恢復期出現心絞痛、頭暈、呼吸困難等症狀",
         "最大運動功能 < 5.0 METs（無法量測者可排除此項）",
         "臨床顯著憂鬱症狀（Clinically significant depression）"
       ]},
      {h:"中風險 MODERATE RISK — 不符合高風險也不符合低風險",
       list:[
         "LVEF = 40%–50%",
         "運動至中等強度（60%–75% 最大功能容量）或恢復期出現心絞痛",
         "輕至中度無症狀缺血（ST 下移 < 2 mm）於運動中或恢復期"
       ]},
      {h:"低風險 LOW RISK — 下列條件全部符合",
       list:[
         "LVEF > 50%",
         "休息及運動中無複雜心室心律不整",
         "無合併症的心肌梗塞、CABG、血管成形術、atherectomy 或支架置放",
         "無 CHF 或術後缺血的徵象/症狀",
         "運動中及恢復期血流動力學與心電圖反應正常",
         "運動中及恢復期無症狀（包括無心絞痛）",
         "最大運動功能 ≥ 7.0 METs（無法量測者可排除此項）",
         "無臨床憂鬱症狀"
       ]},
      {h:"風險等級與監測建議",
       table:{head:["風險等級","ECG 監測需求","監督需求"],
              rows:[
                ["低風險","不強制","最低度監督即可"],
                ["中風險","視情況建議","適度監督"],
                ["高風險","強烈建議連續心電圖監測","密切醫療監督，建議有醫師或護理人員在場"]
              ]}},
      {h:"使用時機與背景（PDF p.147）",
       body:"此風險分層主要適用於心臟復健（CR）及醫療健身中心的臨床族群，特別是在設計個別化運動處方、決定監測強度及訓練場所時使用。一般體適能場所（非臨床）使用 ACSM 準備參與篩檢演算法（Chapter 2）即可。"}
    ]
  },
  {
    id:"p_test_indication", kind:"principle", cat:"核心原則 General Principles", chapter:"第4章 臨床運動測試 Clinical Testing", name:"運動測試適應症", en:"Testing Indications",
    fullname:"運動測試適應症 Testing Indications", page:281, pageStr:"281-287", desc:"臨床運動測試的適應症與用途", detailed:true,
    sections:[
      {h:"臨床運動測試的主要適應症（PDF p.281-283）",
       list:[
         {t:"缺血性心臟病（IHD）評估", sub:["診斷疑似 IHD（尤其中高度預測可能性的患者）","評估已確診 IHD 患者的嚴重程度與功能","胸痛鑑別：低至中度風險者於急診排除 ACS"]},
         {t:"運動能力與功能評估", sub:["客觀量測最大運動能力（peak METs 或 VO₂peak）","殘障評估（Disability evaluation）","術前風險評估（Preoperative risk evaluation）"]},
         {t:"症狀評估", sub:["運動誘發症狀（心絞痛、呼吸困難、心律不整、暈厥）","無法解釋的運動不耐受或呼吸困難","運動誘發支氣管痙攣（Exercise-induced bronchoconstriction）"]},
         {t:"肺部與其他疾病", sub:["慢性阻塞性肺病（COPD）功能評估","周邊動脈疾病（PAD）的間歇性跛行評估","起搏器功能或心率時變能力（Chronotropic incompetence）評估"]},
         {t:"治療評估與處方指導", sub:["心臟復健運動處方制定","評估藥物或手術（如 CABG、PCI）療效","心臟事件後返回工作的能力評估","身體活動諮詢（PA counseling）"]}
       ]},
      {h:"運動測試的預後價值（PDF p.282）",
       list:[
         "心肺適能（CRF，以 VO₂peak 表示）與全死因死亡率呈反比，對 IHD 高危族群及已確診心臟病、心衰竭、肺病患者均有預後意義",
         "心率時變反應（Chronotropic response）及運動後心率恢復（HR recovery）提供額外預後資訊",
         "心率恢復異常：第 1 分鐘心率下降 < 12 bpm，或第 2 分鐘結束時 < 22 bpm，強烈提示死亡率增加"
       ]},
      {h:"何時需要搭配影像學（Box 4.4，PDF p.303）",
       body:"單獨心電圖運動測試無法充分診斷 IHD 的情況：靜態 ST 下移 > 1.0 mm、心室節律器心律、左心室肥大合併再極化異常、左束支傳導阻滯（LBBB）、Wolff-Parkinson-White 症候群、Digitalis 藥物使用。此時應考慮加做核醫或超音波心電圖影像。"},
      {h:"需有醫師到場監督的高危族群（Table 4.2，PDF p.286）",
       list:[
         "中至重度主動脈瓣或二尖瓣狹窄（有症狀或可疑）",
         "肥厚性心肌病（HCM）風險分層",
         "惡性或運動誘發心律不整病史、猝死史",
         "運動誘發暈厥或前暈厥史",
         "心內分流（Intracardiac shunts）",
         "基因性通道病（Genetic channelopathies）",
         "心肌梗塞或 ACS 後 7 天內",
         "NYHA Class III 心臟衰竭、重度左心室功能不全",
         "重度肺動脈高壓（PAH）"
       ]}
    ],
  acsm11:{
    pageStr:"258",
    blocks:[
      {h:"11版 Table 4.1：缺血性心臟病 Pretest Likelihood（PDF p258）",body:"11版 Table 4.1 只有 3 個症狀欄：Typical/Definite Angina Pectoris、Atypical/Probable Angina Pectoris、Nonanginal Chest Pain。12版新增第 4 欄「Asymptomatic（無症狀）」，數值為各年齡/性別組 Very low。11版同時無 Asymptomatic 這個類別。",table:{head:["年齡","性別","典型心絞痛","非典型心絞痛","非心絞痛胸痛"],rows:[["30-39 yr","男性","Intermediate","Intermediate","Low"],["30-39 yr","女性","Intermediate","Very low","Very low"],["40-49 yr","男性","High","Intermediate","Intermediate"],["40-49 yr","女性","Intermediate","Low","Very low"],["50-59 yr","男性","High","Intermediate","Intermediate"],["50-59 yr","女性","Intermediate","Intermediate","Low"],["60-69 yr","男性","High","Intermediate","Intermediate"],["60-69 yr","女性","High","Intermediate","Intermediate"]]}}
    ]
  }
  },
  {
    id:"p_test_contraindication", kind:"principle", cat:"核心原則 General Principles", chapter:"第4章 臨床運動測試 Clinical Testing", name:"運動測試禁忌症", en:"Contraindications",
    fullname:"運動測試禁忌症 Contraindications", page:287, pageStr:"287-291", desc:"絕對與相對禁忌症(Absolute / Relative)", detailed:true,
    sections:[
      {h:"絕對禁忌症 Absolute Contraindications（Box 4.1，PDF p.284）",
       body:"以下任一情況 → 禁止進行症狀限制性最大運動測試",
       list:[
         "急性心肌梗塞（發生後 2 天內）",
         "持續性不穩定心絞痛（Ongoing unstable angina）",
         "未控制且伴有血流動力學損害的心律不整",
         "活動性心內膜炎（Active endocarditis）",
         "有症狀的重度主動脈瓣狹窄（Symptomatic severe aortic stenosis）",
         "急性失代償性心臟衰竭（Decompensated heart failure）",
         "急性肺栓塞、肺梗塞或深部靜脈血栓（DVT）",
         "急性心肌炎或心包炎",
         "急性主動脈剝離（Acute aortic dissection）",
         "身體障礙導致無法安全完成測試"
       ]},
      {h:"相對禁忌症 Relative Contraindications（Box 4.1，PDF p.284）",
       body:"以下情況需評估風險效益比，若效益大於風險可謹慎進行",
       list:[
         "已知阻塞性左主冠狀動脈狹窄",
         "中至重度主動脈瓣狹窄（症狀與病灶關係不確定）",
         "心室率不可控的快速性心律不整（Tachyarrhythmias with uncontrolled ventricular rates）",
         "後天性高度或完全性房室傳導阻滯",
         "近期腦中風或暫時性缺血性發作（TIA）",
         "認知障礙導致無法配合測試",
         "靜態高血壓：收縮壓 > 200 mm Hg 或舒張壓 > 110 mm Hg",
         "未矯正的代謝問題：顯著貧血、重要電解質失衡、甲狀腺機能亢進"
       ]},
      {h:"測試前準備注意事項（PDF p.284-285）",
       list:[
         "取得知情同意書（Informed consent）",
         "記錄病史、症狀、目前用藥（包含附錄 A 所列影響心率的藥物）",
         "測試前執行靜態 ECG 評估：排除新發心房顫動或新再極化變化",
         "若測試目的為評估缺血，靜態 ECG 必須可解讀（若有 LBBB/WPW/Digitalis 等應考慮影像輔助）"
       ]}
    ]
  },
  {
    id:"p_test_termination", kind:"principle", cat:"核心原則 General Principles", chapter:"第4章 臨床運動測試 Clinical Testing", name:"測試終止指標", en:"Termination Criteria",
    fullname:"測試終止指標 Termination Criteria", page:291, pageStr:"291-296", desc:"臨床與一般測試的終止準則", detailed:true,
    sections:[
      {h:"絕對終止指標 Absolute Indications（Box 4.3，PDF p.297）",
       body:"出現以下任一情況 → 立即停止測試",
       list:[
         "ST 段抬高 > 1.0 mm（非原有 Q 波的導聯，排除 aVR、aVL、V1）",
         "收縮壓（SBP）隨工作量增加反而下降 > 10 mm Hg，且伴隨其他缺血證據",
         "中至重度心絞痛（Moderate-to-severe angina）",
         "中樞神經系統症狀：共濟失調（Ataxia）、頭暈、接近暈厥（Near syncope）",
         "灌流不足徵象：發紺（Cyanosis）或蒼白（Pallor）",
         "持續性心室性心搏過速（Sustained VT）或其他影響心輸出量的心律不整（含第 2/3 度房室傳導阻滯）",
         "ECG 或 SBP 監測出現技術困難（無法維持訊號品質）",
         "受試者要求停止"
       ]},
      {h:"相對終止指標 Relative Indications（Box 4.3，PDF p.297）",
       body:"出現以下情況需評估後決定是否停止",
       list:[
         "顯著 ST 位移：水平或下坡型 ST 下移 > 2 mm（J 點後 60–80 ms，懷疑缺血者）",
         "SBP 持續低於基線 > 10 mm Hg（排除其他缺血證據）",
         "胸痛進行性加重",
         "疲憊、呼吸急促、喘鳴、腿部痙攣或間歇性跛行",
         "非持續性 VT 的心律不整：多焦性心室異位、三聯律、陣發性上室性心搏過速、可能惡化的緩脈性心律不整",
         "誇大的高血壓反應：SBP > 250 mm Hg 或 DBP > 115 mm Hg",
         "新發束支傳導阻滯（無法與 VT 區別）",
         "SpO₂ ≤ 80%"
       ]},
      {h:"症狀評分達 3/4 即終止（PDF p.292）",
       body:"心絞痛、呼吸困難、間歇性跛行的評分量表（見 Figure 4.3）：評分達 3 分（共 4 分）即為終止指標。臨床上常用 10 分視覺類比疼痛量表（VAS）作為替代。"},
      {h:"次最大測試終止標準（Box 3.7，PDF p.224）",
       body:"非臨床次最大體適能測試的終止標準：受試者達到 70% HRR（即 85% 年齡預測 HRmax）；或無法遵從測試協定、出現不良徵象或症狀、要求停止、發生緊急狀況。測試後應執行至少 5 分鐘主動恢復冷卻期。"},
      {h:"後運動監測（Post-exercise Monitoring，PDF p.296-298）",
       body:"測試結束後，HR、BP、症狀、ECG 變化應持續監測至穩定為止，建議至少 6 分鐘。若懷疑 IHD 且運動中未見顯著 ECG 變化，可讓受試者立刻仰臥以提高缺血偵測敏感度（但注意維持靜脈回流）。各實驗室應制定標準化後運動期程序。"}
    ]
  },
  {
    id:"p_signs_symptoms", kind:"principle", cat:"核心原則 General Principles", chapter:"第4章 臨床運動測試 Clinical Testing", name:"異常徵象與停止警訊", en:"Signs & Symptoms",
    fullname:"異常徵象與停止警訊 Signs & Symptoms", page:296, pageStr:"296-314", desc:"運動中需警覺的症狀、停止運動的徵象", detailed:true,
    sections:[
      {h:"心率（HR）異常反應（PDF p.299-300）",
       list:[
         {t:"正常 HR 反應", sub:["運動時心率隨工作量增加，每增加 1 MET ≈ 增加 10 bpm"]},
         {t:"心率時變能力不足 Chronotropic Incompetence", sub:["定義：盡力運動後仍無法達到年齡預測最大心率 ≥ 85%（排除 β-blocker 影響）","預測死亡率風險增加；代謝心率儲備（MCR）< 0.8 視為異常"]},
         {t:"心率恢復異常（HR Recovery）", sub:["正常：運動停止後第 1 分鐘心率下降 ≥ 12 bpm；第 2 分鐘結束時下降 ≥ 22 bpm","異常：未達上述標準 → 強烈提示死亡率增加（副交感神經重新接管延遲）"]}
       ]},
      {h:"血壓（BP）異常反應（PDF p.300-301）",
       list:[
         {t:"正常 SBP 反應", sub:["每增加 1 MET，SBP 上升約 10 mm Hg"]},
         {t:"高血壓反應（Hypertensive Response）", sub:["SBP > 250 mm Hg → 相對終止指標","男性 SBP ≥ 210 mm Hg，女性 ≥ 190 mm Hg → 誇大反應","DBP > 115 mm Hg → 相對終止指標"]},
         {t:"低血壓反應（Hypotensive Response）", sub:["工作量增加但 SBP 下降 > 10 mm Hg，尤其伴隨其他缺血指標 → 絕對終止指標","提示心肌缺血、左心室功能不全，預後不良"]},
         {t:"後運動 SBP", sub:["通常在 6 分鐘內恢復至運動前水準；延遲恢復高度相關缺血異常及不良預後"]}
       ]},
      {h:"心電圖（ECG）ST 段異常（PDF p.302-304）",
       list:[
         "水平或下坡型 ST 下移 ≥ 1.0 mm（J 點後 80 ms）→ 強烈指向心肌缺血",
         "後運動恢復期 ST 下移 → 缺血指標",
         "低工作量或低 RPP 下出現 ST 下移 → 預後更差，提示多血管病變",
         "有先前 MI 的 Q 波導聯出現 ST 抬高 > 1.0 mm → 可逆性缺血或壁運動異常",
         "無先前 MI 時 ST 抬高 → 多為冠狀動脈痙攣",
         {t:"需搭配影像學的 ECG 狀況（Box 4.4）", sub:["靜態 ST 下移 > 1.0 mm、LBBB、LVH 合併再極化異常、WPW、Digitalis 治療、心室起搏心律"]}
       ]},
      {h:"心律不整（Dysrhythmias）（PDF p.304）",
       list:[
         "運動中心室異位搏動（Ventricular ectopy）頻率增加、複雜度增加 → 心臟驟停風險上升",
         "持續性心室性心搏過速 → 絕對終止指標",
         "心室三聯律、多焦性心室異位、陣發性 SVT、可能惡化的緩脈 → 相對終止指標",
         "孤立性偶發性異位搏動通常不需終止，但需評估背景（缺血？血流動力學穩定？）"
       ]},
      {h:"症狀警訊（Symptoms）（PDF p.304）",
       list:[
         {t:"心絞痛（Angina）", sub:["運動誘發心絞痛與 IHD 風險增加高度相關","心絞痛 + ST 下移同時出現 → IHD 風險最高","心絞痛評分達 3/4 分 → 終止測試"]},
         {t:"呼吸困難（Dyspnea）", sub:["呼吸困難可為心絞痛等同症狀（Anginal equivalent）","呼吸困難限制的運動測試預後比腿部疲勞更差"]},
         {t:"頭暈／暈厥（Dizziness/Syncope）", sub:["運動中暈厥前期或暈厥 → 立即終止；可能反映嚴重心臟問題","恢復期頭暈在健康者中偶發，因靜脈回流減少"]},
         {t:"間歇性跛行（Claudication）", sub:["PAD 相關；評分達 3/4 分終止測試"]}
       ]},
      {h:"血氧（SpO₂）監測（PDF p.295-296）",
       list:[
         "運動中 SpO₂ 絕對下降 ≥ 5% → 異常，考慮動脈血氣分析",
         "SpO₂ ≤ 80% 且有低氧症狀 → 停止測試",
         "注意干擾因素：低灌流、深色皮膚、指甲油、壓克力指甲、運動晃動（可改用耳垂或額頭探頭）"
       ]},
      {h:"速率壓力乘積 Rate-Pressure Product（RPP）（PDF p.301）",
       body:"RPP = HR × SBP，是心肌耗氧量（Myocardial O₂ demand）的代理指標。正常峰值 RPP 範圍：25,000–40,000 mmHg·bpm⁻¹。冠狀動脈供血受限時，特定 RPP 下會出現缺血閾值（Ischemic threshold）。測試報告應記錄峰值 RPP 及缺血閾值（若適用）。RPP 比外部工作量更可靠地重複估計缺血閾值。"}
    ]
  },
{
    id:"p_fitt_vp", kind:"principle", cat:"核心原則 General Principles", chapter:"第5章 運動處方原則 Prescription", name:"FITT-VP 處方原則", en:"FITT-VP Principle",
    fullname:"FITT-VP 運動處方原則 FITT-VP Principle", page:331, pageStr:"331-382", desc:"頻率/強度/時間/類型/總量/進階的完整定義與設計", detailed:true,
    sections:[
      {h:"FITT-VP 框架定義（PDF p332）",
       list:[
         "F – Frequency：每週運動天數",
         "I – Intensity：運動強度（%HRR、%VO₂R、RPE 等）",
         "T – Time：每次運動持續時間（分鐘）",
         "T – Type：運動模式（有氧、阻力、柔軟度等）",
         "V – Volume：頻率 × 強度 × 時間的乘積（總運動量）",
         "P – Progression：隨時間逐步增加的訓練負荷"
       ]},
      {h:"有氧運動 FITT（Table 5.1，PDF p341）",
       table:{head:["項目","建議"],rows:[
         ["Frequency","至少 3 d·wk⁻¹；多數成人以 3–5 d·wk⁻¹ 分散最佳"],
         ["Intensity","中強度 40%–59% HRR 或劇烈強度 60%–89% HRR"],
         ["Time","中強度：30–60 min·d⁻¹（≥150 min·wk⁻¹）；劇烈強度：20–60 min·d⁻¹（≥75 min·wk⁻¹）"],
         ["Type","涉及大肌肉群的連續或間歇性有氧活動（步行、慢跑、騎車、游泳等）"]
       ]}},
      {h:"強度量化方法（Table 5.2，Box 5.2，PDF p345–346）",
       table:{head:["強度等級","%HRR 或 %VO₂R","MET"],rows:[
         ["很輕 Very light","<30%","<2.0"],
         ["輕度 Light","30%–39%","2.0–2.9"],
         ["中等 Moderate","40%–59%","3.0–5.9"],
         ["劇烈 Vigorous","60%–89%","6.0–8.7"],
         ["近最大 Near-maximal","≥90%","≥8.8"]
       ]},
       list:[
         "HRR 法（Karvonen）：目標心率 = (HRmax − HRrest) × %目標強度 + HRrest",
         "VO₂R 法：目標 VO₂ = (VO₂max − VO₂rest) × %目標強度 + VO₂rest",
         "MET 法：目標 MET = (VO₂max/peak ÷ 3.5) × %目標強度",
         "Talk Test：可以說話舒適 → 低於換氣閾值；說話困難 → 高於換氣閾值"
       ]},
      {h:"HRmax 預測公式（Table 5.3，PDF p347）",
       table:{head:["公式","適用族群"],rows:[
         ["HRmax = 216.6 − 0.84 × 年齡（Åstrand）","男女 4–34 歲"],
         ["HRmax = 208 − 0.7 × 年齡（Tanaka）","健康男女"],
         ["HRmax = 207 − 0.7 × 年齡（Gellish）","廣泛年齡與體能"],
         ["HRmax = 206 − 0.88 × 年齡（Gulati）","無症狀中年女性"]
       ]},
       body:"注意：各公式預測誤差約 10–15 bpm；直接測量的 HRmax 為黃金標準。傳統公式 220 − 年齡不建議使用（易高估或低估）。"},
      {h:"運動量（Volume）（PDF p350–351，Box 5.3）",
       list:[
         "目標：≥500–1,000 MET-min·wk⁻¹，可降低 CVD 與過早死亡風險",
         "約等於中強度運動 150 min·wk⁻¹，或能量消耗 ~1,000 kcal·wk⁻¹",
         "MET-min 計算：MET 數 × 運動分鐘數（例：慢跑 7 METs × 30 min × 3 d = 630 MET-min·wk⁻¹）",
         "kcal·min⁻¹ = (METs × 3.5 × 體重 kg ÷ 1,000) × 5",
         "步數參考：7,000–8,000 步·d⁻¹（至少 3,000 步以 >100 步·min⁻¹ 快走）"
       ]},
      {h:"阻力訓練 FITT（Tables 5.10–5.11，PDF p353–362）",
       table:{head:["訓練目標","頻率","組數","反覆次數","組間休息"],rows:[
         ["肌耐力 Endurance","2–3 d·wk⁻¹","1–2 sets","≥12 reps","30–60 s"],
         ["增肌 Hypertrophy","3–4 d·wk⁻¹","2–5 sets","8–12 reps","90 s–3 min"],
         ["增力 Strength","4–7 d·wk⁻¹","依目標","≤6 reps","2–5 min"],
         ["爆發力 Power","依訓練期","1–5 sets","3–5 reps","2–5 min"]
       ]},
       list:[
         "負荷設定：肌耐力 ≤67% 1-RM；增肌 67%–85% 1-RM；最大肌力 ≥85% 1-RM",
         "建議至少 2 d·wk⁻¹，每次間隔 48–72 小時（同肌群）",
         "順序：大肌群多關節 → 小肌群多關節 → 單關節 → 軀幹穩定"
       ]},
      {h:"區間訓練 Interval Training（Box 5.1，PDF p344）",
       list:[
         {t:"HIIT（高強度間歇）", sub:["代表：4×4 protocol — 4 組 × 4 min at 90%–95% peak HR，組間休息 3 min"]},
         {t:"SIT（衝刺間歇）", sub:["代表：3×20 protocol — 3 組 × 20 s 全力衝刺，組間休息 2 min"]},
         "阻力型 HIIT（例：barbell complex）：5 個動作連續各 5 reps，休息 2 min",
         "HIIT 效果：等同傳統耐力訓練的心肺適應，但總運動量和時間更少"
       ]}
    ]
  },
  {
    id:"p_warmup", kind:"principle", cat:"核心原則 General Principles", chapter:"第5章 運動處方原則 Prescription", name:"熱身與緩和", en:"Warm-up & Cool-down",
    fullname:"熱身與緩和 Warm-up & Cool-down", page:334, pageStr:"334", desc:"熱身/緩和的生理意義、內容與時間建議", detailed:true,
    sections:[
      {h:"運動訓練課程的三大階段（PDF p334）",
       list:[
         "Warm-up 熱身期",
         "Conditioning 訓練期（有氧、阻力、柔軟度或運動活動，持續 10–60 min）",
         "Cool-down 緩和期"
       ]},
      {h:"熱身期 Warm-up（PDF p334）",
       list:[
         "功能：過渡期，讓身體逐漸適應運動的生理、生物力學與能量代謝需求",
         "內容：針對即將使用之肌群進行輕至中等強度的運動活動",
         "時間：建議 5–15 分鐘（依活動代謝需求與個別狀況調整）",
         "方式：動態熱身（大肌群活動，如步行、慢跑、騎車）優於靜態伸展",
         "效益：改善關節活動度（ROM），降低運動期間受傷風險"
       ]},
      {h:"緩和期 Cool-down（PDF p334）",
       list:[
         "功能：讓身體逐漸恢復接近靜息狀態（VO₂、HR 回落）",
         "內容：輕至中等強度柔軟度練習（靜態伸展），幫助生理狀態放鬆",
         "注意：近期證據顯示 cool-down 對心理生物恢復指標影響有限，但仍建議納入",
         "特殊族群（如關節炎）：熱身與緩和各需至少 5–10 分鐘，以控制範圍關節活動加輕強度有氧為主"
       ]},
      {h:"伸展時機建議（PDF p365–371）",
       list:[
         "靜態伸展（Static）：適合在緩和期後、肌肉已溫熱時進行；持續 <60 秒/肌群",
         "動態伸展（Dynamic）：建議在劇烈活動或運動前進行，每組 3–6 sets × 30–90 s",
         "PNF（本體感覺神經肌肉促進術）：應獨立實施，不建議在運動前使用",
         "廣泛靜態/彈震伸展（Ballistic）：不應在運動前進行，以免影響表現"
       ]}
    ]
  },
  {
    id:"p_progression", kind:"principle", cat:"核心原則 General Principles", chapter:"第5章 運動處方原則 Prescription", name:"運動進階原則", en:"Rate of Progression",
    fullname:"運動進階原則 Rate of Progression", page:351, pageStr:"351-363", desc:"初始/改善/維持三階段的漸進方式", detailed:true,
    sections:[
      {h:"有氧運動進階原則（PDF p351–352）",
       list:[
         "基本原則：「start low and go slow」——降低心血管事件與受傷風險，提高運動依從性",
         "初始期：從輕至中等強度開始；先增加 Time（每次 5–10 分鐘），再調整其他 FITT",
         "建議速率：每 1–2 週增加 5–10 min·session⁻¹，維持前 4–6 週",
         "改善期：運動 ≥1 個月後，在之後 4–8 個月逐步調整 FITT；體能極差者可延長至更久",
         "監測：進階後觀察過度喘氣、疲勞、肌肉痠痛等不良反應，若耐受不良則向下調整"
       ]},
      {h:"漸進超負荷（Progressive Overload）原則（PDF p362–363）",
       body:"逐漸增加施加於身體的壓力刺激（可透過調整 volume、intensity、ROM、speed）。",
       list:[
         "Volume 調整：增加組數或次數；注意：多加組數會指數倍增訓練刺激",
         "Load 調整：每週增加 2.5%–5% 的 1-RM（線性增重法）",
         "2-for-2 法則：連續兩次均可多做 2 reps 時，才提升負荷",
         "ROM 擴展：逐步增加動作幅度（如深蹲蹲更深），也可作為超負荷手段",
         "速度進階：從較慢控制動作進階為彈震式或爆發性動作（需先具備動作能力）",
         "Deload（減量週）：高強度訓練 3 週後安排第 4 週降量，讓身體實現適應"
       ]},
      {h:"阻力訓練進階的動作能力原則（PDF p363–364）",
       list:[
         "原則：未具備較簡單動作的技術能力，不得進階到更複雜動作",
         "範例進階路徑：徒手深蹲 → goblet squat → front squat → back squat",
         "奧舉（snatch、clean）需先能執行 deadlift、overhead squat 等基礎動作",
         "若動作過程中有疼痛，提供替代動作或技術修正，不強迫進階"
       ]},
      {h:"訓練週期規劃（PDF p354，Table 5.5）",
       table:{head:["週期層次","說明"],rows:[
         ["Macrocycle 大週期","涵蓋四季：休季 → 準備季 → 賽季 → 賽後"],
         ["Mesocycle 中週期","2–6 週訓練塊（常用 4 週），依競賽距離與備賽需求決定目標（增肌/最大肌力/爆發力/維持）"],
         ["Microcycle 小週期","以週為單位，規劃每日動作選擇、組數 × 次數與休息時間"]
       ]}}
    ]
  },
  {
    id:"p_sedentary", kind:"principle", cat:"核心原則 General Principles", chapter:"第1章 益處與風險 Benefits & Risks", name:"久坐行為", en:"Sedentary Behavior",
    fullname:"久坐行為 Sedentary Behavior", page:91, pageStr:"91-92", desc:"久坐的健康危害、打斷久坐的建議", detailed:true,
    sections:[
      {h:"久坐行為的定義（PDF p91）",
       body:"Sedentary behavior：任何清醒狀態下以坐姿、躺姿或臥姿進行，能量消耗 ≤1.5 METs 的行為。",
       list:[
         "美國成人平均久坐時間：自我回報 5.5–7.1 h·d⁻¹（NHANES），加速計測量 7.7–8.0 h·d⁻¹",
         "全球超過 30% 成人身體活動量不足；美國約 50% 達到耐力訓練建議、30% 達到阻力訓練建議，僅 20% 兩者皆達到"
       ]},
      {h:"久坐的健康危害（PDF p91–92）",
       list:[
         "急性效應：長時間靜坐導致血糖與胰島素調控惡化、脂質代謝異常、血管功能下降",
         "慢性風險：大量橫斷面研究指出久坐與心臟代謝危險因子正相關",
         "前瞻性研究：高久坐時間與糖尿病、心臟病、癌症及全因死亡率增加風險相關",
         {t:"MVPAｺ可部分抵消久坐危害（PDF p92）", sub:[
           "中高強度身體活動（MVPA）達 ≥4.3 倍最低建議量（約 60–75 min·d⁻¹ 中等強度）可消除高久坐行為相關的死亡率風險"
         ]}
       ]},
      {h:"臨床意義與建議",
       list:[
         "即使符合 PA 指引（每週 150 min 中等強度），長時間久坐仍有獨立健康風險",
         "建議在最佳化 PA 的同時，減少久坐時間——兩者是互補而非替代的目標",
         "鼓勵活動中斷（activity breaks）：短暫起身站立或步行可改善代謝反應（如餐後血糖）",
         "2018 PA Guidelines：任何身體活動量都有益，「動起來比完全不動更好」"
       ]}
    ]
  },
  {
    id:"p_exercise_risk", kind:"principle", cat:"核心原則 General Principles", chapter:"第1章 益處與風險 Benefits & Risks", name:"運動相關風險與猝死", en:"Exercise-Related Risks",
    fullname:"運動相關風險與猝死 Exercise-Related Risks", page:97, pageStr:"97-111", desc:"運動的心血管風險、運動猝死、降低風險策略", detailed:true,
    sections:[
      {h:"運動相關風險概覽（PDF p97）",
       list:[
         "最常見風險：骨骼肌肉損傷（MSI）——常與運動強度、活動性質、既有狀況有關",
         "嚴重但罕見：運動猝死（SCD）與急性心肌梗塞（AMI）——主要發生於劇烈強度運動",
         "效益遠大於風險：對大多數成人而言，規律運動的健康效益遠超過其風險"
       ]},
      {h:"年輕人運動猝死（SCD）（PDF p99–101，Table 1.3）",
       list:[
         "最常見原因：先天性/遺傳性心臟異常",
         {t:"主要病因（Table 1.3）", sub:[
           "肥厚性心肌病 Hypertrophic Cardiomyopathy（HCM）：最常見（約 36%）",
           "冠狀動脈異常 Coronary Artery Anomalies",
           "主動脈瓣/瓣下狹窄 Valvular/Subvalvular Aortic Stenosis",
           "可能心肌炎 Possible Myocarditis"
         ]},
         "年輕運動員（<35 歲）年化 SCD 發生率：男性約 1/121,691、女性約 1/787,392",
         "非裔美籍男性及籃球球員 SCD 比例更高"
       ]},
      {h:"成人運動相關心血管事件（PDF p102–104）",
       list:[
         "健康成人在中等強度運動時 SCD/AMI 風險極低",
         "劇烈強度運動時急性且短暫增加風險（SCD 增加 5 倍、AMI 增加 3.5 倍）",
         "風險最高：慣性不活動者突然進行劇烈運動（AMI 風險比規律運動者高 50 倍，Myocardial Infarction Onset Study）",
         ">35 歲以上者：>80% 運動相關 SCD 與動脈粥狀硬化急性併發症有關",
         "絕對風險極低：每 1.5 百萬次劇烈運動 1 例 SCD（男性）；每 396,000 小時慢跑 1 例死亡（Rhode Island 研究）"
       ]},
      {h:"降低運動相關心血管事件的策略（PDF p110–111）",
       list:[
         "醫療人員應了解與運動相關事件相關的病理狀態，適當評估有運動習慣的兒童與成人",
         "有身體活動習慣者應了解心臟前驅症狀（如異常疲勞、胸痛、上背痛），出現時立即就醫",
         "高中/大學運動員應接受運動前心血管篩查",
         "有已知心臟病或家族史的運動員，應依指引由醫療團隊評估後再參加競技",
         "設施工作人員應受訓於心臟急救管理，並備有急救設備與計畫",
         "運動專業人員應具備基本（最好進階）心肺復甦術（CPR）認證及緊急程序能力"
       ]},
      {h:"運動測試期間心臟事件風險（PDF p105–107，Table 1.4）",
       body:"混合族群中，每 10,000 次運動測試約發生 6 件心血管事件；在無心臟病的族群中風險更低。"}
    ]
  },
  {
    id:"p_parq", kind:"principle", cat:"核心原則 General Principles", chapter:"第2章 運動前評估 Preparticipation", name:"PAR-Q+ 自我篩檢", en:"PAR-Q+",
    fullname:"PAR-Q+ 自我篩檢問卷 PAR-Q+", page:131, pageStr:"131-148", desc:"運動前自我篩檢問卷工具", detailed:true,
    sections:[
      {h:"ACSM 運動前篩檢的目的（PDF p131）",
       list:[
         "識別在中至劇烈強度運動前需要醫療許可的個體",
         "識別可從醫療監督運動計畫中受益的臨床疾病患者",
         "識別有醫療條件、需在該狀況控制前暫停運動的個體"
       ]},
      {h:"ACSM 篩檢演算法三大組成（PDF p131–143，Figure 2.3）",
       list:[
         {t:"1. 目前 PA 狀態（Current PA Level）", sub:[
           "定義為「規律運動者」：過去 3 個月，每週 ≥3 天、每次 ≥30 分鐘中等強度以上的結構化運動",
           "當前 PA 狀態越低，從事劇烈運動時 CV 事件風險越高"
         ]},
         {t:"2. 已知疾病或症狀（Signs/Symptoms & Disease History）", sub:[
           "心臟、代謝（糖尿病）、腎臟疾病診斷史",
           "Table 2.1 中的重大症狀（胸痛/不適、靜息或輕度用力時喘、暈厥/頭暈、端坐呼吸/夜間陣發性呼吸困難、踝部水腫、心悸/心跳加速、間歇性跛行、已知心雜音、不尋常疲勞或呼吸困難）"
         ]},
         {t:"3. 期望運動強度（Desired Exercise Intensity）", sub:[
           "輕度、中等、劇烈強度對應不同的醫療許可建議",
           "劇烈強度（≥6 METs）最容易觸發急性 CV 事件"
         ]}
       ]},
      {h:"PAR-Q+（Physical Activity Readiness Questionnaire+）（PDF p146）",
       body:"無運動或健康照護專業人員協助時，可使用 PAR-Q+ 作為自我篩檢工具。",
       list:[
         "包含 7 道主要問題，加上多道後續追蹤問題，以指引運動前建議",
         "為 evidence-based 工具，設計目的是降低運動障礙並減少偽陽性篩查",
         "透過追蹤問題根據個人病史與症狀客製化運動前建議",
         "可作為 ACSM 演算法以外的補充篩檢工具",
         "適用：無相關專業人員協助、自主啟動運動計畫的一般大眾",
         "注意：部分個體（認知能力不足）可能需要協助完成問卷"
       ]},
      {h:"篩檢結果與醫療許可（PDF p143–146）",
       table:{head:["情境","是否需醫療許可"],rows:[
         ["規律運動者 + 無疾病/症狀 + 中等強度","不需要"],
         ["規律運動者 + 無疾病/症狀 + 劇烈強度","不需要"],
         ["非運動者 + 無疾病/症狀 + 中等強度","不需要"],
         ["非運動者 + 無疾病/症狀 + 劇烈強度","建議（需醫療評估）"],
         ["有已知 CV/代謝/腎臟疾病 + 中等強度","建議"],
         ["有 CV/代謝/腎臟疾病症狀（任何強度）","需醫療許可"]
       ]},
       body:"醫療許可的形式由健康照護提供者臨床判斷決定（可為口頭諮詢、靜息 ECG、壓力測試等）。"},
      {h:"漸進過渡期建議（PDF p133）",
       list:[
         "先前久坐者應從輕強度（2–3 METs）開始，逐步提升至中等強度（3–5 METs）",
         "此漸進過渡期（約 2–3 個月）可顯著降低劇烈運動引發 CV 事件的風險"
       ]}
    ]
  },
  {
    id:"p_fitness_assess", kind:"principle", cat:"核心原則 General Principles", chapter:"第3章 體適能測試 Fitness Testing", name:"體適能評估方法", en:"Fitness Assessment",
    fullname:"體適能評估方法 Fitness Assessment", page:167, pageStr:"167-221", desc:"心肺/肌力/柔軟度/身體組成的測量方法", detailed:true,
    sections:[
      {h:"健康體適能測試的目的（PDF p168）",
       list:[
         "收集基礎數據，教育個體了解目前健康/體能狀況（相對標準及常模）",
         "提供數據用於制定個別化運動處方（各體能組成面向）",
         "收集後續數據，評估運動處方執行後的短中長期進展",
         "透過設定合理可達目標，激發個體動機"
       ]},
      {h:"測試前準備與環境（PDF p169–170）",
       list:[
         "測試前提供並確認所有測試前指示（飲食、藥物、著裝）",
         "設備校正：儀器依製造商建議定期校正（血壓計、皮褶計、跑步機、腳踏車計功器）",
         "環境控制：室溫 68–72°F（20–22°C），濕度 <60%，良好通風",
         {t:"測試建議順序", sub:[
           "靜息測量優先：HR、BP、身高、體重、體組成",
           "動態測試：心肺適能（CRF）、肌肉適能、柔軟度",
           "序列測試中，各項目間需讓 HR/BP 回到基線值",
           "避免連續重複使用同一肌群（不同測試間應輪換部位）"
         ]}
       ]},
      {h:"身體組成評估方法（PDF p176–200）",
       list:[
         {t:"BMI（體質指數）", sub:[
           "公式：體重（kg）÷ 身高²（m²）",
           "分類：<18.5 過輕；18.5–24.9 正常；25.0–29.9 過重；≥30.0 肥胖",
           "亞裔族群建議較低切點：≥23 過重、≥25 肥胖",
           "缺點：無法區分體脂、肌肉與骨骼"
         ]},
         {t:"腰圍（Waist Circumference）", sub:[
           "腹部脂肪（內臟脂肪）的代理指標，與心臟代謝風險相關",
           "高風險切點（Table 3.1）：男性 >102 cm（>40 in）、女性 >88 cm（>35 in）"
         ]},
         {t:"腰臀比（WHR）", sub:[
           "腰圍 ÷ 臀圍",
           "<60 歲高風險：男性 WHR > 0.95、女性 WHR > 0.86"
         ]},
         {t:"皮褶厚度（Skinfold）", sub:[
           "測量多個皮褶估算體脂率（與金標準 r = 0.70–0.93）",
           "需受過訓練的技術員，以標準解剖位置測量",
           "使用種族/年齡/性別特定回歸方程式轉換"
         ]},
         "其他方法：水下秤重（Hydrodensitometry）、空氣置換體積描記法（ADP）、雙能 X 光吸收測定（DXA）"
       ]},
      {h:"靜息血壓測量（Box 3.1，PDF p174–175）",
       list:[
         "坐姿靜坐至少 5 分鐘（最好 15 分鐘），背部支撐、腳平放、手臂與心臟等高",
         "測試前 30 分鐘避免吸菸及咖啡因",
         "袖帶應包覆上臂 ≥80%；聽診器置於肘窩上方肱動脈",
         "Korotkoff 第一音 = SBP；聲音消失前 = DBP",
         "至少量兩次（間隔 ≥1 分鐘），取平均值；初次應量兩側手臂"
       ]},
      {h:"心肺適能（CRF）評估",
       list:[
         "最大攝氧量（VO₂max）：黃金標準，需最大運動測試",
         "次最大運動測試（Submaximal）：推測 VO₂max，適合健康/體適能環境",
         "常用方案：Bruce Protocol、Balke Protocol、YMCA 腳踏車測試、臺階測試",
         "功能能力（Functional Capacity）：以 METs 表示，是獨立健康預測因子"
       ]},
      {h:"肌肉適能評估",
       list:[
         "最大肌力（1-RM）：測量指定動作的最大一次重複能量",
         "肌耐力：伏地挺身測試、仰臥起坐測試、YMCA 啞鈴抬舉測試",
         "握力（Handgrip Strength）：常用於功能性肌力評估，與全因死亡率相關"
       ]}
    ],
  acsm11:{
    pageStr:"212-216",
    blocks:[
      {h:"年齡範圍與常模差異說明（PDF p212）",body:"11版 Table 3.8/3.9 僅涵蓋 20-69 歲（5個年齡組），使用早期 FRIEND 資料庫（樣本較小）。12版更新至 20-89 歲（7個年齡組），新增 70-79、80-89），且樣本更大，因此各年齡組數值有所不同；12版男性年輕組數值系統性低於11版。"},
      {h:"11版 Table 3.8：跑步機 VO₂max 常模（男性）（PDF p212）",table:{head:["百分位","分類","20-29","30-39","40-49","50-59","60-69"],rows:[["95","Superior","66.3","59.8","55.6","50.7","43.0"],["90","Excellent","61.8","56.5","52.1","45.6","40.3"],["75","Good","55.2","49.2","45.0","39.7","34.5"],["50","Fair","48.0","42.4","37.8","32.6","28.2"],["25","Poor","40.1","35.9","31.9","27.1","23.7"],["10","Very poor","32.1","30.2","26.8","22.8","19.8"],["5","Very poor","29.0","27.2","24.2","20.9","17.4"]]}},
      {h:"11版 Table 3.8：跑步機 VO₂max 常模（女性）（PDF p213）",table:{head:["百分位","分類","20-29","30-39","40-49","50-59","60-69"],rows:[["95","Superior","56.0","45.8","41.7","35.9","29.4"],["90","Excellent","51.3","41.4","38.4","32.0","27.0"],["75","Good","44.7","36.1","32.4","27.6","23.8"],["50","Fair","37.6","30.2","26.7","23.4","20.0"],["25","Poor","30.5","25.3","22.1","19.9","17.2"],["10","Very poor","23.9","20.9","18.8","17.3","14.6"],["5","Very poor","21.7","19.0","17.0","16.0","13.4"]]}},
      {h:"11版與12版跑步機常模關鍵數值比較（男性95th / 50th）",table:{head:["年齡組","11版 95th","12版 95th","11版 50th","12版 50th"],rows:[["20-29","66.3","63.5","48.0","46.5"],["30-39","59.8","58.8","42.4","39.7"],["40-49","55.6","54.6","37.8","35.3"],["50-59","50.7","47.6","32.6","29.2"],["60-69","43.0","40.6","28.2","24.6"]]}}
    ]
  }
  },
  {
    id:"p_protocols", kind:"principle", cat:"核心原則 General Principles", chapter:"第3章 體適能測試 Fitness Testing", name:"運動測試流程", en:"Testing Protocols",
    fullname:"運動測試流程 Testing Protocols", page:283, pageStr:"283-290", desc:"跑步機/腳踏車標準測試流程(Bruce/Balke等)", detailed:true,
    sections:[
      {h:"臨床運動測試的執行（PDF p283–288）",
       list:[
         "執行前需確認：禁忌症（Box 4.1）、測試流程/模式、測試終止指標、藥物、人員與設備緊急準備",
         "測試前：取得知情同意、記錄病史/用藥/目前症狀、靜息 ECG 評估（確認無新發現）",
         {t:"測試模式選擇", sub:[
           "跑步機（Treadmill）：美國最常用；可量化速度與坡度，但需注意抓扶手會高估體能",
           "腳踏車計功器（Cycle Ergometer）：歐洲較常用；VO₂peak 比跑步機低 5%–20%（局部肌肉疲勞）",
           "其他：手臂計功器、複合式計功器——適合行動不便、截肢、重度肥胖者"
         ]}
       ]},
      {h:"運動測試流程設計原則（PDF p288–290）",
       list:[
         "標準化流程提供可重複、可比較的結果，但應依個人年齡、運動耐受性、病史及疾病狀態個別化",
         "包含低強度熱身期，接著為漸進、連續運動，負荷逐步增加至最大程度",
         "建議總測試時間：8–12 分鐘（過短或過長均降低測試準確性）",
         "以能量需求估算 MET 值，是評估心肺適能（CRF）的常用指標"
       ]},
      {h:"常用跑步機測試方案（PDF p288–290，Figure 4.1）",
       table:{head:["流程","特點","適用族群"],rows:[
         ["Bruce Protocol","最廣泛使用；第一階段 ~5 METs，每階段增加 ~3 METs；坡度和速度同時遞增","一般健康/心臟病患（高體能者）"],
         ["Modified Bruce Protocol","在 Bruce 的前兩階段前加入 1.7 mph/0% 及 1.7 mph/5%兩個低強度階段","低體能、心臟病、老年者"],
         ["Balke-Ware Protocol","速度恒定（3.3 mph），只增加坡度（1%/min）；負荷增加緩和","低體能或心臟病患者"],
         ["Naughton Protocol","緩慢漸進，每 2 分鐘增加 1 MET；適合心臟病復健","心肺功能較差患者、心臟復健"],
         ["Ramp Protocol","個別化；線性緩慢增加負荷，目標 8–12 min 達到最大","個別化首選"]
       ]},
       list:[
         "腳踏車計功器：YMCA Protocol（25–150 W 階段式增量）、WHO Protocol（30–60 W 每階段）"
       ]},
      {h:"測試期間監測（PDF p290）",
       list:[
         "每分鐘（或每階段）記錄：HR、ECG、心律、BP",
         "RPE：使用 Borg 6–20 量表，每分鐘評估",
         "監測：臨床症狀、自述症狀（心肌缺血、血液灌流不足、肺通氣受限等）",
         "可選：呼氣氣體分析（CPET，測 VO₂max）、血氧飽和度（SpO₂）"
       ]},
      {h:"禁忌症（Box 4.1，PDF p284）",
       list:[
         {t:"絕對禁忌症（Absolute Contraindications）", sub:[
           "48 小時內急性心肌梗塞",
           "持續不穩定型心絞痛",
           "血動力學受損的不受控心律不整",
           "活動性心內膜炎",
           "有症狀的嚴重主動脈瓣狹窄",
           "失代償性心衰竭",
           "急性肺栓塞、肺梗塞或深部靜脈栓塞",
           "急性心肌炎或心包炎",
           "急性主動脈剝離",
           "無法安全測試的身體障礙"
         ]},
         {t:"相對禁忌症（Relative Contraindications）", sub:[
           "已知左主冠狀動脈阻塞性狹窄",
           "中至重度主動脈瓣狹窄（與症狀關係不明）",
           "未受控心室率的心動過速",
           "靜息高血壓：SBP >200 mmHg 或 DBP >110 mmHg",
           "近期中風或短暫性腦缺血發作（TIA）",
           "未矯正的重大貧血、電解質失衡、甲狀腺功能亢進"
         ]}
       ]}
    ]
  },
  {
    id:"p_emergency", kind:"principle", cat:"核心原則 General Principles", chapter:"第2章 參與前評估 Preparticipation Evaluation", name:"緊急應變與 AED", en:"Emergency & AED",
    fullname:"緊急應變與 AED Emergency & AED", page:128, pageStr:"126-130", desc:"運動場所緊急處理、AED、人員資格", detailed:true,
    sections:[
      {h:"人員訓練要求（PDF p128）",
       body:"運動場所必須確保在場人員經過適當訓練並被授權執行緊急處理程序，包括使用急救設備。",
       list:[
         "所有相關人員須接受訓練，具備執行緊急程序的資格",
         "訓練項目涵蓋設備操作、CPR、AED 使用等"
       ]
      },
      {h:"緊急政策與程序（PDF p128）",
       body:"書面緊急政策與程序必須到位，並每季審查一次（quarterly review）。",
       list:[
         "涵蓋場景：常見骨科傷害、心血管（CV）事件、中風（stroke）、低血糖（hypoglycemia）",
         "政策須明確標示所有緊急設備位置：AED（自動體外去顫器）、電話、急救箱",
         "須標示整棟建築的出入口位置"
       ]
      },
      {h:"緊急演練（Emergency Drills）（PDF p128）",
       list:[
         "建議每年至少演練兩次（at least twice a year）",
         "若有人員異動，應增加演練頻率"
       ]
      },
      {h:"事故報告（Incident Report）（PDF p128）",
       body:"發生緊急事件後，須妥善記錄。事故報告應包含以下五項要素：",
       list:[
         "(a) 事件發生的日期、日、時間與地點",
         "(b) 當事人（含工作人員）及其聯絡資訊",
         "(c) 目擊者及其聯絡資訊",
         "(d) 事件詳細描述及所採取的行動",
         "(e) 事件或行動的後果與結果"
       ]
      },
      {h:"知情同意（Informed Consent）（PDF p126）",
       body:"在任何測試或運動介入前，必須取得知情同意，屬重要的倫理與法律要求。",
       list:[
         "同意書須涵蓋：目的、風險、退出權利",
         "須口頭說明並記錄參與者的提問與回答",
         "保護個人健康資訊（依 HIPAA 規定）",
         "同意書格式應事先經法律顧問或機構倫理委員會審核"
       ]
      }
    ]
  },{
    id:"p_behavior", kind:"principle", cat:"核心原則 General Principles", chapter:"第12章 行為策略 Behavior-Based Strategy", name:"行為改變與運動依從", en:"Behavior Change",
    fullname:"行為改變與運動依從 Behavior Change", page:980, pageStr:"980-1012", desc:"促進運動習慣養成與維持的理論與策略", detailed:true,
    sections:[
      {h:"行為改變理論總覽（PDF p981-991）",
       list:[
         {t:"社會認知理論（SCT）p981",
          sub:["核心三要素：個人因素 × 行為 × 環境（動態互動）",
               "自我效能（Self-Efficacy）：相信自己能成功執行運動",
               "結果期望（Outcome Expectations）：預期行為帶來的結果",
               "自我調節（Self-Regulation）：設目標、自我監控、問題解決、自我獎勵"]},
         {t:"跨理論模型（TTM）p981-985 — 五個改變階段",
          sub:["前沉思期 Precontemplation：未打算在 6 個月內規律運動",
               "沉思期 Contemplation：打算 6 個月內開始",
               "準備期 Preparation：打算 30 天內開始",
               "行動期 Action：已規律運動 <6 個月",
               "維持期 Maintenance：已規律運動 ≥6 個月",
               "關鍵：決策平衡（Decisional Balance）+ 自我效能"]},
         {t:"健康信念模型（HBM）p985-986",
          sub:["感知易感性、感知嚴重性、感知利益、感知障礙、行動線索、自我效能"]},
         {t:"自我決定理論（SDT）p989-990",
          sub:["動機連續體：無動機 → 外在動機（獎懲）→ 內在動機（樂趣/興趣）",
               "三大心理需求：自主性（Autonomy）、勝任感（Competence）、關聯性（Relatedness）",
               "長期依從：內在動機優於外在動機"]},
         {t:"計畫行為理論（TPB）p990-991",
          sub:["態度（Attitudes）+ 主觀規範（Subjective Norms）+ 感知行為控制（Perceived Behavioral Control）→ 意圖 → 行為"]}
       ]
      },
      {h:"自我效能（Self-Efficacy）提升策略（PDF p992-996）",
       body:"自我效能五大來源（Table 12.6）：",
       list:[
         "精熟經驗（Mastery Experiences）：設可達成目標、逐步進階",
         "替代經驗（Vicarious Experiences）：觀看相似背景者成功運動",
         "口頭說服（Verbal Persuasion）：正向回饋與鼓勵",
         "生理回饋（Physiological Feedback）：解釋心率、RPE 等生理反應",
         "情緒狀態（Emotional States）：用音樂、環境提升正向情緒"
       ]
      },
      {h:"SMARTS 目標設定（PDF p997-998）",
       body:"目標設定是促進運動行為最有力的工具之一（Table 12.7）。",
       table:{
         head:["字母","意義","說明"],
         rows:[
           ["S","Specific 具體","目標要精確清楚"],
           ["M","Measurable 可量化","能量化追蹤"],
           ["A","Action-oriented 行動導向","說明需要做什麼"],
           ["R","Realistic 可達成","可行的目標"],
           ["T","Timely 有時限","設定具體時間框架"],
           ["S","Self-determined 自我決定","目標由個案自行設定"]
         ]
       },
       list:[
         "短期目標（每日/每週）有助於提升自我效能",
         "需同時設定短期與長期目標"
       ]
      },
      {h:"常見障礙與問題解決（PDF p998-1000）",
       body:"常見障礙（Table 12.8）：時間不足、缺乏動機、缺乏技能、花費高、缺乏社交。\n問題解決四步驟：",
       list:[
         "1. 辨識障礙",
         "2. 與個案腦力激盪策略",
         "3. 選擇個案認為最可行的策略",
         "4. 分析效果、必要時修正"
       ]
      },
      {h:"社會支持（Social Support）（PDF p1000-1001）",
       body:"社會支持類型（Table 12.9）：",
       list:[
         "工具性（Instrumental）：實際協助「幫你去運動」",
         "情感性（Emotional）：給予鼓勵「我為你驕傲」",
         "資訊性（Informational）：提供資訊「你可以試試這個計畫」",
         "陪伴性（Companionship）：一起運動「我陪你去」"
       ]
      },
      {h:"動機與情感（Affect）/ 增強策略（PDF p1001-1003）",
       list:[
         "選擇個案喜歡的運動類型以建立內在動機",
         "低至中強度運動情感反應通常為正向；高強度（超過換氣閾值）情感反應趨負向",
         "HIIT 對於有運動經驗者可能有效，但對久坐者需謹慎",
         "外在獎勵（新衣服、金錢）可啟動行為；長期依從需靠內在獎勵（成就感、樂趣）",
         "復發預防（Relapse Prevention）：預先識別高風險情境（旅行、假期、病假）、擬備用計畫"
       ]
      },
      {h:"動機性訪談（Motivational Interviewing）（PDF p1008-1009）",
       body:"以個案為中心的溝通策略，有效促進運動採納與回歸（Table 12.10）。",
       list:[
         "核心態度：不評判（nonjudgmental）、同理（empathic）、鼓勵自主性",
         "目標：解決矛盾心理（Ambivalence），引發「改變對話（Change Talk）」",
         "常用技巧：開放性問題、重要性量尺（Importance Ruler）、信心量尺（Confidence Ruler）、探索利弊",
         "5A's 法：Ask → Advise → Assess → Assist → Arrange"
       ]
      }
    ]
  },  {
    id:"cr_overview", kind:"principle", cat:"心臟復健分期 Cardiac Rehab Phases", name:"心臟復健總論", en:"CR Overview",
    fullname:"心臟復健總論與分期 Cardiac Rehab Overview", page:528, pageStr:"520-538", desc:"心臟復健的定義、適用對象、Phase I/II/III 架構總覽", detailed:true,
    sections:[
      {h:"CR 定義與分期架構（PDF p528）",
       body:"心臟復健（Cardiac Rehabilitation, CR）是一種協調性、多面向介入，旨在降低風險、促進健康行為、並減少心臟病患者的失能（disability）。",
       list:[
         "Phase 1：住院期（Inpatient）",
         "Phase 2：早期門診期（Early Outpatient）",
         "Phase 3：維持期（Maintenance Outpatient）"
       ]
      },
      {h:"適用對象 Indications（Box 8.3，PDF p531）",
       list:[
         "急性冠心病後穩定者（Medically stable post-MI）",
         "穩定型心絞痛（Stable angina）",
         "冠狀動脈繞道手術（CABG）",
         "經皮冠狀動脈介入術（PCI / PTCA）",
         "穩定型心衰竭（收縮或舒張功能不全）",
         "心臟移植（Heart transplantation）",
         "心臟瓣膜疾病或手術",
         "週邊動脈疾病（PAD）",
         "CHD 高風險：糖尿病、血脂異常、高血壓、肥胖"
       ]
      },
      {h:"禁忌症 Contraindications（Box 8.3，PDF p531-532）",
       list:[
         "不穩定型心絞痛",
         "未控制高血壓（靜息 SBP >180 或 DBP >110 mmHg）",
         "姿位性 SBP 下降 >20 mmHg（伴症狀）",
         "嚴重主動脈瓣狹窄（瓣膜面積 <1.0 cm²）",
         "未控制心房或心室心律不整",
         "未控制竇性心搏過速（>120 bpm）",
         "未代償性心衰竭",
         "第三度房室傳導阻斷（無起搏器）",
         "急性心包炎或心肌炎、近期栓塞、急性血栓性靜脈炎、主動脈剝離"
       ]
      },
      {h:"CR 有效性證據（PDF p521-522, 535）",
       list:[
         "降低心血管相關死亡率 26%（2023 年 meta-analysis，85 項 RCT，23,430 人）",
         "降低全因住院率 23%，降低 MI 發生率 18%",
         "提升運動耐力、改善生活品質、減少心絞痛",
         "降低後續醫療費用（具成本效益）",
         "現狀：<29% 合格 Medicare 患者有實際參與 ≥1 次 CR"
       ]
      },
      {h:"CR 轉介策略（Table 8.1，PDF p534）",
       list:[
         "自動電子病歷轉介系統（最有效）",
         "住院聯絡員協助教育並引導轉介",
         "住院前即安排門診復健預約（12 天內）",
         "納入居家/社區 CR 方案（低至中風險者）",
         "彈性開放時間（早晨、午間、下班後、週末）",
         "降低或免除自費費用"
       ]
      }
    ]
  },
  {
    id:"cr_phase1", kind:"principle", cat:"心臟復健分期 Cardiac Rehab Phases", name:"Phase I 住院期", en:"Inpatient (Phase I)",
    fullname:"Phase I 住院期心臟復健 Inpatient CR", page:528, pageStr:"528-533", desc:"急性期早期活動、AACVPR 每日步行參數、中止運動的不良反應", detailed:true,
    sections:[
      {h:"Phase I 住院期目標（PDF p528）",
       list:[
         "患者評估與臨床穩定",
         "預防次要事件（如栓塞）",
         "避免臥床、促進早期活動與步行",
         "健康教育：診斷、危險因子、日常生活活動（ADL）恢復、用藥",
         "出院規劃：轉介至門診 Phase II CR"
       ]
      },
      {h:"早期活動時程（PDF p529）",
       body:"MI 後 12–24 小時內，間歇性坐起或站立（gravitational stress）可預防急性心臟事件後臥床所導致的運動耐力下降。",
       list:[
         "自我照護活動（坐起、如廁）",
         "上下肢關節活動（Range of Motion）",
         "姿位變化訓練",
         "短至中距離有監督步行，每天 3–4 次",
         "輕度上肢動作訓練",
         "出院前練習爬少量樓梯"
       ]
      },
      {h:"Box 8.2：AACVPR 每日步行啟動標準（PDF p530）",
       body:"以下條件均需滿足，方可開始住院步行訓練：",
       list:[
         "前 8 小時內無新發或復發性胸痛",
         "肌鈣蛋白（Troponin）及肌酸激酶（CK）穩定或下降中",
         "無失代償性心衰竭跡象（如靜息呼吸困難、雙側肺底囉音）",
         "前 8 小時心律正常、ECG 穩定"
       ]
      },
      {h:"監測項目（PDF p529）",
       list:[
         "心率（HR）與收縮壓（SBP）血流動力學反應",
         "心律（Rhythm）與 ECG ST 段變化",
         "新出現症狀：胸痛、呼吸困難、心悸、疲勞"
       ]
      },
      {h:"Box 8.4：住院期中止運動的不良反應（PDF p533）",
       list:[
         "舒張壓（DBP）≥ 110 mmHg",
         "運動負荷增加時 SBP 下降 >10 mmHg",
         "顯著心室或心房心律不整（含症狀或無症狀）",
         "第二或第三度房室傳導阻斷",
         "運動不耐受症狀：心絞痛、明顯呼吸困難、ECG 顯示缺血變化"
       ]
      },
      {h:"出院注意事項（PDF p533）",
       list:[
         "出院前須提供運動計畫",
         "運動強度上限：不超過住院期間觀察到的最高 HR 或 RPE",
         "需告知患者辨識異常症狀（運動不耐受），必要時就醫",
         "轉介門診 CR：強烈建議並在住院期間安排好 12 天內的預約"
       ]
      }
    ],
  acsm11:{
    pageStr:"451-453",
    blocks:[
      {h:"11版 FITT表：住院期心臟復健（PDF p451-452）",body:"11版明確列出一個獨立 FITT 表，只有有氧與柔軟度兩欄；表末腳注明示：住院期不建議阻力訓練（Resistance training is not recommended in the inpatient setting）。",table:{head:["項目","有氧 Aerobic","柔軟度 Flexibility"],rows:[["Frequency 頻率","住院頭3天：每天 2–4 次（2–4 sessions · d⁻¹ for the first 3 d）","每天至少1次，可耐受時盡量多做（Minimally once per day but as often as tolerated）"],["Intensity 強度","坐/立位安靜 HRrest +20 beats · min⁻¹（MI患者）；或 HRrest +30 beats · min⁻¹（心臟手術後）。上限 ≤120 beats · min⁻¹，對應 RPE ≤13（Borg 6–20 量表）","非常輕微的拉伸不適感（Very mild stretch discomfort）"],["Time 時間","從間歇步行 3–5 分鐘開始，可耐受時逐步延長。休息期可為慢走或完全休息，時間短於運動期。目標 2:1 運動/休息比（exercise/rest ratio）；進展至連續步行 10–15 分鐘","每個關節至少 30 秒，須注意胸骨保護（sternal precautions）"],["Type 類型","步行（Walking）為主。有設備的機構可使用跑步機、腳踏車等","著重 ROM 與動態動作；特別注意下背部與大腿後側。臥床患者可由醫療人員（ACSM-CEP、PT）執行被動拉伸"]]}},
      {h:"關鍵提醒（PDF p452-453）",list:["阻力訓練住院期不建議（footnote 明示）","個別教育應在確認患者身體能力與心理準備後才進行","住院期每日由合格人員（ACSM-CEP）進行個別評估並保守使用 FITT 建議"]}
    ]
  }
  },
  {
    id:"cr_phase2", kind:"principle", cat:"心臟復健分期 Cardiac Rehab Phases", name:"Phase II 門診期", en:"Outpatient (Phase II)",
    fullname:"Phase II 門診期心臟復健 Outpatient CR", page:536, pageStr:"527-538", desc:"早期門診監督式復健:目標、組成、ECG 監測、運動處方", detailed:true,
    sections:[
      {h:"Box 8.5：門診 CR 目標（PDF p536）",
       list:[
         "制定並協助個案執行安全有效的運動與生活方式計畫",
         "提供適當監督與監測，偵測臨床狀態變化",
         "持續向醫療提供者回報，強化醫療管理",
         "協助回歸職業與休閒活動（或依臨床狀態調整）",
         "個案與家屬教育：次級預防（危險因子控制、心臟保護藥物）"
       ]
      },
      {h:"Box 8.6：門診 CR 核心組成（PDF p537）",
       list:[
         "心血管危險因子評估與生活方式管理諮詢",
         "健康生活方式教育與支持（減少次要心臟事件風險）",
         "個人化運動計畫制定、實施與監督",
         "血壓、血脂、血糖監測目標",
         "心理/壓力評估與諮詢",
         "與個案主治醫師及醫療團隊溝通",
         "協助回歸適當的職業與休閒活動"
       ]
      },
      {h:"入程評估（PDF p537）",
       list:[
         "完整醫療與手術史（最近心血管事件、合併症）",
         "回顧：12 導聯 ECG、冠狀動脈攝影、超音波、壓力測試結果",
         "起搏器 / ICD 設定（若有）"
       ]
      },
      {h:"運動中監測項目（PDF p537）",
       list:[
         "心率（HR）、心律（Cardiac Rhythm）",
         "血壓（BP）、體重",
         "缺血症狀（心絞痛、ECG ST 變化）",
         "心衰竭失代償症狀",
         "過度疲勞",
         "用藥變更"
       ]
      },
      {h:"ECG 監測（PDF p538）",
       body:"ECG 連續監測是門診 CR 的特色，但並非必要。實際使用程度取決於：",
       list:[
         "患者風險程度",
         "是否已完成症狀限制性最大運動測試",
         "第三方保險的要求"
       ]
      },
      {h:"運動處方 FITT（FITT，PDF p527，適用 CHD / CR）",
       table:{
         head:["項目","有氧 Aerobic","阻力 Resistance","柔軟度 Flexibility"],
         rows:[
           ["Frequency","≥3–5 d/週","2–3 d/週（不連續）","≥2–3 d/週"],
           ["Intensity","起始 40%–60% HRR → 進階至 60%–80% HRR；缺血閾值 HR -10 bpm；無運動測試時用 Talk Test + RPE","60%–70% 1-RM","拉伸至緊繃或輕微不適感"],
           ["Time","≥20–60 min","1–2 組 × 10–15 下","靜態拉伸 10–30 秒，重複 2–4 次"],
           ["Type","步行、腿部測功計、上下肢複合測功計、臥式腳踏車、橢圓機、爬梯機、跑步機","多關節與單關節，涵蓋主要肌群，多種器械","每主要肌肉肌腱單元均需進行"]
         ]
       },
       list:[
         "注意：禁止使用 220-年齡 公式估算 CHD 患者的最大心率",
         "β 阻斷劑會降低靜息與運動心率，須依新 THR 重新設定（或以測功計同負荷下的 HR ±5 bpm 估計）",
         "心絞痛：運動強度應維持在缺血閾值 HR -10 bpm 以下；反覆心絞痛者可考慮運動前使用硝化甘油",
         "阻力訓練建議在 2–4 週規律有氧訓練後再加入"
       ]
      }
    ],
  acsm11:{
    pageStr:"458-460",
    blocks:[
      {h:"11版阻力訓練強度差異（PDF p458）",body:"11版阻力訓練強度為 40%–60% 1-RM；12版提升至 60%–70% 1-RM。同樣維持 10–15 下的次數範圍，但強度門檻明顯提高。",list:["11版：RPE 11–13（Borg 6–20 量表），40%–60% 1-RM","12版：60%–70% 1-RM"]},
      {h:"11版無運動測試時有氧強度（PDF p458）",body:"11版指定具體公式：無氧代謝閾值測試時，以 HRrest +20 至 +30 beats·min⁻¹ 或 RPE 12–16（Borg 6–20）作為強度依據。12版改為「Talk Test + RPE + 臨床判斷」，取消了 HRrest+20/+30 的公式。",list:["11版：HRrest +20 to +30 beats·min⁻¹ OR RPE 12–16","12版：Talk Test + RPE + clinical judgement（無 HRrest 公式）"]},
      {h:"11版 HIIT 建議（PDF p460）",body:"11版明確指出：HIIT 對心臟族群可能有益，但尚無普遍接受的指引；建議在完成 12–18 次早期監督式 CR 後，再將 HIIT 移至「維持期」或社區型計畫使用。12版未在 FITT 表中提及此具體次數門檻。",list:["11版：HIIT 宜在完成 12–18 次早期監督 CR sessions 後再引入維持期/社區計畫","12版：未標明 12–18 次門檻"]}
    ]
  }
  },
  {
    id:"cr_phase3", kind:"principle", cat:"心臟復健分期 Cardiac Rehab Phases", name:"Phase III/IV 維持期", en:"Maintenance (Phase III/IV)",
    fullname:"Phase III/IV 維持期 Maintenance", page:535, pageStr:"535-538", desc:"長期維持期:轉為社區/居家、降低監督、終身運動習慣", detailed:true,
    sections:[
      {h:"Phase III/IV 在書中的定位（PDF p528, 535）",
       body:"ACSM 第 12 版對 Phase III/IV 維持期並無獨立章節，主要以「門診 CR」的延伸形式描述。書中將 CR 分為：Phase 1（住院期）與 Phases 2（早期門診）和 3（維持期），後兩者合稱「門診 CR」。",
       list:[
         "Phase 2（早期）→ Phase 3（維持）：屬同一門診體系，逐步降低監督強度",
         "Phase 3 又稱 Maintenance Phase，重點是長期持續習慣的建立"
       ]
      },
      {h:"維持期核心特點（PDF p535）",
       list:[
         "從中心式（facility-based）過渡至居家/社區式（home/community-based）",
         "監督由同步（synchronous）轉為非同步（asynchronous）模式",
         "CR 工作人員仍提供遠距監測與支持",
         "目標：終身規律運動、長期二級預防"
       ]
      },
      {h:"替代式 CR 模式（Alternative Delivery Models）（PDF p535）",
       body:"書中有強力證據支持替代式 CR 方案（等同 Phase III 轉換的主要路徑）：",
       list:[
         "虛擬 CR（Virtual CR）：改善依從性、整體身體活動量與功能容量",
         "混合式 CR（Hybrid CR）：中心 + 居家遠距監測，參與率與運動能力改善與純中心式相似",
         "居家方案適合低至中風險個案"
       ]
      },
      {h:"轉介至維持期的關鍵要素",
       body:"書中未明確列出 Phase III 的獨立運動處方數值，維持期的 FITT 建議延續 Phase II 處方（見 cr_phase2），並依個人狀態調整：",
       list:[
         "持續達成 ≥150 min/週中強度有氧運動的長期目標",
         "根據功能容量持續進階",
         "維持阻力與柔軟度訓練",
         "定期與醫療提供者回顧危險因子控制情形"
       ]
      }
    ]
  },
  {
    id:"cr_icu", kind:"principle", cat:"心臟復健分期 Cardiac Rehab Phases", name:"ICU 早期活動", en:"ICU Early Mobilization",
    fullname:"ICU 早期活動 ICU Early Mobilization", page:529, pageStr:"528-530", desc:"加護病房早期活動原則(ACSM 著墨較少,以早期活動概念為主)", detailed:true,
    sections:[
      {h:"書中著墨程度說明",
       body:"ACSM 第 12 版對 ICU 早期活動並無獨立章節或詳細指引。相關內容散見於第 8 章住院期心臟復健（Inpatient CR, Phase I）段落中，以下整理書中明確提到的內容。"
      },
      {h:"ICU 早期活動原則（PDF p528-529）【書中明確記載】",
       body:"心臟外科加護病房（cardiothoracic ICU）中可開始早期活動。",
       list:[
         "MI 後 12–24 小時內：間歇性坐起或站立（gravitational stress）可預防急性心臟事件後因臥床引起的運動耐力惡化",
         "早期活動的最佳劑量（optimal dose）目前尚未明確定義",
         "活動程序應循序漸進（見下方）"
       ]
      },
      {h:"ICU/住院早期活動進程（PDF p529）【書中明確記載】",
       list:[
         "第一步：自我照護活動（Self-care）：坐起、如廁",
         "第二步：上下肢關節活動（Arm and leg range of motion）",
         "第三步：姿位變化（Postural changes）",
         "第四步：短至中距離有監督步行，最少輔助，每天 3–4 次",
         "其他：輕度上肢動作運動、出院前少量樓梯訓練"
       ]
      },
      {h:"活動期間監測（PDF p529）【書中明確記載】",
       list:[
         "心率（HR）與收縮壓（SBP）血流動力學反應",
         "心律與 ECG ST 段變化",
         "新出現症狀：胸痛、呼吸困難、心悸、疲勞"
       ]
      },
      {h:"步行啟動前須滿足 Box 8.2 條件（PDF p530）【書中明確記載】",
       list:[
         "前 8 小時無新發/復發胸痛",
         "CK 及 Troponin 穩定或下降",
         "無失代償性心衰竭（無靜息呼吸困難、無雙側肺底囉音）",
         "前 8 小時心律正常、ECG 穩定"
       ]
      },
      {h:"補充說明【書中較簡略，ACSM 著墨不多】",
       list:[
         "並非所有患者都適合住院期運動，但幾乎所有人都受益於 PA 諮詢與健康教育",
         "書中未提供 ICU 專屬的強度/時間/頻率數值",
         "詳細 ICU 早期活動指引請參考 AACVPR 或 SCCM 相關指南（超出本書範疇）"
       ]
      }
    ]
  },
{
    id:"children", cat:"一般族群 General", name:"兒童與青少年", en:"Children & Adolescents", page:396, pageStr:"396-398", status:"full", detailed:true,
    aerobic:{f:"每天；每週至少 3 天需包含高強度", i:"中強度（HR 和呼吸明顯增加）至高強度（HR 和呼吸大幅增加）", t:"≥60 分鐘/天（主要為有氧部分）", ty:"有趣且發展適齡的活動：跑步/追逐遊戲、健走、跳繩、游泳、舞蹈、騎車、球類運動（足球、籃球、網球）"},
    resistance:{f:"≥3 天/週（可納入 60 分鐘有氧中的一部分）", i:"非結構性：不規定強度；結構性：1–2 組 × 8–12 下次最大（<60% 1-RM），可進展至較少次數較重負荷（>80% 1-RM）加上良好動作形式", t:"納入每天 ≥60 分鐘的一部分", ty:"非結構性（遊樂場玩耍、爬樹、拔河）或結構性（伏地挺身、仰臥起坐、藥球、彈力帶）；需適當監督"},
    flex:{f:"納入日常活動", i:"適中至高衝擊（骨骼強化）", t:"納入每天 ≥60 分鐘的一部分", ty:"骨骼強化活動：跑步、跳繩、籃球、網球、阻力訓練、跳房子"},
    extra:{label:"骨骼強化", f:"≥3 天/週", i:"中至高強度衝擊或肌力負荷", t:"—", ty:"產生骨骼應變的動態、短時間、中高強度、多方向刺激：跑步、跳躍、跳繩、彈跳等"},
    clinical:[
      {h:"每日 60 分鐘 PA 的結構", items:["總目標：≥60 分鐘/天的中至高強度身體活動（MVPA）","有氧：大部分時間；每週至少 3 天需含高強度","肌力：至少每週 3 天（含在 60 分鐘內）","骨骼強化：至少每週 3 天（可與有氧或肌力重疊）","體重過重或不活動者：無法立即達到 60 分鐘目標 → 用 RPE 評估強度，從中強度開始漸進"]},
      {h:"骨骼強化的重要性", items:["青春期是骨量積累的關鍵窗口：干預研究顯示 3–18 歲者可獲得額外 0.6–1.7% 年骨量增加","骨骼對動態、短時、中高強度、不規則方向的衝擊刺激反應最佳","建議在青訓計畫中納入骨骼負荷考量"]}
    ],
    special:[
      {h:"安全與特殊注意事項", items:["阻力訓練：需適當指導和監督；可應用成人指南，但監督和設計更關鍵","體溫調節：體溫調節系統尚未成熟 → 高溫高濕環境避免持續高強度運動；運動前中後適當補水","鼓勵多樣化活動，減少靜態時間（看電視、上網、非活動型電玩）","有特殊疾病者（氣喘、糖尿病、肥胖、囊性纖維化、腦性麻痺）：轉介相關專科","年輕運動員：肌力與體能訓練有助於提升表現和降低受傷風險，是長期運動發展的一部分"]}
    ],
  acsm11:{
    pageStr:"349-350",
    blocks:[
      {h:"11版阻力訓練強度差異（PDF p349-350）",body:"11版 FITT 表阻力訓練欄只列「體重為阻力」，強度以到達中度疲勞的 8–15 次次最大反覆為標準，未提供 %1-RM 區間。12版新增具體強度分層：起始 <60% 1-RM（8–12 下），之後可進展至 >80% 1-RM 配合較少次數。",list:["11版：8–15 次，到達中等疲勞即止（無 %1-RM）","12版：1–2 組 × 8–12 下（<60% 1-RM），進階可 >80% 1-RM 配合較少次數"]}
    ]
  }
  },
{
    id:"older_adults", cat:"一般族群 General", name:"老年人", en:"Older Adults", page:439, pageStr:"439-445", status:"full", detailed:true,
    aerobic:{f:"中強度：≥5 天/週；高強度：≥3 天/週；混合：3–5 天/週", i:"中強度（CR10 3–4 / Borg 12–13）漸進至高強度（CR10 ≥5 / Borg 14–17）", t:"中強度 ≥150 分鐘/週，或高強度 ≥75 分鐘/週，或等量混合（可在一天內分次累積）", ty:"任何不過度骨骼關節壓力的方式：步行；活動度受限者可選水中或固定腳踏車"},
    resistance:{f:"≥2 天/週（非連續日）", i:"初學者：輕強度（40–50% 1-RM）；漸進至中高強度（60–80% 1-RM）；或調整至最後 2 下有挑戰感", t:"漸進式：初學者 ≥1 組 × 10–15 下；進階 1–3 組 × 8–12 下（8–10 個主要肌群動作）；爆發力：3 組 × 6–10 下高速，或集群組（≤4 下/組）", ty:"漸進式阻力訓練或高速爆發力訓練（medicine ball、kettlebell）；負重徒手動作、爬樓梯"},
    flex:{f:"≥2 天/週（每天最佳）", i:"伸展至緊繃或輕微不適", t:"靜態維持 30–60 秒", ty:"慢速靜態伸展（停在終點，非彈振）"},
    extra:{label:"平衡/神經動作訓練", f:"2–3 天/週（有跌倒風險者必要）", i:"漸進難度（從寬底面積到窄、到閉眼）", t:"—", ty:"漸進難度姿勢（窄站→半串聯→串聯→單腿）、動態平衡（繞障礙步行）、太極；多工任務（步行同時倒數）"},
    clinical:[
      {h:"老年人的特殊生理挑戰", items:["有氧能力低下、肌肉無力、平衡受損和整體去調節是老年人最常見問題，增加依賴風險","老年人強度評估：用 RPE（CR10 量表）比 MET 更合適（MET 的代謝成本因年齡效率下降而增加）","多組分運動計畫（有氧＋阻力＋平衡＋柔軟度）效果優於單組分計畫"]},
      {h:"跌倒預防（最重要的特殊考量）", items:["每年約 1/4 的 ≥65 歲者跌倒；跌倒是老年人致命外傷首因","多組分 PA 含兩種以上組成（肌力、平衡、耐力、柔軟度）：跌倒相關傷害風險降低 32–40%、跌倒骨折風險降低 40–66%","平衡訓練要素：(a) 縮小底面積，(b) 動態重心擾動，(c) 強化姿勢肌群，(d) 減少感覺輸入（閉眼），(e) 太極","多數平衡練習不引起疲勞，建議每天執行"]},
      {h:"爆發力訓練特別重要", items:["肌肉爆發力隨年齡下降速度最快，爆發力不足與功能下降、跌倒、虛弱相關","爆發力訓練改善步速和 Timed-Up-and-Go 效果優於傳統阻力訓練","集群組設計（每組 ≤4 下）：能維持整組爆發力輸出，且更讓人愉快、依從性更高"]}
    ],
    special:[
      {h:"個別化與進展策略", items:["高度去調節、功能受限或有慢性病者：從輕強度和短時間開始，保守進展","慢性病造成無法達最低建議量者：盡力活動，避免靜態","建議老年人超越最低建議量以進一步改善慢性病管理","認知下降者：特別鼓勵有認知＋身體雙重任務的有氧活動（如邊走路邊倒數）","CVD 患者：課程後必須充分緩和，含漸進降強度和柔軟度練習"]}
    ],
  acsm11:{
    pageStr:"372-373",
    blocks:[
      {h:"11版老年人有氧強度 CR10 數值差異（PDF p372）",body:"11版使用 0–10 感覺用力量表，定義中強度為 5–6、高強度為 7–8。12版改為：中強度 CR10 3–4（對應 Borg 6–20 量表 RPE 12–13）、高強度 CR10 ≥5（對應 RPE 14–17）。12版明顯降低了強度門檻值。",table:{head:["強度","11版 CR10","12版 CR10","12版 Borg 6–20"],rows:[["中強度 Moderate","5–6","3–4","RPE 12–13"],["高強度 Vigorous","7–8","≥5","RPE 14–17"]]}}
    ]
  }
  },
{
    id:"pregnancy", cat:"一般族群 General", name:"懷孕", en:"Pregnancy", page:407, pageStr:"400-414", status:"approx", detailed:true,
    aerobic:{f:"最少 3 天/週，鼓勵每天；整週分散", i:"中強度（RPE 13–14；Talk Test — 可說話但不能唱歌；或 RPE 5–6/10）；有規律運動習慣者可繼續高強度，需與醫師討論", t:"目標 ≥150 分鐘/週（20–30 分鐘/次）；任何時間長度均有益", ty:"步行、游泳、水中有氧、固定騎車（不容易摔倒）、低衝擊有氧、跑步（原已習慣者）、改良式瑜伽/彼拉提斯；避免跌倒/腹部撞擊風險高的活動"},
    resistance:{f:"1–3 天/週", i:"輕至中強度；避免 Valsalva 動作；骨盆底肌收縮於重訓前", t:"30–50 分鐘/次（或納入 150 分鐘/週總量中）；單次組數依個人能力", ty:"阻力訓練（安全）；孕後期：仰臥位不舒服時改用半臥或坐姿；避免全仰臥起坐和全髖屈曲"},
    flex:{f:"每天（骨盆底肌訓練）；溫和伸展視需要", i:"避免過度伸展（鬆弛素造成關節過鬆）；骨盆底肌訓練：近最大收縮", t:"Kegel：每天 3 次，每次 8–12 下近最大收縮", ty:"溫和靜態伸展；骨盆底肌訓練（Kegel）；DRA 患者：避免骨盆底肌訓練，改做捲腹（curl-up）和頭抬起"},
    clinical:[
      {h:"懷孕運動的主要效益", items:["預防過度妊娠體重增加、妊娠糖尿病、妊娠高血壓","降低子癇前症和尿失禁風險；改善情緒","減少下背痛、剖腹產機率；縮短生產時間","維持或改善有氧能力；效益具劑量反應關係"]},
      {h:"停止運動的警告徵象（Box 6.1）", items:["陰道出血、腹痛、規律且疼痛的宮縮、羊水漏出","運動前就出現呼吸困難、頭暈、頭痛、胸痛","影響平衡的肌肉無力、小腿疼痛或腫脹"]}
    ],
    special:[
      {h:"禁止或應避免的活動", items:["跌倒或腹部撞擊風險高的活動（不包括非接觸訓練模式）","熱瑜伽、熱彼拉提斯（核心體溫過高風險）","水肺潛水（胎兒去壓病風險）","海拔 6,000 英尺（~1,829m）以上劇烈訓練（低地人需與醫師討論）","Valsalva 動作、長時間靜止站立（降低靜脈回流）","對 DRA 患者：避免骨盆底肌和 drawing-in 運動（會增加 IRD）"]},
      {h:"仰臥位運動的現代建議", items:["最新研究指出：仰臥位運動本身與不良結果無關","若出現頭暈（低血壓）：改為半臥或側躺位，右臀下墊枕頭","感覺不適的孕婦應調整姿勢，但非所有人都需要避免"]},
      {h:"產後運動", items:["與醫師確認可恢復 PA 的時機（自然產 vs 剖腹產不同）","產後 PA：漸進恢復，改善術後恢復、預防體重滯留、改善情緒、降低產後憂鬱風險","哺乳：PA 不干擾哺乳（需補充適當食物和水分）；若嬰兒不喜歡運動後立即哺乳，可先哺乳或運動前先擠奶","DRA 產後：同孕期 ExRx（捲腹和頭抬起，避免骨盆底肌和 drawing-in 運動）"]}
    ]
  },
{
    id:"diastasis_recti", cat:"一般族群 General", name:"腹直肌分離", en:"Diastasis Recti Abdominis", page:413, pageStr:"411-414", status:"none", detailed:true,
    aerobic:{f:"依一般成人建議", i:"依個人耐受度", t:"依一般成人建議", ty:"有氧活動（書中無獨立 FITT 表）"},
    resistance:{f:"依個人耐受度", i:"依個人耐受度", t:"依個人耐受度", ty:"重點：捲腹（curl-up）、頭抬起（head lift）腹部核心訓練"},
    flex:{f:"依需要", i:"舒適範圍", t:"—", ty:"—"},
    clinical:[
      {h:"臨床概念與處方原則", items:[
        "DRA（diastasis recti abdominis）：妊娠期間腹直肌可見分離，以 interrectus distance（IRD）衡量",
        "DRA 處方核心：curl-up（捲腹）和 head lift（頭抬起）可減少 IRD → 建議執行",
        "DRA 需避免：骨盆底肌運動（pelvic floor exercises）和 drawing-in 運動 → 會增加 IRD、加重分離",
        "孕期和產後 DRA 適用相同 ExRx 原則",
        "應與物理治療師合作，針對每位個案進行個人化管理",
        "產後：PA 不干擾哺乳（需補充適當食物與水分）；若嬰兒不適應運動後哺乳，可運動前先哺乳或擠奶"
      ]}
    ],
    special:[
      {h:"安全要點", items:[
        "不要進行強調腹橫肌 drawing-in 或骨盆底肌的核心運動，這些反而使 IRD 增大",
        "避免傳統仰臥起坐（situp）、diagonal curl-up 等動作，優先選擇頭抬起和捲腹",
        "症狀管理應由物理治療師指導；症狀嚴重者需轉介醫療評估"
      ]}
    ]
  },
{
    id:"low_back_pain", cat:"一般族群 General", name:"下背痛", en:"Low Back Pain", page:419, pageStr:"416-425", status:"approx", detailed:true,
    aerobic:{f:"依一般成人（3–5 天/週）；需在疼痛可耐受範圍內", i:"廣泛性疼痛（≥2 身體部位）→ 低至中強度；無廣泛性疼痛 → 中至高強度；配合疼痛監測模型（NRS 3–5/10 或 Borg RPE 9–14）", t:"由短時間漸進增加", ty:"步行（inclined treadmill 或腰椎彎曲姿位踩車對某些人較有幫助）；水中運動；瑜伽；太極"},
    resistance:{f:"2–3 天/週", i:"漸進式負荷；以疼痛可耐受為上限", t:"2–4 組", ty:"後側鏈訓練（deadlift）、軀幹/核心強化（Pilates）、重量訓練；避免單一腹肌訓練"},
    flex:{f:"大多數天", i:"舒適牽拉感", t:"每個動作 30 秒", ty:"髖關節和下肢柔軟度（靜態伸展）；動作協調性障礙者優先強化/動作控制而非柔軟度"},
    clinical:[
      {h:"分類與臨床背景", items:[
        "LBP 分類：(a) 與特定脊椎病因相關（癌症、骨折、感染）；(b) 神經根病變/脊椎狹窄；(c) 非特異性 LBP（>85%）",
        "急性（<6 週）→ 亞急性（6–12 週）→ 慢性（>12 週）；~20% 演變為慢性，~10% 進展至失能",
        "急性 LBP：3 週內早期物理治療可大幅減少影像學需求、類鴉片使用、注射和手術，並降低失能",
        "下背痛若為嚴重病理症狀（如癌症）則須與醫療團隊合作處方；其他非特異性 LBP 可依一般人建議"
      ]},
      {h:"心理社會因素（Box 6.2）", items:[
        "負面態度（認為背痛嚴重且無法改善）、fear-avoidance 行為和活動量下降",
        "期待被動而非主動治療、憂鬱傾向、社交退縮",
        "社會或財務問題",
        "這些因素與長期失能高度相關，需搭配疼痛教育干預"
      ]}
    ],
    special:[
      {h:"運動處方原則", items:[
        "鼓勵保持活動、避免臥床休息；急性發作後 2 週內可謹慎導入活動",
        "運動效果：漸進式有氧和漸進式阻力訓練對慢性 LBP 疼痛強度的改善效果相當",
        "慢性 LBP 最佳方案：個別化 + 監督 + 伸展 + 心身（太極）+ 肌力訓練，結合個案偏好和臨床經驗",
        "使用 graded exercise exposure：依個人反應漸進增加難度、強度、訓練量",
        "疼痛監測模型：3–5/10（NRS）或 Borg RPE 9–14 的安全區間配合正向回饋",
        "症狀 peripheralization（疼痛向下肢擴散）→ 立即停止造成擴散的動作",
        "促進 centralization 動作（如俯臥 press-up、仰臥膝胸式）有助於急性 LBP 合併下肢放射痛"
      ]},
      {h:"特殊情境", items:[
        "下坡步行可能加重老年人 LBP；傾斜跑步機或腰椎彎曲踩車較佳",
        "若 LBP 伴隨動作協調障礙 → 強調軀幹協調/肌耐力/肌力，而非柔軟度訓練",
        "Yoga、Pilates、水中治療、後側鏈肌力訓練（deadlift）均有效；無確定哪種最優，依個案偏好選擇",
        "傳統 deadlift 適用於疼痛較低、基礎脊椎旁肌力較高者；可改善疼痛和功能",
        "LBP 的診斷和治療超出一般運動專業人員執業範圍，應轉介執照醫療人員"
      ]}
    ]
  },
{
    id:"transgender", cat:"一般族群 General", name:"跨性別", en:"Transgender Individuals", page:451, pageStr:"451-452", status:"none", detailed:true,
    aerobic:{f:"依年齡組一般建議（成人/老年人/青少年 各見對應章節）", i:"依年齡組一般建議", t:"依年齡組一般建議", ty:"依個案目標與喜好"},
    resistance:{f:"依年齡組一般建議", i:"依年齡組一般建議", t:"依年齡組一般建議", ty:"依個案目標與喜好"},
    flex:{f:"依年齡組一般建議", i:"依年齡組一般建議", t:"依年齡組一般建議", ty:"依年齡組一般建議"},
    clinical:[
      {h:"基本處方原則", items:[
        "目前跨性別族群的運動科學研究有限，缺乏性別肯定藥物或手術對運動和競技表現影響的確切數據",
        "運動處方：依年齡組一般建議（成人見 Chapter 5、老年人/兒童青少年見 Chapter 6）",
        "採多面向、個別化方式；了解個案性別焦慮來源、PA 障礙、醫療和心理健康共病",
        "了解個案的運動目標（如改善體能、或達成特定體型）有助於制定個別化計畫",
        "已知有性別差異影響競技表現（見 Chapter 5），可能影響訓練規劃"
      ]}
    ],
    special:[
      {h:"環境與專業態度（Special Considerations）", items:[
        "使用個案的認同名字和代名詞（ask about name and pronouns）",
        "場館展示跨性別/LGBTQ+ 友善標誌",
        "提供性別中立或單間廁所/更衣室；避免強制性別分區",
        "了解可能使用的性別肯定服飾：chest binder（壓胸器）可限制有氧活動時的呼吸；genital packer（填充物）",
        "注意泳衣、緊身運動服等可能不符合個案需求，了解是否有替代選項",
        "部分跨性別青少年可能使用青春期阻斷劑（puberty blockers），影響第二性徵發育並可能影響運動表現",
        "部分跨性別者使用荷爾蒙（如睾酮/雌激素），可能影響運動表現；手術後某些人更願意運動",
        "職業/競技運動：各組織對跨性別女性參賽規定不同（主要涉及睾酮抑制的持續時間和程度）"
      ]}
    ]
  },
{
    id:"coronary", cat:"心臟血管 CV", name:"冠狀動脈疾病", en:"Coronary Artery Disease", page:522, pageStr:"521-538", status:"full", detailed:true,
    aerobic:{f:"≥3–5 天/週", i:"初期 40–60% HRR，漸進至 60–80% HRR；有缺血閾值時：低於缺血閾值心率 10 bpm；無運動測試時：Talk Test + RPE + 臨床判斷", t:"≥20–60 分鐘/次", ty:"步行（能力許可可跑步）、腿部測功儀、上下肢雙動測功儀、臥式/直立式腳踏車、臥式踏步機、划船機、橢圓機、爬梯機、跑步機"},
    resistance:{f:"2–3 天/週，非連續日", i:"60–70% 1-RM，10–15 下", t:"1–2 組", ty:"多關節與單關節動作，涵蓋主要肌群，多種器材模式"},
    flex:{f:"≥2–3 天/週，每天最佳", i:"伸展至緊繃或輕微不適", t:"靜態維持 10–30 秒，每動作重複 2–4 次", ty:"各主要肌腱肌肉單元伸展"},
    clinical:[
      {h:"流行病學", items:["美國成人 CHD 盛行率 7.1%（男性 8.7%、女性 5.8%）","缺血性心臟病是除撒哈拉以南非洲（腦中風居首）和南亞（男女均為腦中風）以外，全球各地區的主要死因"]},
      {h:"運動訓練效益", items:["2023 年 meta-analysis（85 個試驗、23,430 名 CHD 患者）：有氧訓練可降低 CV 死亡率 26%、全因住院率 23%、MI 風險 18%","改善運動能力、生活品質、減少心絞痛，促進重返工作","AHA/ACC 第一類（最高等級）推薦：有氧 + 阻力訓練"]},
      {h:"運動測試注意事項", items:["無症狀的先前冠狀動脈血管再通術或 MI 患者：ACC/AHA 將僅有 ECG 的壓力測試列為「可能適當」至「很少適當」","例外：即將開始無監督運動計畫、或參與心臟復健（CR）的患者 — 均列為「適當」","建議在優化藥物後，以症狀限制性最大運動測試確立目標心率（THR）"]}
    ],
    special:[
      {h:"目標心率（THR）設定原則", items:["THR 必須來自症狀限制性最大運動測試峰值 HR，禁用 220-age 公式","使用 β-block er 後心率反應衰減；若劑量在測試後改變，建議重測或以相同工作負荷量測新 HR，取 ±5 bpm 範圍","無法做測試時：改用 Talk Test + RPE + 臨床判斷（初始 20–30 bpm 高於靜息 HR 僅為次佳選項）"]},
      {h:"缺血與心絞痛管理", items:["不得在出現缺血徵兆/症狀（心絞痛、ST 壓低、頭暈）的強度下訓練","有缺血閾值時：訓練 THR 上限設於缺血閾值 HR 下 10 bpm","較長暖身期有助於減少運動誘發心絞痛；反覆出現心絞痛者可考慮運動前預防性使用硝化甘油"]},
      {h:"阻力訓練時機與禁忌", items:["建議先完成 ≥2–4 週規律有氧訓練後再加入阻力訓練",{t:"阻力訓練絕對禁忌症（AHA Box 8.1）",sub:["不穩定型 CHD","失代償性心臟衰竭","未控制高血壓（>180/110 mmHg）","嚴重肺動脈高壓（平均肺動脈壓 >55 mmHg）","嚴重且有症狀的主動脈狹窄","急性心肌炎/心內膜炎/心包炎","主動脈剝離","Marfan 症候群","高強度 RT（80–100% 1-RM）於活動性增殖性視網膜病變或中重度非增殖性糖尿病視網膜病變患者"]}]},
      {h:"HIIT 應用", items:["4×4 法（4 分鐘高強度 × 4 次，間以 3 分鐘積極恢復）為研究最多的方案","目前無普遍接受的 HIIT 準則；應以症狀限制性最大運動測試所得數據建立強度"]},
      {h:"心臟復健（CR）參與", items:["有強力證據支持：CR 可降低繼發性心臟事件（MI、CABG 後、心衰竭、心臟移植、瓣膜手術、PAD 後）","目前美國 Medicare 符合資格患者中，僅不到 29% 完成 ≥1 次早期門診 CR","可採傳統中心式或混合式（中心 + 家庭遠距）模式，效果相近",{t:"CR 禁忌症（Box 8.3）",sub:["不穩定型心絞痛","未控制高血壓（SBP >180 或 DBP >110）","體位性 SBP 下降 >20 mmHg 伴症狀","嚴重主動脈狹窄（瓣膜面積 <1.0 cm²）","未控制的心房或心室心律不整","未控制的竇性心動過速（>120 bpm）","失代償性心臟衰竭","第三度 AV block（無 pacemaker）","急性心包炎或心肌炎"]}]}
    ]
  },
{
    id:"heart_failure", cat:"心臟血管 CV", name:"心臟衰竭", en:"Heart Failure (HF)", page:527, pageStr:"527-544", status:"full", detailed:true,
    aerobic:{
      f:"3–5 天/週",
      i:"初期 40–50% HRR，漸進至 60–80% HRR；有缺血閾值時：低於缺血閾值心率 10 bpm；無運動測試時：Talk Test + RPE + 臨床判斷",
      t:"20–60 分鐘/次",
      ty:"步行（能力許可可跑步）、腿部測功儀、上下肢雙動測功儀、臥式/直立式腳踏車、臥式踏步機、划船機、橢圓機、爬梯機、跑步機"
    },
    resistance:{
      f:"≥2 天/週，非連續日",
      i:"60–80% 1-RM，10–15 下",
      t:"≥1 組",
      ty:"多關節與單關節動作，涵蓋主要肌群，多種器材模式"
    },
    flex:{
      f:"≥2–3 天/週，每天最佳",
      i:"伸展至緊繃或輕微不適",
      t:"靜態維持 10–30 秒，每動作重複 2+ 次",
      ty:"各主要肌腱肌肉單元伸展"
    },
    clinical:[
      {h:"疾病分型", items:[
        "HFrEF（射血分數降低型）：收縮功能障礙，占住院患者 53%",
        "HFpEF（射血分數保留型）：舒張功能障礙，占 47%；保險多不涵蓋 CR",
        "兩者均可從運動訓練受益"
      ]},
      {h:"流行病學與預後", items:[
        "美國約 650 萬成人患有 HF，預計 2030 年前增加 46%",
        "住院後 1 年死亡率接近 30%"
      ]},
      {h:"運動訓練效益", items:[
        "改善 V̇O₂peak 10–17%（57 項研究 meta-analysis）",
        "改善中央血流動力學、自主神經功能、周邊血管與骨骼肌功能",
        "降低住院率、改善健康相關生活品質",
        "ACC/AHA 第一類（最高等級）推薦"
      ]},
      {h:"運動測試注意事項", items:[
        "症狀限制性最大運動測試在 HFrEF 安全可行",
        "建議心肺運動測試（CPET）：可提供 ECG、血流動力學與預後資訊",
        "特性：峰值 HR、心搏量、心輸出量均低於健康同齡者",
        "移植候選人：peak V̇O₂ 常 < 12 mL·kg⁻¹·min⁻¹",
        "建議使用緩進協定：modified Naughton 跑步機協定，或每分鐘增加 10 W 的 ramp 測功儀協定"
      ]}
    ],
    special:[
      {h:"心率目標設定原則", items:[
        "目標心率範圍必須來自症狀限制性最大運動測試所測得的峰值 HR",
        "不可使用年齡預測公式估算峰值 HR（HF 患者無支持依據）",
        "無法做測試時，改用 Talk Test + RPE + 臨床判斷組合決定強度"
      ]},
      {h:"HIIT 應用", items:[
        "完成症狀限制性最大運動測試後可考慮 HIIT",
        "HIIT 帶來的 V̇O₂peak 改善與中強度持續訓練相近或更大（穩定 HFrEF）"
      ]},
      {h:"訓練順序與進展原則", items:[
        "先建立 ≥4 週有氧耐受性，再加入阻力訓練",
        "增加順序：先時間與頻率，再強度",
        "運動量與全因死亡率/住院率呈反向關係（上限約 7 MET-h/wk）"
      ]},
      {h:"左心室輔助裝置（LVAD）患者", items:[
        "血壓需用都普勒（Doppler）量測；測量結果為平均動脈壓（MAP）",
        "靜息 MAP 應控制於 70–80 mmHg；運動中 MAP 應隨工作負荷增加",
        "建議以 RPE/Talk Test 指導強度（HR 反應雖線性但尚無充分定論）",
        "早發性疲勞常見；改用間歇運動可減輕後續疲勞"
      ]},
      {h:"心臟復健（CR）參考", items:[
        "CR 適應症：穩定 HF（收縮或舒張功能障礙）",
        {t:"CR 禁忌症（絕對）", sub:["未代償 HF","不穩定心絞痛","未控制 HTN（SBP >180 或 DBP >110）","未控制心律不整","第三度 AV block（無 pacemaker）","急性心包炎/心肌炎"]},
        {t:"運動中止指標", sub:["DBP ≥110 mmHg","SBP 隨負荷增加反而下降 >10 mmHg","嚴重心律不整","心絞痛/明顯呼吸困難/ECG 缺血變化"]},
        "長期依從率約 40%（與一般 CHD 患者相近）"
      ]}
    ],
  acsm11:{
    pageStr:"464-466",
    blocks:[
      {h:"11版阻力訓練起始強度（PDF p465）",body:"11版依上下肢分別規定起始強度：上肢從 40% 1-RM、下肢從 50% 1-RM 開始，再逐步��加至 70% 1-RM（歷時數週到數月）。12版改為統一 60–80% 1-RM，不分上下肢。",table:{head:["部位","11版起始","11版終點","12版"],rows:[["上肢","40% 1-RM","70% 1-RM","60–80% 1-RM"],["下肢","50% 1-RM","70% 1-RM","60–80% 1-RM"]]}},
      {h:"11版無運動測試有氧強度（PDF p466）",body:"無 GXT 時，11版明確指定：靜息 HR +20–30 beats·min⁻¹ + RPE 11–14（6–20 量表）。12版改為 Talk Test + RPE + 臨床判斷，取消 HRrest 公式。",list:["11版：HRrest +20–30 bpm + RPE 11–14（6–20 量表）","12版：Talk Test + RPE + clinical judgement"]},
      {h:"11版阻力訓練加入時機（PDF p465-466）",body:"11版明確指出：個案完成至少 4 週規律有氧訓練後，方可加入阻力訓練。12版未明確列出此等待期。"},
      {h:"11版 HIIT 強度協定（PDF p466）",body:"11版明確列出 HF 可用 HIIT ���定：工作區間 30 秒至 4 分鐘、強度至 HRR 85–90%，交替 1–3 分鐘恢復期（HRR 50–70%）。12版未在 FITT 表中列出具體 HIIT 數值。",list:["工作：30 s–4 min���強度 85–90% HRR","恢復：1–3 min，強度 50–70% HRR","已完成最大運動測試者方可考慮 HIIT"]}
    ]
  }
  },
{
    id:"scad", cat:"心臟血管 CV", name:"自發性冠狀動脈剝離", en:"Spontaneous Coronary Artery Dissection (SCAD)", page:540, pageStr:"539-541", status:"none", detailed:true,
    aerobic:{f:"依一般 CVD 康復建議；不強制限制 HR/BP 上限（缺乏臨床證據）", i:"中等強度；不達完全耗竭；目標 RPE 12–14（Borg 6–20）", t:"依一般 CVD 建議漸進增加", ty:"有氧運動（心臟康復基礎）"},
    resistance:{f:"依一般 CVD 建議", i:"輕至中重量 + 高反覆次數；避免 Valsalva 動作", t:"依個人耐受度", ty:"機器和自由重量均可；注意 BP 變化"},
    flex:{f:"依個人需要", i:"舒適範圍", t:"30 s 靜態伸展", ty:"靜態伸展"},
    clinical:[
      {h:"SCAD 背景與臨床特徵", items:[
        "SCAD：冠狀動脈壁內自發性剝離或血腫形成 → 限制心臟血流 → 急性冠狀動脈症候群（包括 MI 和心臟驟停）",
        "典型患者：年輕女性（平均年齡 40–50 歲首次 MI），動脈粥樣硬化風險因素較低",
        "Fibromuscular dysplasia（FMD）：SCAD 患者中有 25–86% 合併診斷；需避免頸部過度伸展",
        "SCAD 也可發生於妊娠期（peripartum），或結締組織疾病患者（Marfan、Ehlers-Danlos）",
        "常見合併症：高血脂（30%）、高血壓（30%）、肥胖（20%）",
        "治療：beta-blockers 和降壓藥（可能降低復發風險）；保守策略（讓冠狀動脈自然癒合）優於支架",
        "中等強度心臟康復（CR）對 SCAD 患者安全有益"
      ]}
    ],
    special:[
      {h:"運動安全要點", items:[
        "RPE 12–14（Borg 6–20）中強度；不應運動到完全耗竭",
        "阻力訓練：鼓勵輕重量/高次數；嚴格避免 Valsalva 動作（防止胸內壓劇烈變化）",
        "避免頸部過度伸展或極端頸部姿位（FMD 患者有自發性頸動脈/椎動脈剝離風險）",
        "避免整脊治療（chiropractic spinal manipulation）和其他涉及頭頸部快速運動的活動",
        "不建議任意設置 HR/BP 運動上限，可能對患者產生不良影響",
        "焦慮、憂鬱、心理困擾在 SCAD 後很常見 → 心理社會支持是 CR 計畫的重要組成",
        "部分患者為在職父母或有年幼子女，托兒和工作排程需納入 CR 計畫考量"
      ]}
    ]
  },
{
    id:"heart_transplant", cat:"心臟血管 CV", name:"心臟移植", en:"Cardiac Transplant", page:546, pageStr:"546-550", status:"full", detailed:true,
    aerobic:{f:"最少 3 天/週，最佳可達 5 天/週", i:"有運動測試時：以目標工作負荷（50–80% V̇O₂R）指導強度；無運動測試時：Talk Test + RPE + 臨床判斷（HR 不適用）", t:"20–60 分鐘/天", ty:"有氧運動，以跑步機步行、自由步行、固定式腳踏車為主"},
    resistance:{f:"2–3 天/週，非連續日", i:"60–70% 1-RM，10–15 下", t:"1–2 組", ty:"多關節與單關節動作，涵蓋所有主要肌群，多種器材模式"},
    flex:{f:"≥2–3 天/週，每天最佳", i:"伸展至緊繃或輕微不適", t:"靜態維持 10–30 秒，每動作重複 2–4 次", ty:"各主要肌腱肌肉單元伸展"},
    clinical:[
      {h:"流行病學與存活率", items:["2016 年美國心臟移植 3,209 例；目前約 30,622 人帶移植心臟存活","2009–2011 年美國 3 年術後存活率 83.5%","終末期 HF 且標準藥物治療無效者之最終治療選項"]},
      {h:"運動訓練效益", items:["國際心肺移植學會（ISHLT）：有強力證據支持術後有氧 + 阻力訓練","RCT 顯示有氧訓練可改善運動能力 8–48%（chronotropic 反應、骨骼肌氧化能力、心臟功能、自主神經調節均改善）","阻力訓練是重要輔助：改善骨礦物質密度、逆轉肌少症、控制肥胖/高血壓/葡萄糖耐受不良"]},
      {h:"運動測試注意事項", items:["心臟雖術後 ≥1 年可有部分再神經支配，但交感傳出仍缺乏，峰值心輸出量仍低於正常 20–35%","骨骼肌與周邊血管異常（如內皮功能障礙）術後不會自動正常化","建議採用更漸進的測試協定（比 HF 患者更緩慢），和 HF 測試終點相同，但不以心絞痛作為停止指標（去神經心臟不會感受到心絞痛）"]}
    ],
    special:[
      {h:"去神經心臟的 HR 特性（最重要）", items:["靜息心率偏高；運動時 HR 反應延遲（依賴循環中兒茶酚胺，非神經直接調控）","HR 上升落後於工作負荷增加；最高心率可能出現在運動測試或訓練結束後","恢復期 HR 緩慢下降","強度監控：不可用 HR 目標，改用 RPE + Talk Test；有運動測試時使用目標工作負荷"]},
      {h:"暖身與緩和", items:["建議延長暖身與緩和時間（因心率響應延遲）"]},
      {h:"免疫抑制劑副作用", items:["免疫抑制藥物可導致骨質流失、糖尿病、高血壓","規律有氧與阻力訓練有助於管理這些代謝併發症","移植術後常見併發症：心臟移植血管病變（cardiac allograft vasculopathy）、移植失敗、癌症、高血脂、高血壓、糖尿病 — 均應持續監控"]},
      {h:"胸骨切開術後限制（Sternotomy）", items:["心臟移植需正中胸骨切開術：術後 12 週內應限制上肢活動範圍與工作負荷","術後 12 週內可執行不對胸骨造成壓力的節律性上肢活動（如手臂測功儀、雙動測功儀）","上肢阻力訓練建議延後至術後 12 週；進展時機依個人年齡、術前活動程度、合併症個別化"]},
      {h:"HIIT 應用", items:["心臟移植患者已有正向結果的 HIIT 應用案例","工作/休息間隔參照 HF 建議，但 HR 不作為強度指引"]}
    ],
  acsm11:{
    pageStr:"473",
    blocks:[
      {h:"11版阻力訓練起始強度（PDF p473）",body:"11版依上下肢分別規定：上肢 40% 1-RM、下肢 50% 1-RM 起始，��步增至 70% 1-RM；1–2 組 × 10–15 下。12版改為 60–70% 1-RM，不分上下肢。",list:["11版上肢：40% 1-RM → 70% 1-RM","11版下肢：50% 1-RM → 70% 1-RM","12版：60–70% 1-RM（統一）"]}
    ]
  }
  },
{
    id:"sternotomy", cat:"心臟血管 CV", name:"胸骨切開術", en:"Sternotomy", page:551, pageStr:"551-552", status:"none", detailed:true,
    aerobic:{f:"術後即可開始輕度活動；依原發心臟手術指引", i:"依原發心臟手術強度建議", t:"依原發心臟手術建議漸進", ty:"下肢有氧（無上肢負重）；手臂測功儀（不施力於胸骨）"},
    resistance:{f:"上肢阻力訓練：術後 12 週內暫緩", i:"上肢：12 週後再依個別化評估開始", t:"依個人康復進度", ty:"下肢和核心為主（12 週內）；12 週後可漸進加入上肢"},
    flex:{f:"術後即可活動上肢", i:"保持手臂靠近身體（減少胸骨張力）", t:"節律性上肢活動（不施力）可於術後早期執行", ty:"節律性上肢活動（手臂測功儀、雙臂測功儀）"},
    clinical:[
      {h:"臨床背景與術後原則", items:[
        "正中胸骨切開術（median sternotomy）：CABG、心臟瓣膜置換、LVAD、心臟移植的標準手術切口",
        "多數患者約 8–10 週後達到足夠胸骨穩定度；胸骨不穩定在 16% 案例中發生",
        "糖尿病、高齡、特定藥物、肥胖等因素可使胸骨不穩定風險增高"
      ]}
    ],
    special:[
      {h:"胸骨保護運動原則", items:[
        "術後立即可移動手臂，但應保持手臂靠近身體（減少胸骨壓力）—「Keep Your Move in the Tube」原則",
        "節律性上肢活動（手臂測功儀、雙臂測功儀）不施力於胸骨，可在術後 12 週內執行",
        "傳統建議：術後 8–12 週不提舉超過 5–10 lb（約 2.3–4.5 kg）；但因外科醫師而異",
        "上肢阻力訓練建議在術後 12 週後再開始；恢復時間需依年齡、術前活動程度、合併症和手術併發症個別化",
        "開裂（dehiscence）風險最高因素：過度咳嗽、骨質疏鬆、感染（不是輕度手臂活動）",
        "應用「Keep Your Move in the Tube」策略可讓阻力訓練較早開始"
      ]}
    ]
  },
{
    id:"pacemaker_icd", cat:"心臟血管 CV", name:"心律器/去顫器", en:"Pacemaker / ICD", page:555, pageStr:"553-555", status:"none", detailed:true,
    aerobic:{f:"依原發心臟疾病建議；有速率反應型心律器者，運動前先做運動測試優化 HR 反應", i:"ICD：運動 HR 峰值需低於設定除顫閾值 10–15 bpm；心律器：依程式設定上限", t:"依原發疾病建議", ty:"依個人功能；植入後 3–4 週避免激烈上肢動作（游泳、槓鈴、橢圓機、高爾夫）"},
    resistance:{f:"依原發疾病建議；植入後至少 3–4 週下肢優先", i:"ICD：避免超過除顫閾值 -15 bpm 的 HR", t:"依個人耐受度", ty:"植入後 24 小時可開始輕度上肢 ROM；激烈上肢 3–4 週後"},
    flex:{f:"依需要", i:"舒適範圍", t:"依需要", ty:"靜態伸展為主"},
    clinical:[
      {h:"心律器（Pacemaker）類型", items:[
        "速率反應型（rate-responsive）：依 PA 程度自動調整 HR（從靜止坐至步行）",
        "單腔（single-chamber）：一條導線（右心房或右心室）；或無導線型（右心室）",
        "雙腔（dual-chamber）：兩條導線（右心房 + 右心室）；恢復正常收縮時序",
        "雙心室（biventricular CRT）：三條導線；用於 HFrEF 心臟再同步化治療",
        "速率反應型心律器患者有計劃增加 PA 或競技運動 → 強烈建議運動測試評估 HR 反應並優化程式"
      ]},
      {h:"ICD（植入式心律轉復除顫器）", items:[
        "ICD 監測心律，在偵測到致命性心律（VF/VT）時先嘗試 antitachycardia pacing，無效則電擊",
        "適應症：心臟驟停病史、心肌病、抗心律失常藥無效",
        "有 ICD 的患者可安全運動"
      ]}
    ],
    special:[
      {h:"運動前評估與安全限制", items:[
        "運動測試或訓練前：需取得心律器程式模式、HR 上下限和 ICD 除顫偵測閾值",
        "建議在開始運動訓練前先進行運動測試以評估 HR 和心律反應",
        "ICD：訓練期間和測試的 HR 峰值需維持在設定除顫閾值以下至少 10–15 bpm",
        "植入後 24 小時可開始輕度上肢 ROM（防止後續關節併發症）",
        "激烈上肢活動（游泳、保齡球、舉重、橢圓機、高爾夫）：至少植入後 3–4 週避免；下肢活動可繼續",
        "在美國，單純心律器和 ICD 植入並非心臟康復保險給付適應症；但監督式運動對這群人仍重要"
      ]}
    ]
  },
{
    id:"pad", cat:"心臟血管 CV", name:"周邊動脈疾病", en:"Peripheral Artery Disease", page:560, pageStr:"556-562", status:"full", detailed:true,
    aerobic:{f:"最少 3 天/週，最佳可達 5 天/週", i:"達中度至中重度跛行疼痛（4 分量表中 3–4 分），疼痛完全消退後再繼續；工作負荷設計應讓輕度疼痛在 5 分鐘內出現、中重度跛行在 10 分鐘內出現", t:"30–45 分鐘/天（不含休息時間），最少 12 週；可漸進至 60 分鐘/天", ty:"負重步行優先（自由步行或跑步機步行最佳）；非負重運動（腳踏車等）可作補充或替代"},
    resistance:{f:"2–3 天/週，非連續日", i:"60–70% 1-RM，10–15 下", t:"1–2 組", ty:"多關節與單關節動作，涵蓋主要肌群，多種器材模式"},
    flex:{f:"≥2–3 天/週，每天最佳", i:"伸展至緊繃或輕微不適", t:"靜態維持 10–30 秒，每動作重複 2–4 次", ty:"各主要肌腱肌肉單元伸展"},
    clinical:[
      {h:"流行病學與預後", items:["40 歲以上美國人約 850 萬、全球約 1.1 億人患有下肢 PAD（>70 歲者佔 14%、>80 歲者佔 22%）","PAD 是晚期心血管疾病的表現，10 年死亡率 22–70%（依年齡與風險因子嚴重度）","中風、MI 和死亡風險等同甚至高於 CHD 患者","主要危險因子：高血壓、吸菸、糖尿病、慢性腎病"]},
      {h:"間歇性跛行", items:["PAD 症狀患者最主要的活動限制：下肢缺血性疼痛（小腿最常見，也可在臀部或大腿）","典型表現：運動時出現抽筋/緊繃感，休息後消退（predictable wax-and-wane）","嚴重度可用 Fontaine 分類或 Rutherford 分類（ABI 值：>0.90 正常；≤0.90 確診 PAD）"]},
      {h:"運動測試注意事項", items:["跛行患者運動能力受限於疼痛；6 分鐘步行測試可用於無法跑步機測試者","跑步機測試前應測量雙側踝/臂壓力比（ABI），術後再測 ABI 以確認介入效果","以緩慢速度開始、漸進增加坡度；記錄跛行開始時間與最大跛行時間"]}
    ],
    special:[
      {h:"監督下步行運動（SET-PAD）", items:["AHA/ACC 強力建議：監督下步行運動優先於血管再通術（revascularization），除非生活嚴重受限且指引治療無效","Medicare 與多數美國第三方保險對有症狀 PAD 患者的監督式步行療法提供給付（SET-PAD）","改善最顯著在前 2–3 個月，但持續 6 個月以上效果持續累積","Meta-analysis：跛行開始距離平均改善 179%，最大跛行距離平均改善 122%"]},
      {h:"疼痛目標是治療關鍵", items:["目標不是避免疼痛，而是步行至中度跛行疼痛（3–4/4）後休息，疼痛完全消退再繼續","低強度（低於跛行閾值）+ 長時間步行的效果可能與高強度短時間步行相近，但指引仍建議以中重度疼痛為目標"]},
      {h:"起始與進展策略", items:["部分患者一開始只能累積 15 分鐘/天，每兩週增加 5 分鐘","工作/休息比例應個別化調整（最佳比例尚未確定）","阻力訓練未被一致證明可改善無痛步行能力（不作為主要訓練）","腳踏車等非負重運動可作暖身，但不應是主要活動"]},
      {h:"環境注意事項", items:["寒冷環境會加重間歇性跛行症狀，需延長暖身時間"]}
    ],
  acsm11:{
    pageStr:"477-479",
    blocks:[
      {h:"11版有氧強度 VO₂R 規定（PDF p478）",body:"11版明確以 40–59% VO₂R 為中強度目標，並以「最大步行速度 50–80%」作為替代指標。12版��以跛行疼痛量表（3–4/4 分）為強度終點，不再列出 VO₂R 百分比。",list:["11版：40–59% VO₂R（中強度），或最大步行速度 50–80%","12版：達跛行疼痛 3–4/4 分（不指定 VO₂R %��"]},
      {h:"11版阻力訓練細節（PDF p478）",body:"11版規定 2–3 組 × 8–12 ��、6–8 個動作（強調下肢）；12版改為 1–2 組 × 10–15 下。��力強度本身相同（60–80% 1-RM）。",table:{head:["項目","11版","12版"],rows:[["組數","2–3 組","1–2 組"],["次數","8–12 下","10–15 下"],["動作數","6–8 個（含下肢重點）","—（僅說多肌群）"],["強度","60–80% 1-RM","60–70% 1-RM"]]}}
    ]
  }
  },
{
    id:"pots", cat:"心臟血管 CV", name:"姿勢性心搏過速症候群", en:"POTS", page:565, pageStr:"564-568", status:"approx", detailed:true,
    aerobic:{f:"3 個月漸進計畫（Table 8.4）；Month 1: 12 次×30 min（base pace）；Month 3: 4×45–60 min；完成後維持 4–5 天/週", i:"Base pace：RPE 13–15 或 60% HRR；Max steady state：RPE 16–18 或 75% HRR；Recovery：RPE 9–12 或 <60% HRR；使用 HR 監測（胸帶或手腕式）", t:"從 20–30 min 漸進至 45–60 min", ty:"Month 1：臥式腳踏車（recumbent bike）或划船測功儀（優先）；Month 2 加入直立腳踏車；Month 3 加入橢圓機和跑步機步行；避免直立有氧直到適應"},
    resistance:{f:"每週 8 次×30 min（貫穿 3 個月）", i:"RPE 13–15", t:"30 min/次", ty:"核心 + 下肢訓練為主（Pilates 或瑜伽，非熱瑜伽）"},
    flex:{f:"依個人需要", i:"舒適範圍", t:"30 s 靜態", ty:"靜態和輕度動態伸展"},
    clinical:[
      {h:"POTS 定義與機制", items:[
        "POTS：由臥位到站立 10 分鐘內 HR 上升 ≥30 bpm，但無姿勢性低血壓",
        "好發族群：育齡前女性（15–50 歲）",
        "常合併：偏頭痛、ME/CFS、關節過度鬆弛、胃腸道和自體免疫疾病",
        "病理機制：代償性心搏過速，因心臟和血容量降低、stroke volume 減少、VO₂peak 降低",
        "治療：以非藥物介入為主，短期漸進性運動訓練效果佳（症狀改善甚至緩解）"
      ]},
      {h:"鑑別診斷（排除類 POTS 狀況）", items:[
        {t:"缺鐵（Iron deficiency, ID）：ferritin <50 ng/dL 或 %SAT <20%；如伴貧血則 Hgb <12 g/dL, MCV <80 fL", sub:["造成姿勢性耐受不良、運動中 HR 增加、疲勞、認知功能下降"]},
        "藥物：SNRI（↑去甲腎上腺素效應）、NDRI（↑sympathomimetic）、屈螺旋酮（利尿效應）、刺激劑",
        "攝入物質：咖啡因、古柯鹼、運動補充劑、能量飲料",
        "甲狀腺功能亢進：心悸、HR 增加、運動不耐受",
        "不適當竇性心搏過速：與姿勢無關的心搏過速（>100 bpm）"
      ]}
    ],
    special:[
      {h:"運動處方細節（Table 8.4 3 個月計畫）", items:[
        "Month 1：臥式腳踏車/划船；base pace 12 次×30 min + max steady state 1×20 min + 1×25 min + recovery 2×40 min；阻力 8×30 min",
        "Month 2：加入直立腳踏車；base pace 6×30 min + max 1×25+1×30+1×35 min + recovery 1×40+1×30 min；阻力 8×30 min",
        "Month 3：加入橢圓機和跑步機步行；base pace 3×30–45 min + max 1×30+1×35+1×40 min + recovery 3×25 min；阻力 8×30 min",
        "每次有氧訓練前後需進行輕度暖身和緩和；有氧訓練不可連續天執行",
        "HR monitoring：胸帶或腕帶 HR 監測器強烈推薦；使用 HR 限藥者改用 RPE"
      ]},
      {h:"生活型態輔助措施", items:[
        "每日鈉攝取增加至 7,000–10,000 mg（不建議鹽錠），搭配 2–3 L 非咖啡因飲料（plasma volume expansion）",
        "整天保持直立姿勢；若需休息則使用半臥位（semi-recumbent position）",
        "床頭抬高 4–6 英吋（reverse Trendelenburg position）",
        "完成 3 個月計畫後維持 4–5 天/週規律運動以鞏固 CRF 和自律神經功能"
      ]}
    ]
  },
{
    id:"pediatric_cardiac", cat:"心臟血管 CV", name:"兒童心臟復健", en:"Pediatric Cardiac Rehabilitation", page:571, pageStr:"569-572", status:"full", detailed:true,
    aerobic:{f:"最少 2–3 天/週", i:"55–80% 測量 HRpeak；或 RPE 11–13（多數患者），RPE 15–16（低風險患者）", t:"30 分鐘/次，漸進至 60 分鐘/次", ty:"適齡發展活動：步行、跑步、騎車、游泳、主動遊戲；年幼孩童強調移動能力、平衡、協調；血動力穩定者可用 HIIT（主動休息比 1:2）"},
    resistance:{f:"最少 2–3 天/週（非連續日）", i:"40–70% 1-RM，每動作 10–15 下；避免 Valsalva", t:"2–3 組，5–7 個動作/次；組間休息 >60 秒；先做複合動作，強調下半身", ty:"適齡適體型的設備或徒手動作；節奏：2 秒離心/0 秒等長/2 秒向心；避免過度握力和高靜態成分動作"},
    flex:{f:"最多每天（依耐受度）", i:"伸展至緊繃或輕微不適", t:"靜態 20–30 秒", ty:"主要肢體關節和下背部靜態/動態伸展；強調上身；避免伸展時憋氣；有胸骨切開手術（術後許可後）或心外膜起搏器者需修改"},
    clinical:[
      {h:"兒童心臟復健概述", items:["許多先天性心臟病在子宮內確診，早期需長期住院和手術 → 慢性身體功能損傷、心肺適能低下、虛弱","兒童心臟復健（CR）= 跨學科協作提升身體功能、促進活躍生活方式、降低失能（物理治療、職能治療、言語治療、心理、飲食、運動訓練）","住院 CR：心臟手術後或長期住院期間（臨床運動生理師主導）；研究顯示對等待移植或安裝心室輔助裝置患者安全可行","門診 CR：術後數週至數年不等，依功能障礙何時被發現"]},
      {h:"兒童 CR 的獨特修改需求", items:["嚴重去調節的複雜先天性心臟病兒童：先進行動作能力和運動技能訓練，再開始有氧和阻力計畫","神經發育遲緩和注意力降低：調整訓練量和強度；年幼兒童可用遊戲化","特定動作需根據風險修改：最常見顧慮是高強度訓練誘發心律不整，以及高強度等長運動的血動力負荷","部分先天性心臟病的心臟輸出改善有限 → 專注周邊/骨骼肌適應可能是特定目標","下肢阻力訓練改善心室充盈/每搏量（Fontan 術後青少年有佐證）"]}
    ],
    special:[
      {h:"重要安全原則", items:["ExRx 只能由具兒童/先天性心臟病和運動醫學知識的運動生理師或醫療人員提供；必要時諮詢兒童心臟科運動醫學專家","HIIT：僅限血動力穩定的患者","胸骨切開術後：按 sternotomy 禁忌執行；有心外膜起搏器者需特別修改伸展和動作","電子健康技術（eHealth）居家 CR：依從性提升、減少缺課，是日益增長的選項"]}
    ]
  },
{
    id:"stroke", cat:"肺部 Pulmonary", name:"中風", en:"Cerebrovascular Accident (Stroke)", page:577, pageStr:"577", status:"full", detailed:true,
    aerobic:{f:"最少 3 次/週，最好達 5 次/週", i:"40–70% HRR/VO₂R 或 55–80% HRmax；若有心房顫動或變時功能不全 → RPE 11–14（6–20 量表）", t:"從 20 分鐘漸進至 60 分/天；可分段，每次 10 分鐘", ty:"腳踏車測功儀、半臥式踏步機為優先；平衡夠好者可做跑步機/地面行走；視需要調整輔具"},
    resistance:{f:"2–3 次/週（非連續日）", i:"50–80% 1-RM", t:"1–3 組，每組 10–15 下，共 8–10 個動作", ty:"機械式 vs 自由重量、彈力帶；視動作能力選站姿或坐姿、全/部分承重"},
    flex:{f:"≥2–3 次/週，每日最佳", i:"伸展至緊繃或輕微不適感", t:"靜態伸展維持 10–30 秒，每個動作重複 2–4 次", ty:"靜態和/或動態伸展"},
    clinical:[
      {h:"定義", items:[
        "腦部血流阻斷 → 神經元死亡，87% 缺血性，13% 出血性"
      ]},
      {h:"後遺症", items:[
        "運動、感覺、認知、心理社會障礙，程度取決於病灶大小與位置"
      ]},
      {h:"中風後常見問題", items:[
        "心肺適能下降、疲勞、久坐行為 → 加重功能退化"
      ]},
      {h:"中風三階段", items:[
        "急性期（<1 週）：24 小時後即可出床活動，目標是早期動起來",
        "亞急性期（1 週~6 個月）：促進功能恢復，啟動運動計畫",
        "慢性期（≥6 個月）：持續並漸進推進運動計畫"
      ]},
      {h:"運動測試注意", items:[
        "因平衡/認知限制，次最大運動測試優先",
        "優先使用：腳踏車測功儀、半臥式踏步機（降低平衡需求）",
        "可用 Modified Bruce Protocol（需有足夠平衡感）",
        "若無法做測試，用 ACSM HR 預測公式估算"
      ]}
    ],
    special:[
      {h:"特別提醒", items:[
        "醫療穩定才能開始運動；高心血管事件風險者先做運動測試",
        "阻力訓練避免 Valsalva 操作，防止血壓過度上升",
        "每次 2–3 次/週的神經肌肉訓練（平衡、協調、太極、瑜珈）→ 降低跌倒風險",
        "早期出現局部肌肉與全身疲勞很常見，設計強度時須納入考量",
        "HIIT 在慢性中風有初步證據顯示有效，但最佳強度尚待研究",
        "注意情緒問題（情緒低落、動力不足、挫折、混亂）→ 密切監督、個別化指導可提升依從性",
        "CVD 危險因子控制應是中風運動處方的核心目標",
        "若要重返工作：訓練需模擬職業動作，參考 MET 對照表估算工作負荷"
      ]}
    ],
  acsm11:{
    pageStr:"481-482",
    blocks:[
      {h:"11版阻力訓練強���上限（PDF p482）",body:"11版阻力訓練強度範圍為 50–70% 1-RM；12版提升上限至 50–80% 1-RM（上���增加 10%）。",list:["11版：50–70% 1-RM","12版：50–80% 1-RM"]},
      {h:"11版有氧強度規定（PDF p482）",body:"11版有氧訓練強度以 40–70% HRR 為主；12版增加了 55–80% HRmax 作為等效替代��並新增 VO₂R 作為�����選項。",list:["11版：40–70% HRR（GXT 有資料時）","12版：40–70% HRR/VO₂R 或 55–80% HRmax"]}
    ]
  }
  },
{
    id:"asthma", cat:"肺部 Pulmonary", name:"氣喘", en:"Asthma", page:583, pageStr:"580-586", status:"full", detailed:true,
    aerobic:{f:"最少 3 天/週，最好到 5 天/週", i:"從中強度起始（40–59% HRR 或 V̇O₂R）；若良好耐受，1 個月後漸進至 60–70% HRR 或 V̇O₂R", t:"漸進式增加至至少 30–40 分鐘/天", ty:"大肌群有氧活動（走路、跑步、騎車、游泳或水中運動）"},
    resistance:{f:"至少 2 天/週，非連續日", i:"肌力訓練：新手 60–70% 1-RM，有經驗者 ≥80%；耐力訓練：<50% 1-RM；連續 2 次訓練均超額 1–2 下時，增加重量 2–10%", t:"肌力：2–4 組 × 8–12 下；耐力：≤2 組 × 15–20 下", ty:"重量機械、自由重量、自身體重運動"},
    flex:{f:"≥2–3 天/週（每天最佳）", i:"伸展至緊繃或輕微不適", t:"靜態維持 10–30 秒，每動作重複 2–4 次", ty:"靜態、動態、PNF 伸展"},
    clinical:[
      {h:"疾病特性", items:["氣喘是異質性慢性氣道炎症性疾病，全球約 2.62 億人受影響","特徵：發作性支氣管高反應性、可逆性氣流受限，反覆喘鳴、呼吸困難、胸悶、咳嗽（尤其夜間或清晨）","與健康人相比，氣喘患者較難達到建議的 PA 水準（形成向下惡性循環）"]},
      {h:"運動誘發支氣管收縮（EIB）", items:["EIB：運動因素引起的氣道狹窄，大比例氣喘患者有此問題（部分無氣喘診斷者也可能出現）","環境觸發因素：冷空氣/乾燥空氣、空氣汙染（顆粒物、過敏原、泳池三氯胺）","診斷標準：運動後 FEV1.0 從基線下降 ≥15%","EIB 可以藥物（bronchodilator）有效管理"]},
      {h:"運動測試注意事項", items:["肺功能評估應包括心肺容量、運動前後肺功能（FEV1）和脈搏血氧（SpO2）","EIB 評估：vigor ous 或可變強度（輕 + 高交替）運動 2–4 分鐘起始達高通氣量，持續 4–6 分鐘；測試中呼吸乾燥空氣","測試後 5、10、15、30 分鐘追蹤 FEV1.0 下降","嚴重支氣管收縮可能發生 → 需訓練有素的人員與備用霧化支氣管擴張劑 + 氧氣"]}
    ],
    special:[
      {h:"熱身誘導不應期（最重要防護策略）", items:["運動前進行 10–15 分鐘高強度或可變強度熱身（輕 + 高強度交替）","可誘導『不應期（refractory period）』：使後續 EIB 發作衰減","此為目前最強的 EIB 非藥物預防建議"]},
      {h:"藥物與環境管理", items:["EIB 患者：運動前後可能需使用短效支氣管擴張劑（β2-agonists）","加強支氣管擴張劑預給藥（inhaled bronchodilator）可在運動測試前使用，以優化心肺容量評估","急性發作期間：禁止運動，直到症狀和氣道功能改善後再恢復","環境：避免冷/乾/多塵空氣、吸入過敏原或汙染物；使用非氯化泳池較佳"]},
      {h:"心率目標需謹慎", items:["以 HRmax 預測值設定目標心率應小心：氣喘控制藥物可能影響心率，且 HR 與通氣量的對應關係變異大"]},
      {h:"阻力訓練的特殊指引", items:["長期使用口服皮質類固醇者：可能有周邊肌肉惡病質（cachexia）→ 阻力訓練可提供特別效益","長時間或高強度訓練本身也可能觸發 EIB，需注意"]},
      {h:"教育與依從性", items:["結合運動處方 + 教育（效益說明、自我監測、預防症狀）可最大化參與和堅持率"]}
    ]
  },
{
    id:"copd", cat:"肺部 Pulmonary", name:"慢性阻塞性肺病", en:"COPD", page:595, pageStr:"586-598", status:"full", detailed:true,
    aerobic:{f:"最少 3 天/週，最好到 5 天/週", i:"中至高強度（50–80% 尖峰功率，或 Borg CR10 量表 3–6）；輕度 COPD 依健康老年人指引；中重度：<60% 尖峰功率；重度：輕強度起始", t:"初期 10–15 分鐘/天（前 3–5 次訓練）；漸進至 20–60 分鐘/天；無法維持則累積 ≥20 分鐘穿插低強度工作或休息期", ty:"走路（地面或跑步機）、固定式腳踏車、上肢測功儀"},
    resistance:{f:"至少 2 天/週，非連續日", i:"肌力：新手 60–70% 1-RM，有經驗者 ≥80%；耐力：<50% 1-RM；連續 2 次超額 1–2 下可增加重量 2–10%", t:"肌力：2–4 組 × 8–12 下；耐力：≤2 組 × 15–20 下", ty:"重量機械、自由重量、彈力帶、自身體重"},
    flex:{f:"≥2–3 天/週（每天最佳）", i:"伸展至緊繃或輕微不適", t:"靜態維持 10–30 秒，每動作重複 2–4 次", ty:"靜態、動態（可改善姿勢受損所限制的胸廓活動度）"},
    clinical:[
      {h:"疾病特性與嚴重度分期", items:["全球約 12% 人口有 COPD，為全球第三大死因（占總死亡約 6%）","以 FEV1/FVC <0.70 確診；GOLD 分期：輕度 FEV1 ≥80%、中度 50–79%、重度 30–49%、極重度 <30%","常見系統性合併症：體重下降、肌少症、骨骼肌功能障礙、周邊血管病變、肺動脈高壓、PAD"]},
      {h:"肺復原（PR）的效益", items:["PR 是穩定 COPD 的金標準：meta-analysis 顯示可提升 6-MWT 與 ISWT 距離、降低呼吸困難、改善生活品質（達到或超過最小臨床重要差異）","急性惡化住院後：PR 可降低後續醫療使用；90 天內開始 PR 可能降低 1 年死亡率","肌肉骨骼系統與心血管系統的適應是效益主要機制（減少肺部系統運動負擔）"]},
      {h:"運動測試注意事項", items:["所有進入 PR 的患者建議進行至少 1 次運動評估（CPET、6-MWT 或 Shuttle Walk Test）","6-MWT 最小臨床重要差異：平均 30 公尺（COPD）","中重度 COPD 可能有運動誘發氧合血紅蛋白去飽和（SpO2 下降）→ 週期性監測 PaO2 或 SaO2","靜息 SpO2 ≤85%（呼吸室內空氣）：為運動測試的相對禁忌；SpO2 ≤80% 為終止標準","HR 比例目標不適用（通氣限制 + 靜息心率偏高 + 藥物效果）"]}
    ],
    special:[
      {h:"強度監控：Borg CR10 呼吸困難量表是核心工具", items:["Borg CR10 3–6 分對應 53–80% V̇O₂peak，是 COPD 最適合的強度指引方法","HR 比例目標（% HRmax 或 HRR）不適用（重度 COPD 因通氣限制及藥物影響無法達 HRmax）","密切監測症狀（呼吸困難/喘氣）在許多情況下比客觀指標更重要"]},
      {h:"阻力訓練的特殊重要性（重點）", items:["周邊肌肉功能障礙是 COPD 運動不耐的核心因素，也獨立預測住院率、預後與死亡率","阻力訓練是解決肌肉功能障礙最有效的介入：應納入每次 PR 訓練","因 ADL 常涉及上肢（提物、梳洗）→ 上肢肌群阻力訓練特別重要","跌倒風險高 → 下肢肌力 + 平衡訓練是必要安全措施"]},
      {h:"間歇訓練作為替代方案", items:["若無法維持連續有氧訓練（因呼吸困難/疲勞）→ 間歇訓練（高強度與低強度/休息交替）是有效替代","系統回顧：間歇與連續訓練在運動能力、生活品質、骨骼肌適應的效果無臨床重要差異","依個人特徵選擇間歇或連續訓練"]},
      {h:"血氧與補充氧氣管理", items:["初期訓練課應使用脈搏血氧儀監控，評估運動誘發去飽和及其對應工作負荷","PaO2 ≤55 mmHg 或 SpO2 ≤88%（呼吸室內空氣）：需補充氧氣（包括運動期間）","使用移動式補充氧氣者：運動中應提高流量以維持 SpO2 >88%"]},
      {h:"其他實務注意事項", items:["支氣管擴張劑（bronchodilator）在運動前使用：可減少氣道阻力、降低呼吸困難、提高運動耐受","柔軟度訓練有助於改善姿勢受損（胸廓活動度）所限制的肺功能","上肢測功儀雖是輔助工具，但可能加重呼吸困難 → 使用時應小心監測"]}
    ],
  acsm11:{
    pageStr:"498-499",
    blocks:[
      {h:"11版有氧強度 Borg CR10 範圍（PDF p498-499）",body:"11版 FITT 表���確列出 Borg CR10 4–6 作為 COPD 有氧強度目��。12版改為 3–6，降低了起始門檻。",list:["11版：CR10 4–6（最低強���感覺更明顯）","12版：CR10 3–6（接受更輕的感受強度）"]},
      {h:"11版有氧時間（PDF p499）",body:"11版 FITT 表直接列出 20–60 分鐘/天為目標（無需先從更短時間開始）。12版新���「前 3–5 次訓練先從 10–15 分鐘起始」的具體過渡期。",list:["11版：直接 20–60 min/d（以可耐受為前提）","12版：前 3–5 次先 10–15 min，再進展至 20–60 min"]}
    ]
  }
  },
{
    id:"pah", cat:"肺部 Pulmonary", name:"肺動脈高壓", en:"Pulmonary Arterial Hypertension (PAH)", page:600, pageStr:"599-602", status:"approx", detailed:true,
    aerobic:{f:"≥5 天/週（含居家運動）；有氧訓練不可連續天執行", i:"40–70% HRR 或 RPE 11–14（Borg 6–20）；部分早期研究以絕對 HR ≤120 bpm 為限；chronotropic incompetence 者基於 THR 的處方需謹慎", t:"依耐受度漸進", ty:"低強度有氧：跑步機/平地步行、臥式踩踏、手臂或腳踏測功儀；CPET 評估最有用"},
    resistance:{f:"依個人耐受度", i:"體重和/或輕啞鈴可能已足夠；機器重量、彈力帶和彈力管在監督下安全", t:"依個人耐受度", ty:"體重訓練或輕啞鈴；機器/彈力帶在監督下"},
    flex:{f:"依需要", i:"舒適範圍", t:"30 s 靜態", ty:"靜態和動態伸展"},
    clinical:[
      {h:"PAH 病理與臨床背景", items:[
        "PAH（Group 1 PH）：肺動脈血管進行性病變 → 右心室後負荷過重 → RV 衰竭",
        "診斷：mPAP ≥25 mmHg（近年建議 >20 mmHg + PVR ≥3 Wood Units）",
        "臨床表現：進行性疲勞、呼吸困難、昏厥、運動不耐受（甚至低強度活動）",
        "歷史上 PAH 患者被勸阻運動（擔心肺血管壓力急劇升高 → RV 崩潰）",
        "當代證據：穩定期 PAH 患者（接受最佳藥物治療）接受監督運動訓練可改善 6-MWT、WHO 功能分級、QoL 和 VO₂peak，且未增加嚴重不良事件風險",
        "治療：必須在有 PR 專長的專科診所進行；緊密監督"
      ]}
    ],
    special:[
      {h:"運動監測與安全", items:[
        "每次運動需嚴密監測 BP、HR、SpO2（維持 >90%）；必要時補充氧氣",
        "心電圖 telemetry 監測有助於發現高階心室異位或不適當心動過緩",
        "Pacing 和節能技術對 PAH 患者極為重要（居家和 PR 訓練均需）",
        "Fear avoidance 和對引起喘息活動的焦慮是運動處方的常見阻礙 → 需要一對一指導",
        "CPET 提供最豐富的預後和運動處方資訊；6-MWT 是最常用的功能容量評估工具",
        "吸氣肌訓練（IMT）可作為 PR 的輔助訓練，可改善走路 BP、呼吸困難和吸氣肌力量"
      ]}
    ],
  acsm11:{
    pageStr:"501-502",
    blocks:[
      {h:"11版無具體 FITT 表（PDF p501-502）",body:"11版針對 PAH 僅提供定性指引，無 FITT 格式數值。12版首次為 PAH 建立 40-70% HRR / RPE 11-14 等具體強度規範。",list:["11版：有氧低強度（無 %HRR）；達 5 d/wk（含居家運動）；阻力以體重/輕啞鈴為主","12版：有氧 40-70% HRR 或 RPE 11-14"]}
    ]
  }
  },
{
    id:"ild", cat:"肺部 Pulmonary", name:"間質性肺病", en:"Interstitial Lung Disease (ILD)", page:603, pageStr:"602-603", status:"approx", detailed:true,
    aerobic:{f:"FITT 類似 COPD（3–5 天/週）", i:"中等強度有氧為核心；強度需低於引發嚴重呼吸困難、SpO2 下降或高血壓的水平", t:"初期 10–15 min；漸進至 20–60 min（可間歇累積 ≥20 min）", ty:"步行（地面或跑步機）、腳踏車；CPET 評估最有用"},
    resistance:{f:"2 天/週非連續天", i:"60–70% 1-RM 初學；80% 以上有訓練基礎者；肌耐力 <50% 1-RM", t:"2–4 組，8–12 RM（肌力）；2 組以下，15–20 RM（肌耐力）", ty:"機器重量、自由重量、彈力帶或體重"},
    flex:{f:"2–3 天/週", i:"牽拉感", t:"10–30 s 靜態；每動作 2–4 次", ty:"靜態、動態、PNF 伸展"},
    clinical:[
      {h:"ILD 臨床背景", items:[
        "ILD：肺泡間質纖維化和/或發炎 → 低肺容量、低擴散容量、快速淺呼吸型態",
        "常見疾病：IPF、石綿肺、結節病、藥物誘發性肺炎",
        "常見症狀：乾咳、運動性呼吸困難、低血氧、運動不耐受",
        "運動時死腔通氣增加、周邊肌肉功能障礙、外周性低氧血症",
        "常需運動時補充氧氣（因瀰散能力降低，尤其是運動中）"
      ]}
    ],
    special:[
      {h:"ILD 運動處方特殊要點", items:[
        "運動強度需低於引發嚴重呼吸困難、SpO2 下降或高血壓的閾值",
        "運動中可能需要高 FIO2（高分率吸入氧氣）補充以防止外周性低血氧",
        "強調 pacing 和節能技術；運動前使用支氣管擴張劑和漸進暖身",
        "CPET 對評估 ILD 複雜、多因素的運動限制最有臨床價值",
        "急性加重期間應限制運動直到症狀緩解"
      ]}
    ],
  acsm11:{
    pageStr:"503",
    blocks:[
      {h:"11版無獨立 FITT 表（PDF p503）",body:"11版 ILD 直接沿用 COPD FITT 指引，無獨立 FITT 數值。12版為 ILD 建立具體阻力訓練處方（60-70% 1-RM；2-4 組 x 8-12 RM）及柔軟度頻率（2-3 d/wk）。",list:["11版：FITT 指引類似 COPD；中強度有氧為核心（無獨立阻力/柔軟度數值）","12版：阻力 60-70% 1-RM 起始；柔軟度 2-3 d/wk"]}
    ]
  }
  },
{
    id:"cystic_fibrosis", cat:"肺部 Pulmonary", name:"囊狀纖維化", en:"Cystic Fibrosis (CF)", page:603, pageStr:"603-604", status:"approx", detailed:true,
    aerobic:{f:"依 COPD 建議（3–5 天/週）；依個人運動耐受度調整", i:"中至高強度（依耐受度）；參照 COPD FITT 表（50–80% 峰值工作率或 Borg CR10 3–6）", t:"初期 10–15 min；漸進至 20–60 min（可間歇累積）", ty:"步行、腳踏車；CF 患者適用肺移植前後的 COPD 運動方案"},
    resistance:{f:"2 天/週非連續天", i:"60–70% 1-RM 初學；80% 以上有基礎者", t:"2–4 組，8–12 RM", ty:"機器重量、自由重量、彈力帶"},
    flex:{f:"2–3 天/週", i:"牽拉感", t:"10–30 s 靜態", ty:"靜態伸展"},
    clinical:[
      {h:"CF 臨床背景", items:[
        "CF：遺傳性疾病，影響肺和消化系統；產生過度黏稠的黏液 → 阻塞氣道和胰臟",
        "主要症狀：咳嗽、痰液生成、呼吸困難、間歇性咳血、運動不耐受",
        "雖無根治方法，但定期運動和提高 PA 水平對 CF 患者有益",
        "較高的體能適能與 CF 患者較好的存活率相關",
        "適用 COPD 運動處方方案，肺移植前後均適用（需依個人運動耐受度修改）"
      ]}
    ],
    special:[
      {h:"CF 管理要點", items:[
        "維持充足營養是管理優先事項",
        "定期進行氣道清除技術（airway clearance techniques）",
        "Pacing 和節能，特別是運動中",
        "感染控制：防止病原菌交叉感染（CF 患者對特定病原菌高度易感）",
        "CF 特定的兒童、青少年和成人運動處方指引已有發表（289）"
      ]}
    ],
  acsm11:{
    pageStr:"503-504",
    blocks:[
      {h:"11版無獨立 FITT 表（PDF p503-504）",body:"11版 CF 建議直接套用 COPD 運動方案（移植前後皆適用），無獨立 FITT 數值。12版為 CF 建立具體阻力訓練處方（60-70% 1-RM）及有氧初期過渡期（10-15 min 起始）。",list:["11版：CF 可沿用 COPD 運動方案（無獨立 FITT 表）","12版：阻力 60-70% 1-RM；有氧初期 10-15 min → 漸進至 20-60 min"]}
    ]
  }
  },
{
    id:"lung_transplant", cat:"肺部 Pulmonary", name:"肺移植", en:"Lung Transplantation", page:605, pageStr:"604-607", status:"approx", detailed:true,
    aerobic:{
      f:"術前等待期：至少 2 天/週，盡量達 5 天/週；術後：至少 3 天/週，盡量達 5 天/週",
      i:"50–80% HRR 或 Borg CR10 3–5；術後也可用 75–100% 6-MWT 速度；術後 4–6 週內避免高強度有氧或阻力訓練",
      t:"術前：15–30 分鐘（連續）或 5–10 min × 2–3 次（間歇）；術後：20–30 分鐘（連續）",
      ty:"步行、腿部腳踏車；間歇訓練在術前等待期效果佳（呼吸困難更少、改善相似）；術後前 3 個月避免手臂測功儀（切口癒合）"
    },
    resistance:{f:"2–3 天/週非連續天", i:"術前：30–80% 1-RM；術後：50–80% 1-RM", t:"術前：1–2 組，8–15 RM；術後：1–3 組，8–15 RM", ty:"針對上下肢主要肌群；術後前 10–12 週避免上肢提舉/推/拉 >10 lb（特別是胸骨不穩定時）"},
    flex:{f:"依需要", i:"舒適範圍", t:"30 s 靜態", ty:"靜態和動態伸展"},
    clinical:[
      {h:"肺移植臨床背景", items:[
        "肺移植是終末期肺病（如 CF、COPD、PAH）的有效治療；術後肺功能、運動容量和 QoL 均改善",
        "術前 prehabilitation 和術後 rehabilitation 運動訓練對患者均有幫助",
        "術前運動容量是等待名單存活率的重要預測因子，與術後住院時間和存活率相關",
        "術後儘管肺功能接近正常，運動不耐受和功能性殘疾常仍然存在",
        "骨骼肌功能障礙是術後運動受限的主要因素 → 術後早期（24 小時後）開始 rehabilitation"
      ]}
    ],
    special:[
      {h:"術後早期復健要點", items:[
        "術後 24 小時即可開始 ROM 活動、轉移訓練（坐到站）、呼吸訓練和氣道清除教育",
        "術後 4–6 週內避免高強度有氧或阻力訓練",
        "手臂測功儀：術後前 3 個月避免（切口癒合）",
        "上肢提舉/推/拉 >10 lb（4.5 kg）：術後前 10–12 週避免（胸骨穩定性考量）",
        "術前運動應持續直至手術當天；術後 exercise training 越早越好",
        "感染控制程序至關重要（防止 MRSA、分枝桿菌等在團體運動中交叉感染）",
        "姿勢和步態異常可能加重術後切口疼痛 → 術後密切監測平衡、姿勢和步態"
      ]}
    ],
  acsm11:{
    pageStr:"504-505",
    blocks:[
      {h:"11版無具體 FITT 表（PDF p504-505）",body:"11版肺移植無具體 FITT 數值；僅為定性指引（監督式運動、術前盡量維持功能、術後避免 4-6 週高強度）。12版首次建立術前/術後分期 FITT 處方（有氧 50-80% HRR；阻力術前 30-80%、術後 50-80% 1-RM）。",list:["11版：術前近最大耐受度；術後 4-6 週避免高強度（無具體 %）","12版：有氧 50-80% HRR；阻力術前 30-80% / 術後 50-80% 1-RM"]}
    ]
  }
  },
{
    id:"diabetes", cat:"代謝 Metabolic", name:"糖尿病", en:"Diabetes Mellitus", page:661, pageStr:"653-667", status:"full", detailed:true,
    aerobic:{f:"3–7 天/週；T2DM 不可連續超過 2 天不動", i:"中強度 40–59% V̇O₂R 或 HRR（RPE 11–12）；或高強度 60–89% V̇O₂R 或 HRR（RPE 14–17）", t:"中強度 150–300 分鐘/週，或高強度 75–150 分鐘/週，或組合；鼓勵全天累積非結構化活動打斷久坐", ty:"大肌群韻律性長時間活動（走路、騎車、游泳）；連續訓練或 HIIT 均適用"},
    resistance:{f:"至少 2 天/週（非連續），最好 3 天/週", i:"中強度 50–69% 1-RM 至高強度 70–85% 1-RM，以改善肌力", t:"至少 8–10 個動作，初期 1–3 組 × 10–15 下，接近疲勞", ty:"阻力機械、自由重量、彈力帶、自身體重功能性運動"},
    flex:{f:"≥2–3 天/週（柔軟度與平衡均適用）", i:"伸展至緊繃或輕微不適；平衡運動：輕至中強度", t:"靜態伸展 10–30 秒，每動作重複 2–4 次；平衡訓練任意時長", ty:"靜態、動態、其他伸展方式、瑜伽；（平衡訓練類型與健康族群相同）"},
    clinical:[
      {h:"疾病分類", items:["T2DM：90–95% 的病例，由胰島素阻抗 + β 細胞分泌缺陷驅動，常合併中心性肥胖","T1DM：5–10%，自體免疫破壞 β 細胞，幾乎完全胰島素缺乏，酮酸中毒風險高","前期糖尿病（Prediabetes）：空腹血糖受損（IFG）或葡萄糖耐受不良（IGT），若不介入將進展為 T2DM","診斷標準：A1C ≥6.5%、空腹血糖 ≥126 mg/dL、OGTT 2h 血糖 ≥200 mg/dL（任一即可）"]},
      {h:"運動效益", items:["DM 整體：A1C 降低 0.5–0.7%、減少每日高血糖時間，改善多項 CVD 危險因子","CRF（心肺適能）是 T2DM 死亡率的最強獨立預測因子之一，有氧訓練改善 CRF 效果優於阻力訓練","阻力訓練降低 A1C 幅度更大；有氧 + 阻力合併訓練效果可能最佳（血糖控制、體重管理）","T1DM：改善胰島素敏感性、降低外源胰島素需求；T2DM 及前期：可延緩或預防疾病進展"]},
      {h:"運動測試注意事項", items:["輕至中強度訓練且無 CVD 症狀者：一般不需先做運動測試（ACSM 建議靜態者接受醫療評估）","希望進行高強度運動者、長期靜態生活者：建議 ECG 壓力測試","自主神經病變（autonomic neuropathy）：可能有心率反應遲鈍（chronotropic incompetence）、運動後低血壓，以 RPE 指引強度；注意無症狀心肌缺血","每年進行 CVD 危險因子評估"]}
    ],
    special:[
      {h:"低血糖管理（最重要）", items:["低血糖定義：血糖 <70 mg/dL（3.9 mmol/L），為急性運動的相對禁忌","運動前理想血糖範圍：90–250 mg/dL","中強度有氧運動期間及運動後風險最高，可延遲至 12 小時後發生 → 需調整食物/藥物","高強度運動或阻力訓練優先於有氧訓練，可減緩 T1DM 血糖下降速率",{t:"低血糖症狀",sub:["腎上腺素症狀：顫抖、虛弱、異常出汗、緊張、焦慮、口手發麻、飢餓感","神經低糖症狀（重）：頭痛、視覺障礙、精神遲鈍、混亂、失憶、抽搐、昏迷"]}]},
      {h:"胰島素使用者的運動管理", items:["使用胰島素或促胰島素分泌藥物（磺醯尿素類）者：運動前、中（必要時）、後監測血糖","速效胰島素：運動前（尤其峰值期內 2–3 小時）需減量；早晨運動可能反而升血糖","胰島素泵患者：運動中可降低基礎輸注率或短暫中斷；運動後 12 小時內仍可能需要減少基礎率","連續血糖監測（CGM）有助於掌握多日血糖型態及評估即時/延遲運動效應","混合閉迴路系統（insulin pump + CGM）：活動前後可能需調整目標血糖/胰島素輸注","外出運動建議攜帶：醫療識別 ID、手機、葡萄糖錠（或快速碳水化合物）"]},
      {h:"糖尿病併發症對運動的影響", items:[{t:"視網膜病變",sub:["嚴重非增殖性或不穩定增殖性視網膜病變：避免高強度有氧、激烈阻力訓練、跳躍/震動動作、Valsalva 閉氣"]},{t:"自主神經病變",sub:["心率與血壓反應遲鈍 → 改用 RPE 控制強度","監控無症狀心肌缺血（如不尋常呼吸困難或背痛）","運動前後測量血壓"]},{t:"周邊神經病變",sub:["每日檢查足部，預防足部潰瘍與截肢風險","使用矽膠/氣墊鞋墊與聚酯混紡襪；保持足部乾燥","考慮增加非負重活動比例"]},{t:"糖尿病腎病",sub:["急性運動後蛋白尿增加，但規律運動不會加速腎病進展","晚期腎病患者：從低強度與低容量起始"]}]},
      {h:"阻力訓練安全注意事項", items:["適當進展以防受傷（T2DM 患者肌腱病變風險較高，老年人膠原糖化可能限制關節活動度）","進展順序：先增加重量（減少次數），再增加組數，最後增加頻率","阻力訓練禁忌：未控制高血壓、不穩定增殖性視網膜病變"]}
    ],
  acsm11:{
    pageStr:"534-535",
    blocks:[
      {h:"11版有氧時間範圍（PDF p535）",body:"11版僅規定「150 min/wk（中至高強度）」，無明確上限。12版擴展為「中強度 150–300 min/wk 或高強度 75–150 min/wk」，增加了目標上限。",list:["11版：150 min/wk（中至高強度，無上限）","12版：150–300 min/wk（中強度）或 75–150 min/wk（高強度）"]},
      {h:"11版有氧強度描述（PDF p534）",body:"11版以主觀描述「moderate to vigorous（中至高強度）」為強度指標，未指定 %VO₂R 或 HRR 數值。12版加入具體數字：中強度 40–59% VO₂R/HRR（RPE 11–12）、高強度 60–89%（RPE 14–17）。",list:["11版：主觀「moderate to vigorous」","12版：40–59% VO₂R/HRR（中強度）；60–89%（高強度）+ RPE"]}
    ]
  }
  },
{
    id:"dyslipidemia", cat:"代謝 Metabolic", name:"血脂異常", en:"Dyslipidemia", page:674, pageStr:"671-675", status:"full", detailed:true,
    aerobic:{f:"≥5 天/週（以最大化熱量消耗）", i:"40–75% V̇O₂R 或 HRR", t:"30–60 分鐘/天；促進或維持減重者：建議 ≥50–60 分鐘/天", ty:"大肌群韻律性長時間活動（走路、騎車、游泳）"},
    resistance:{f:"2–3 天/週", i:"中強度 50–69% 1-RM 至高強度 70–85% 1-RM（增加肌力）", t:"增加肌力：2–4 組 × 8–12 下；增加肌耐力：≤2 組 × 12–20 下", ty:"阻力機械、自由重量、自身體重"},
    flex:{f:"≥2–3 天/週", i:"伸展至緊繃或輕微不適", t:"靜態維持 10–30 秒，每動作重複 2–4 次", ty:"靜態、動態、PNF 伸展"},
    clinical:[
      {h:"定義與盛行率", items:["血脂異常：血液中脂質濃度異常（高 TC、高 LDL-C、高 TG 或低 HDL-C）","美國超過 50% 成人有血脂異常，為動脈粥樣硬化性 CVD 的主要危險因子","TG 偏高時計算 LDL-C 準確性下降，建議改用 non-HDL-C 評估 CV 風險"]},
      {h:"常見病因", items:["最常見：不良飲食與生活型態；遺傳因素扮演重要角色","家族性高膽固醇血症（FH）：LDL-C >190 mg/dL，每 300–500 人有 1 人","疾病因素：甲狀腺機能低下、腎病症候群（升 LDL-C）；肥胖/胰島素阻抗/DM（高 TG）","口服合成代謝類固醇：HDL-C 降低 20–70%"]},
      {h:"運動效益與藥物", items:["有氧 + 阻力訓練：LDL-C 降 3–6 mg/dL、TG 降 4–12 mg/dL、HDL-C 升 1–2 mg/dL","體重減輕可進一步降低 TC、LDL-C 和 TG","第一線藥物：他汀類（Statins）；更強效控制可加 ezetimibe 或 PCSK9 抑制劑","高 TG 治療：fibric acid 衍生物（gemibrozil）或 omega-3 脂肪酸","四大最受益族群：(a)已確診 CVD、(b)LDL-C >190 mg/dL、(c)≥40 歲 DM 患者、(d)10 年 CVD 風險 ≥7.5%"]}
    ],
    special:[
      {h:"他汀類藥物副作用監控", items:["最常見副作用：輕至中度肌肉疼痛與無力","橫紋肌溶解症（Rhabdomyolysis）：少見但可能致命，尤高劑量或合用 fibric acid 衍生物時","警示症狀：運動後不尋常或持續性肌肉酸痛，尤其伴隨棕紅色尿液 → 立即就醫"]},
      {h:"體重管理是核心目標", items:["血脂異常患者的 ExRx 與健康成人相似，但體重維持/減輕應高度強調","合併肥胖/過重者：每天運動時間應增加（>50–60 分鐘）以提高熱量消耗"]},
      {h:"合併症時 FITT 修改原則", items:["合併代謝症候群、DM、肥胖、高血壓時，FITT 需依各自病況調整","65 歲以上血脂異常患者：依 ACSM 老年人運動指引執行"]}
    ]
  },
{
    id:"hypertension", cat:"代謝 Metabolic", name:"高血壓", en:"Hypertension", page:682, pageStr:"677-684", status:"full", detailed:true,
    aerobic:{f:"≥2–3 天/週（建議大多數甚至每天）", i:"中強度 40–59% V̇O₂R 或 HRR（RPE 12–13）至高強度 60–80%（RPE 14–16）", t:"≥20–30 分鐘/天，連續或累積任意時長；每週合計 ≥90–150 分鐘", ty:"大肌群韻律性長時間活動（走路、騎車、游泳）"},
    resistance:{f:"≥2–3 天/週", i:"中強度 60–70% 1-RM，可漸進至 80%；年長與新手從 40–50% 1-RM 開始", t:"2–4 組 × 8–12 下，涵蓋 8–10 個主要肌群動作，每次 ≥20 分鐘", ty:"阻力機械、自由重量、彈力帶、功能性自身體重"},
    flex:{f:"≥2–3 天/週", i:"伸展至緊繃或輕微不適", t:"靜態維持 10–30 秒 × 每動作 2–4 次，每動作總計 60 秒；每次 ≤10 分鐘", ty:"靜態、動態、本體感覺神經肌肉促進術（PNF）"},
    clinical:[
      {h:"流行病學與定義", items:["美國高血壓盛行率：約 47% 成人（~1.224 億），為最常見且可修改的 CVD 主要危險因子","2017 ACC/AHA 定義：靜息 SBP ≥130 mmHg 或 DBP ≥80 mmHg（JNC7/ESC/ESH/ISH 仍使用 ≥140/90）","原發性（本態性）高血壓：占 95%；繼發性（腎臟疾病、原發性醛固酮症等）：占 5%"]},
      {h:"運動對血壓的效益", items:["任何強度、時長、類型的慢性運動均可降低靜息 SBP 與 DBP","降幅與靜息 BP 成正比：高血壓患者降幅最大（SBP 5–8 mmHg）；正常血壓者降 1–2 mmHg","運動 + 降壓藥物的聯合效果優於任一單獨介入","有氧運動可改善心臟結構：減少左心室壁厚度與左心室質量"]},
      {h:"運動測試注意事項", items:["SBP ≥160 或 DBP ≥100 mmHg，或有標的器官損傷：禁止運動（包括運動測試），須先醫療評估","SBP ≥130 或 DBP ≥80（未控制）：建議諮詢醫師，但不一定排除輕至中強度 PA","β-blockers：心率反應衰減、最大運動能力降低","利尿劑：低血鉀、電解質失衡、心律不整、偽陽性運動測試風險"]}
    ],
    special:[
      {h:"運動中血壓監控上限", items:["運動中建議維持 SBP ≤220 mmHg、DBP ≤105 mmHg","部分患者即使靜息 BP 已控制，仍可能在低強度下即出現誇大的 BP 反應（<85% 年齡預測最大 HR）","有誇大 BP 反應者可考慮做運動測試，以確認誇大 BP 對應的 HR 強度，作為訓練強度的上限"]},
      {h:"避免 Valsalva 閉氣", items:["舉重時閉氣（Valsalva maneuver）可導致極端血壓上升、頭暈甚至昏厥","所有高血壓患者進行阻力訓練時必須避免"]},
      {h:"多模式運動處方", items:["高血壓 ExRx 不再只強調有氧，應鼓勵多模式運動（有氧 + 阻力 + 柔軟度 + 神經運動）","神經運動訓練（Neuromotor）：≥2–3 天/週，低至中強度，≥20–30 分鐘/次，包含瑜伽、皮拉提斯、太極等（新興證據顯示有效降壓）","等長阻力訓練（Isometric）：新興證據支持對高正常與高血壓患者有降壓效果","降壓效果與強度成正比：高強度有氧的降壓幅度大於中強度"]},
      {h:"FITT 漸進原則", items:["漸進速度要緩慢，避免任何 FITT 分項大幅跳躍，尤其是強度","高血壓常合併肥胖：ExRx 應同時增加熱量消耗並結合飲食管理以促進體重下降"]}
    ],
  acsm11:{
    pageStr:"550-552",
    blocks:[
      {h:"11版有氧頻率差異（PDF p551）",body:"11版規定 ≥5–7 d/wk 為高血壓有氧運動頻率（強調每天或幾乎每天）。12版放寬至「≥2–3 d/wk，建議大多數甚至每天」，不再要求 5–7 天。",list:["11版：≥5–7 d/wk","12版：≥2–3 d/wk（建議每天）"]},
      {h:"11版有氧強度範圍（PDF p551）",body:"11版只規定「中強度（40–59% VO₂R/HRR）」，不建議高強度。12版擴展至「中強度至高強度（40–80%）」，允許高強度有氧訓練。",list:["11版：僅中強度 40–59% VO₂R/HRR（RPE 12–13）","12版：中強度至高強度 40–80%"]}
    ]
  }
  },
{
    id:"obesity", cat:"代謝 Metabolic", name:"過重與肥胖", en:"Overweight & Obesity", page:692, pageStr:"687-695", status:"full", detailed:true,
    aerobic:{f:"≥5 天/週以最大化熱量消耗（維持體重期：5–7 天/週）", i:"起始中強度（40–59% V̇O₂R 或 HRR）；漸進至高強度（≥60%）以獲得更大健康效益", t:"起始 30 分鐘/天（150 分鐘/週）；漸進至 60+ 分鐘/天（250–300 分鐘/週）以維持長期減重", ty:"大肌群韻律性長時間活動（走路、騎車、游泳）"},
    resistance:{f:"2–3 天/週", i:"60–70% 1-RM，漸進以增加肌力與肌肉量", t:"2–4 組 × 8–12 下，涵蓋主要肌群", ty:"阻力機械或自由重量"},
    flex:{f:"≥2–3 天/週", i:"伸展至緊繃或輕微不適", t:"靜態維持 10–30 秒，每動作重複 2–4 次", ty:"靜態、動態、PNF"},
    clinical:[
      {h:"流行病學", items:["美國約 70% 成人過重或肥胖；41.9% 為肥胖（BMI ≥30）、7% 為重度肥胖（BMI ≥40）","Black（49.9%）與 Hispanic（45.6%）族群盛行率更高","青少年肥胖：6–11 歲 19.3%、12–19 歲 20.9%","肥胖相關直接+間接醫療成本超過 1,900 億美元/年"]},
      {h:"運動量與減重的劑量效應", items:["<150 分鐘/週：最低程度減重",">150 分鐘/週：中度減重（約 2–3 kg）",">225–420 分鐘/週：較大減重（5–7.5 kg）","即使無體重下降，提升 CRF 仍是肥胖治療的重要目標（CRF 可中介肥胖諸多健康危害）","飲食控制 + 運動聯合介入的減重效果比單純飲食控制多約 20%（~3 kg）"]},
      {h:"運動測試注意事項", items:["低至中強度訓練者通常不需先做運動測試","初始工作負荷建議 2–3 METs，每測試階段增加 0.5–1.0 MET（因預期運動能力低）","常合併高血壓、高血脂、高血糖等 CVD 危險因子，需謹慎","藥物時機：β-blockers 和降糖藥的使用時間需納入考量","血壓袖帶需選用適合尺寸以確保測量準確","運動設備需符合患者體重規格的安全與校準需求"]}
    ],
    special:[
      {h:"體重管理目標與策略", items:["短期目標：3–6 個月內減輕初始體重 ≥3–10%","飲食熱量赤字：每日減少 500–1,000 kcal → 每週減 0.5–0.9 kg","飲食品質改善：減少添加糖與飽和脂肪，增加多元/單元不飽和脂肪酸",">5–10% 的減重目標可能需要更積極的飲食 + 運動 + 行為介入","維持體重期：建議 ≥250 分鐘/週運動（部分研究建議 200–300 分鐘/週）；「越多越好」"]},
      {h:"GLP-1 受體促效劑（如 semaglutide）的運動搭配", items:["使用 GLP-1 RA 等減重藥物時，中至高強度運動是安全且有效的","合併運動可預防藥物單獨使用時的肌肉量流失，並減少部分藥物造成的靜息 HR 上升","聯合介入（藥物 + 運動）vs. 單一介入：體脂減少更多、減重更持久、胰島素敏感性 + A1C + CRF 均更佳"]},
      {h:"運動執行的實務注意事項", items:["阻力訓練不會產生臨床顯著的減重效果，但有助於減少極低熱量飲食時的肌肉量流失（建議同時攝取 ≥1.2 g/kg 蛋白質）","初期低 CRF 者：以間歇運動（每次 ≥10 分鐘）累積運動量；之後漸進引入連續 + 負重活動","骨科/關節問題者：需評估後採用腿或手臂測功儀替代","建議採用去汙名化、以人為本的語言：「有肥胖問題的成人」而非「肥胖者」","體重測量應提供隱私"]},
      {h:"減重手術後（Bariatric Surgery）", items:["BMI ≥40 或 BMI ≥35 合併危險因子者可考慮減重手術","術後經醫師許可後：依肥胖 FITT 原則執行漸進式有氧 + 阻力 + 柔軟度訓練，可改善 CRF 和肌力、減少骨質流失、預防體重回升","有骨科/關節損傷史者：優先評估，先採非負重活動，再逐漸引入步行等負重訓練"]}
    ]
  },
{
    id:"masld", cat:"代謝 Metabolic", name:"代謝脂肪肝", en:"MASLD (舊稱 NAFLD)", page:708, pageStr:"704-709", status:"full", detailed:true,
    aerobic:{f:"3–5 天/週", i:"中強度（40–59% HRR）或高強度（>60% HRR）", t:"中強度 ≥150 分鐘/週（如每天 30 分鐘 × 5 天）；高強度 ≥75 分鐘/週；可分次累積（若無法一次完成長時間）", ty:"大肌群節律性活動（步行、騎車、游泳）；MICT 或 HIIT 均可；HIIT 選低衝擊模式降低受傷風險"},
    resistance:{f:"2 天/週", i:"中強度：50–85% 1-RM（提升肌力）；<50% 1-RM（提升肌耐力）", t:"2–4 組 × 8–12 下（肌力）；12–20 下（肌耐力）；涵蓋主要肌群", ty:"阻力機械、自由重量或徒手"},
    flex:{f:">2–3 天/週", i:"伸展至緊繃或輕微不適；平衡：輕至中強度", t:"靜態維持 10–30 秒，×2–4 次；平衡訓練：任何時長", ty:"靜態、動態或其他伸展；瑜伽、彼拉提斯（尤適合久坐者入門）"},
    clinical:[
      {h:"MASLD 概述", items:["MASLD（代謝功能障礙相關脂肪性肝病）= 肝臟異常堆積脂肪，是全球肝臟疾病首要原因（影響全球 1/3 人口）","前稱 NAFLD；2023 年更名以消除污名化並更準確反映病理","無過量飲酒（男 >2 杯/天；女 >1 杯/天）","診斷：血液肝酵素升高（ALT、AST、ALP）→ 肝臟超音波或切片確認","身體不活動在 MASLD 發展中扮演關鍵角色；目前無核准藥物治療","只有 10–20% MASLD 患者達到 PA 建議量；比無 MASLD 者每週少步行約 10 公里"]},
      {h:"運動效益（即使無顯著體重減輕）", items:["改善肝臟脂肪和發炎（即使無顯著體重減輕）","改善體組成（降體脂、增肌肉量）、CRF、代謝疾病控制（血糖、血壓、血脂）","改善健康相關生活品質和降低心血管風險","改善肝纖維化：通常需要 ≥7% 體重減輕（針對有超重或肥胖者）"]}
    ],
    special:[
      {h:"MASLD 特殊執行注意事項", items:["漸進「樓梯式」進展法：從低強度起步，緩步達到中至高強度目標","MASLD 患者運動限制更多：疼痛敏感度較高（RPE 更高）、疲勞和骨關節炎更常見","高強度運動測試和訓練：建議醫療監督，直到安全性確立","短期目標導向（非體重減輕）：體組成改善、體能提升、生活品質改善，有助依從性","避免將注意力導向體重磅數，以免挫折感影響持續運動意願"]}
    ]
  },
{
    id:"metabolic_syndrome", cat:"代謝 Metabolic", name:"代謝症候群", en:"Metabolic Syndrome", page:699, pageStr:"697-703", status:"approx", detailed:true,
    aerobic:{f:"多數天（≥5 天/週）或依個別共病調整", i:"中強度（40–59% VO₂R 或 HRR）起始；適當時進展至高強度（≥60%）", t:"起始 150 分鐘/週（30 分鐘/天）；進展至 250–300 分鐘/週（50–60 分鐘/天 × 5 天）以促進體重減輕", ty:"大肌群節律性活動；HIIT 可在低衝擊模式下有效改善 MetSyn 及體適能"},
    resistance:{f:"≥2 天/週", i:"依個別共病最保守標準設定（見 HTN、DM、Dyslipidemia 等各篇）；漸進進展", t:"依組成共病個別化", ty:"參照成人阻力訓練指南，結合有氧可帶來更大 MetSyn 改善效果"},
    flex:{f:"依一般成人建議", i:"溫和伸展至緊繃", t:"靜態 10–30 秒", ty:"靜態伸展"},
    clinical:[
      {h:"代謝症候群診斷標準", items:["MetSyn = 以下 5 項中至少 3 項：(1) 腰圍（男 >102cm / 女 >88cm）(2) 空腹血糖 ≥100 mg/dL 或服藥 (3) TG ≥150 mg/dL 或服藥 (4) HDL 男 <40 / 女 <50 mg/dL 或服藥 (5) 血壓 ≥130/85 mmHg 或服藥","美國成人盛行率約 34–39%；與 CVD、DM、腦中風風險增加相關"]},
      {h:"運動處方原則", items:["MetSyn 無獨立 FITT 箱；整體遵循成人指南，但因多重風險因子聚集需特別個別化","制訂 ExRx 時：針對存在的每個危險因子/疾病，採用最保守的初始運動量標準","阻力訓練結合有氧訓練：比單純有氧更能降低 MetSyn 盛行率","HIIT：有效改善 MetSyn 及其各項組成，無論高或低容量；建議選低衝擊模式"]}
    ],
    special:[
      {h:"多重共病管理策略", items:["初始量保守（因多重危險因子）；隨時間和耐受度增加強度和時間","PA 長期可減少 MetSyn 患者藥物需求","體重減輕目標：5%–10%（初期）；方法：EI 減少 500–1,000 kcal/天 + 運動","合併各相關疾病 ExRx 規則（HTN、DM、Dyslipidemia）；每個領域詳見各篇章"]}
    ]
  },
{
    id:"multiple_chronic", cat:"代謝 Metabolic", name:"多重慢性病", en:"Multiple Chronic Diseases", page:816, pageStr:"815-816", status:"none", detailed:true,
    aerobic:{f:"依各疾病中最保守的頻率建議", i:"依各疾病中最保守的強度建議", t:"依各疾病中最保守的時間建議", ty:"依各疾病建議的活動類型"},
    resistance:{f:"依各疾病中最保守的建議", i:"依各疾病中最保守的建議", t:"依各疾病中最保守的建議", ty:"依各疾病建議"},
    flex:{f:"依各疾病建議", i:"依各疾病建議", t:"依各疾病建議", ty:"靜態伸展"},
    clinical:[
      {h:"一般原則", items:[
        "美國估計有 1/2 成年人（1.29 億）患有至少一種前十大慢性病；1/4 有兩種以上；65 歲以上：88% 至少一種、73% 至少兩種",
        "多重慢性病的 ExRx：整體遵循健康成人建議（Chapter 5），但如有特定疾病需更保守，則依最保守者處理",
        "輕至中強度運動對多數醫學穩定的多重慢性病患者是安全的（詳見 Chapter 1）",
        "運動測試：依造成最保守方法的疾病來選擇測試方式"
      ]}
    ],
    special:[
      {h:"多重慢性病運動處方特別提醒", items:[
        "開始訓練前確保所有疾病/狀況均已穩定",
        "隨著運動訓練適應，訓練強度可能增加，進而揭露原本未察覺的症狀（如：規律步行後出現心絞痛或呼吸困難）",
        "PA 與健康之間存在明確的劑量-反應關係；即使非常低量的 PA 也應鼓勵",
        "起始策略：先針對最嚴重限制 ADL、生活品質或運動參與的疾病設計 ExRx，同時考量個人偏好和目標",
        "或者：採用所有疾病/條件中最保守的 ExRx 起始",
        "了解不同 ExRx 對各健康結果的預期反應大小和時程，以安全、合理地進展訓練",
        "頻繁監測症狀體徵，確保安全和適當的適應與進展"
      ]}
    ]
  },
{
    id:"arthritis", cat:"骨骼肌肉與腫瘤 MSK", name:"關節炎（骨/類風濕）", en:"Arthritis (OA/RA)", page:737, pageStr:"733-738", status:"full", detailed:true,
    aerobic:{f:"3–5 天/週", i:"中強度（40–59% V̇O₂R 或 HRR）至高強度（≥60%）", t:"累積每週 150 分鐘中強度，或 75 分鐘高強度，或等量組合", ty:"低關節壓力活動：走路、騎車、游泳、水中運動"},
    resistance:{f:"2–3 天/週", i:"60–80% 1-RM；對不熟悉阻力訓練者，起始強度降至 50–60% 1-RM", t:"8–12 下，1–3 組，涵蓋所有主要肌群", ty:"機械器材、自由重量、彈力帶、自身體重均適合"},
    flex:{f:"每天", i:"在感受緊繃/伸展感但不引起疼痛的範圍內移動；只有在關節疼痛極少時才增加 ROM", t:"動態動作最多 10 次；靜態維持 10–30 秒，重複 2–4 次", ty:"主動、靜態、PNF 伸展，涵蓋所有主要關節（特別著重受影響的關節與跨關節肌肉）"},
    clinical:[
      {h:"疾病分類與流行病學", items:["關節炎是超過 100 種風濕病的總稱，美國約 23%（5,440 萬）成人有醫師確診的關節炎","最常見的兩型：骨性關節炎（OA）— 退行性、局部滑液關節損傷；類風濕性關節炎（RA）— 慢性全身性自體免疫炎症病",{t:"OA 特性",sub:["好發於手、髖、脊椎、膝關節","危險因子：過重/肥胖、關節受傷/手術史、遺傳、老化、女性、特定職業"]},{t:"RA 特性",sub:["滑膜炎（關節囊腫脹）→ 軟骨與韌帶損傷 → 骨侵蝕","系統性：顯著疲勞、肌肉流失、脂肪增加、骨質疏鬆風險、CVD 風險加速（動脈粥樣硬化）","約 2/3 的 RA 患者有風濕病惡病質（rheumatoid cachexia）：肌肉流失 + 脂肪增加，但體重不變"]}]},
      {h:"運動對關節炎的效益", items:["運動是廣泛且一致被報告能減少疼痛、疲勞、炎症和疾病活動度的介入方式","肌力訓練改善局部（增強動態穩定性、減少關節力）與全身（降低炎症、提升內源性鴉片肽）功能","阻力訓練是藥物無法逆轉的肌肉消耗和脂肪增加的唯一有效對策","降低跌倒風險、改善 CVD/T2DM/代謝症候群/骨質疏鬆的共病"]},
      {h:"運動測試注意事項", items:["急性炎症（關節紅、腫、熱、痛）：高強度運動禁忌，應延後測試","可用腿部或手臂測功儀替代跑步機（疼痛較少），依最不痛苦的方式選擇","測試前提供充分暖身（極輕至輕強度）","用 Borg CR-10 量表監測 RPE，用視覺/數字疼痛量表監測疼痛","肌肉疼痛和腫脹可能因神經抑制而影響最大肌肉收縮"]}
    ],
    special:[
      {h:"急性發炎（flare-up）期間管理", items:["避免劇烈運動；但輕柔地在全範圍活動關節是適當的","急性發炎期間以輕度活動打破久坐行為是允許的"]},
      {h:"疼痛管理與教育", items:["運動後輕微肌肉/關節不適是正常的，不代表關節進一步損傷","運動後 48–72 小時的疼痛加重 = DOMS（延遲性肌肉酸痛），隨訓練適應會逐漸消失","特定運動加重疼痛時：改用相同肌群/能量系統的替代動作","不建議預防性服用止痛藥以參與運動"]},
      {h:"最佳運動時段", items:["安排在一天中疼痛通常最輕時（或止痛藥效果最強時）運動","RA 患者：通常在 2 小時晨僵期後；柔軟度訓練可縮短晨僵時間"]},
      {h:"實務與環境考量", items:["好的鞋具（良好避震和穩定性）對走路類活動特別重要","水中運動：水溫 83–88°F（28–31°C）有助於放鬆、提升 ROM、增加肌肉柔順性、減輕疼痛","功能性訓練（站立坐下、踏階、爬樓梯、提物）可改善 ADL 的神經肌肉控制與平衡","高衝擊活動（跑步、爬樓梯）：無明確證據需要避免，但有明顯生物力學或關節穩定問題者應謹慎"]},
      {h:"進展速度注意事項", items:["嚴重疼痛/功能受限者：接受「低於標準 FITT 的暫時目標」，鼓勵任何安全耐受的運動量","有氧運動時間建議前 4–6 週每 1–2 週增加 5–10 分鐘","阻力訓練：負荷增加速度可比健康成人慢，以最小化局部關節反應"]}
    ]
  },
{
    id:"osteoporosis", cat:"骨骼肌肉與腫瘤 MSK", name:"骨質疏鬆", en:"Osteoporosis", page:799, pageStr:"798-801", status:"full", detailed:true,
    aerobic:{f:"4–5 天/週", i:"中強度（40–59% V̇O₂R 或 HRR）；CR-10 量表 3–4 可能是更合適的強度設定方法", t:"從 20 分鐘開始；漸進至至少 30 分鐘（最大 45–60 分鐘）", ty:"走路、騎車或其他個人化適合的有氧活動（負重活動優先）；低中骨折風險者可加衝擊性運動（跳躍、踏階）"},
    resistance:{f:"從 1–2 天/週非連續日開始；可漸進至 2–3 天/週", i:"調整阻力使最後 2 下具挑戰性；可耐受者高強度高速訓練有益", t:"從 1 組 × 8–12 下開始；約 2 週後增至 2 組；每次 ≤8–10 個動作", ty:"標準器材搭配充分指導與安全考量；複合動作最佳"},
    flex:{f:"5–7 天/週", i:"伸展至緊繃或輕微不適", t:"靜態維持 10–30 秒，每動作重複 2–4 次", ty:"所有主要關節靜態伸展"},
    clinical:[
      {h:"定義與盛行率", items:["骨質疏鬆：全身性骨骼疾病，BMD 降低 + 骨微結構劣化 → 骨折易感性增加","診斷標準（停經女性或 ≥50 歲男性）：腰椎/全髖/股骨頸 BMD T-score ≤-2.5","美國 ≥50 歲成人中約 13% 骨質疏鬆、43% 骨量低（osteopenia）","超過 5,400 萬美國人受影響；髖骨骨折後 1 年死亡率 20–25%；約 50% 永久失能"]},
      {h:"運動對骨骼健康的效益", items:["運動可延緩年齡相關骨質流失，潛在延遲骨質疏鬆發生或降低骨折風險","效益機制：增加骨密度、骨體積、骨強度（尤其是受力骨骼部位）","運動也改善平衡，降低跌倒和後續骨折風險","目前被認為是預防與管理骨質疏鬆的首選非藥物治療","監督式訓練優於自主訓練（骨量、平衡、跌倒預防均較佳）"]},
      {h:"運動測試注意事項", items:["嚴重脊椎骨質疏鬆且走路疼痛/危險者：改用腳踏車測功儀替代跑步機","椎體壓迫性骨折導致身高下降/脊椎變形：可能影響通氣容量及重心前移（影響跑步機平衡）","嚴重骨質疏鬆者：最大肌肉強度測試可能禁忌（骨折風險）","應進行平衡測試或跌倒風險評估（如 POMA 或 Modified FES）"]}
    ],
    special:[
      {h:"骨折風險與運動強度原則", items:["目前無明確的骨質疏鬆運動禁忌指引；一般原則：開立不引起或加重疼痛的中強度負重運動","骨骼強化只發生在受力的部位 → 負重有氧運動和高速阻力訓練是重點","正確姿勢和對位比強度更重要（特別是有骨折史者）","有骨折史者：避免爆發性動作或高衝擊負荷；高骨折風險者特別謹慎"]},
      {h:"脊椎保護（重要）", items:["避免要求過度扭轉、前彎、脊椎壓縮的特定動作或集體課程（如瑜伽、皮拉提斯中的某些動作）","尤其適用於脊椎 BMD 極低或有椎體骨折史者"]},
      {h:"跌倒預防訓練（必要補充）", items:["跌倒是骨折的直接誘因 → 跌倒預防訓練是 ExRx 的必要組成","重點強化肌群：股四頭肌、腿後肌、臀肌、軀幹肌群（主要平衡肌肉）","靜態平衡（如串聯腳站立、單腳站立）和動態平衡（走路、轉向、跨越障礙）均建議","中低骨折風險者：可加入閉眼平衡任務（高風險者不宜）"]},
      {h:"運動的不可或缺性", items:["即使是最虛弱的老年人也應在健康許可範圍內盡量維持 PA","臥床/制動對骨質流失影響迅速而深遠，且復原困難 → 即使短時間的站立或步行也是有益的","個人目標和偏好應納入考量以促進依從性"]}
    ]
  },
{
    id:"sci", cat:"骨骼肌肉與腫瘤 MSK", name:"脊髓損傷", en:"Spinal Cord Injury", page:807, pageStr:"803-812", status:"full", detailed:true,
    aerobic:{f:"最少 2 天/週；漸進至 3 天/週；運動員可增至 3–5 天/週", i:"初學者：中強度（40–59% HRR）；漸進至高強度（75–90% HRR）", t:"初期 5–10 分鐘穿插 5 分鐘主動恢復；漸增至每次 20–40 分鐘（或單純有氧者 30–44 分鐘）；隨進展減少或消除休息期", ty:"活動最多肌群：自主手腳測功儀、FES 下肢結合自主手臂運動、划船、半臥踏步、手臂測功儀、輪椅測功儀/滾輪"},
    resistance:{f:"最少 2 天/週", i:"起始 50% 1-RM；漸進至 80% 1-RM（所有大肌群）", t:"起始 1–2 組 × 8 下；漸進至 3 組 × 10 下", ty:"無障礙阻力機械（方便安全）；或啞鈴、腕部重量、彈力帶；表面 NMES 阻力訓練可用於癱瘓肌群"},
    flex:{f:"每天；關節攣縮、痙攣或頻繁輪椅推進/轉位者尤為必要", i:"伸展不適感 ≤2/10（疼痛量表），不可超過", t:"每肌群反覆伸展 3–4 分鐘/天，最好在熱身後或訓練/競技後", ty:"優先主動伸展；無法主動時可由本人或助理進行低強度被動伸展；站立架也可使用（骨密度注意事項見下方）"},
    clinical:[
      {h:"SCI 分類與常見繼發症", items:["SCI 按損傷平面（頸胸腰薦）與完全性分類（AIS A–D）","最常見：不完全四肢癱（45.8%）、不完全截癱（20.9%）、完全截癱（19.7%）、完全四肢癱（13.2%）","常見繼發症：肩痛、尿路感染、壓瘡、骨質疏鬆、神經性疼痛、痙攣、關節攣縮、憂鬱、焦慮、肥胖、血脂異常、T2DM、CVD"]},
      {h:"損傷平面與心血管反應", items:["T6 及以上：喪失脊髓上位對心臟和血管的自主控制 → 最大心率降低（約 115–130 bpm）、心輸出量和 VO2 peak 均受限","T1–T5：靜息心率可能心動過緩（迷走神經主導）","T1–T5：體溫調節障礙、體位性低血壓、運動後低血壓","C4–C8（四肢癱）：AD 和體位性低血壓風險更高"]},
      {h:"運動測試注意事項", items:["評估功能獨立程度（SCIM 量表）、ROM、肌力（手動肌肉測試）、坐立平衡、輪椅移動能力","選擇能活動最多肌群的測試模式：有顯著下肢功能者用混合手腳測功儀；完全性損傷者用手臂測功儀（有常模）","遞增測試起始：四肢癱者 0 W 起，每階段增加 5–10 W；截癱者每階段 10–25 W","T6 以上者：FES-LEC 測試期間監測 AD 風險；建議備快速降壓藥（硝苯地平/卡托普利/硝化甘油）","最大運動測試後：可能需處理運動後低血壓（臥位、抬腳、補液）"]}
    ],
    special:[
      {h:"自主神經反射異常（AD）— 緊急狀況", items:["AD 定義：T6 及以上患者 SBP 較基線上升 ≥20–40 mmHg（SBP 可高達 250–300 mmHg）","症狀：劇烈頭痛、心跳過緩、皮膚潮紅/起雞皮疙瘩、大量出汗（損傷平面以上）","處理：立即停止運動、扶坐直、找到並移除刺激源（導管阻塞、緊身衣物、支架）","SBP 持續 >150 mmHg：給予降壓藥；SBP 持續上升：立即急診","最常見 AD 誘因：膀胱/腸道充盈 → 運動前清空","「Boosting」（競技用故意誘發 AD）：IPC 禁止，可致腦出血/心梗/猝死"]},
      {h:"強度監控特殊原則", items:["T6 以上患者：HR 無法準確反映心血管強度 → 改用 RPE 或 Talk Test","低靜息 BP（如 90/60 mmHg）常見於高位損傷 → 設定 SBP 監測閾值前需考量個別基線","使用壓力補給褲、彈性腹帶、重力電位床或電刺激腿部肌肉可改善靜脈回流"]},
      {h:"肌肉平衡與肩部保護", items:["抵制過度「推」動作（臥推、托馬斯臂撐）導致胸前和前肩肌過度強化","以「拉」動作平衡訓練（划船、拉背）來強化後肩、後斜方肌、外旋肌","限制不必要的輪椅轉位（增加肩關節接觸力、肩夾擠/旋轉肌腱損傷風險）","四肢癱：絕不拉伸手指屈肌（保存 tenodesis 功能性抓握效果）"]},
      {h:"皮膚與骨骼特殊考量", items:["壓力傷：定期檢查所有高風險部位；薦骨/骨盆 >II 級壓傷需醫療許可才能運動","異位骨化（HO）：臀部最常見，可限制 ROM；影像確認後才考慮 FES/外骨骼訓練","骨質疏鬆：限制或無站立史者承重活動前先做 DXA；T-score <-2.5 或 BMD <0.6 g/cm² 為高風險"]},
      {h:"體溫調節", items:["SCI 患者散熱能力受損（流汗減少），運動時核心體溫上升更快","建議：穿著輕薄衣物、冰背心、防曬霜、噴霧冷卻；避免脫水、缺乏熱適應、醇類和感染"]}
    ]
  },
{
    id:"cancer", cat:"骨骼肌肉與腫瘤 MSK", name:"癌症存活者", en:"Cancer Survivors", page:751, pageStr:"751-753", status:"full", detailed:true,
    aerobic:{f:"3–5 天/週", i:"40–<60% VO₂R 或 HRR；RPE 可協助評估強度（治療中尤適用）", t:"≥30 分鐘/天（無下限）；治療期間因化放療毒性可能需調整", ty:"步行、划船、騎車、游泳、循環訓練（MICT 或 HIIT）；有中央靜脈導管、造口、免疫低下或正接受放療者：禁止游泳"},
    resistance:{f:"2–5 天/週（同肌群間隔至少 48 小時；>3 天/週需分組訓練）", i:"60–80% 1-RM 或 6–15 下可完成；>15 下時加重；不需力竭，可在力竭前 1–2 下停止（RIR 1–2）", t:"≥1 組，每組 ≥6 下，組間休息 ≥60 秒", ty:"8–10 個主要肌群動作；自身體重、機械或自由重量"},
    flex:{f:"2–3 天/週至每天", i:"在疼痛範圍內伸展至緊繃或輕微不適", t:"每個伸展維持 10–30 秒", ty:"靜態伸展（被動/主動），可搭配太極與瑜伽"},
    clinical:[
      {h:"核心原則", items:["所有癌症存活者應盡量保持 PA，避免靜態；在治療期間亦盡可能維持","運動對大多數癌症存活者在治療中和治療後都是安全的","整體建議：每週 ≥150 分鐘中強度有氧或 ≥75 分鐘高強度有氧（或等量組合），加上每週 ≥2 天的全身阻力訓練","評估體適能和關鍵健康問題，針對造成最大病患負擔的問題個別化 ExRx"]},
      {h:"特殊合併症的運動注意事項", items:[
        {t:"骨轉移（Bone metastases）", sub:["選擇避免直接或鄰近轉移部位肌肉骨骼負荷的運動模式","骨痛監測：骨痛加重 → 退階或停止運動；停止後仍持續疼痛 → 轉介醫療團隊"]},
        {t:"周邊神經病變（Neuropathy）", sub:["老年存活者或有嚴重下肢神經病變者：系統性跌倒風險評估","神經病變症狀惡化 → 停止或更換其他運動"]},
        {t:"造口（Ostomy）", sub:["阻力訓練從低阻力緩慢進展","避免接觸運動和造成過度腹內壓的動作（Valsalva）"]},
        {t:"肌少症/惡病質（Sarcopenia/Cachexia）", sub:["強調阻力訓練（高容量：動作×組數×次數×負荷），專注大肌群","有氧運動應減少或不包含，以免加重肌少症"]},
        {t:"骨質疏鬆（治療引起）", sub:["先 2–3 個月阻力訓練基礎，再逐步加入衝擊性負荷（踵落、跳躍等）","疾病/治療驅動的骨量喪失可能對常規阻力訓練反應不佳"]}
      ]}
    ],
    special:[
      {h:"高風險情況下的轉介", items:["出現共濟失調、嚴重疲勞、嚴重貧血（Hb <8 g/dL）、低血小板（<50,000）、低白血球（<3,000）、顯著衰弱或任何惡化症狀時 → 轉介臨床運動生理師、物理治療師或腫瘤科醫師","活躍治療中、轉移性癌症或有重大健康問題者：建議多學科團隊協作（運動專業人員＋臨床運動生理師＋物理治療師＋腫瘤科）"]},
      {h:"個別化與優先順序", items:["健康/體適能評估用於確認關鍵問題，ExRx 針對造成最大病患負擔的問題設計","同時考量患者的能力、偏好、財力、監督和設施可及性","應盡可能在治療期間和治療後都維持某種形式的 PA"]}
    ],
  acsm11:{
    pageStr:"601-602",
    blocks:[
      {h:"11版阻力訓練頻率上限差異（PDF p601-602）",body:"11版阻力訓練頻率為 2-3 d/wk（間隔至少 48 小時）；12版提高上限至 2-5 d/wk（超過 3 天/週時需分組訓練，同肌群仍需 48 小時間隔）。",list:["11版：2-3 d/wk（間隔 ≥48 小時）","12版：2-5 d/wk（>3 天/週需分組；同肌群 ≥48 小時）"]},
      {h:"11版阻力訓練最少次數差異（PDF p602）",body:"11版規定每組至少 8 下；12版降低至每組至少 6 下。",list:["11版：≥1 組 × ≥8 下/組","12版：≥1 組 × ≥6 下/組"]}
    ]
  }
  },
{
    id:"fibromyalgia", cat:"骨骼肌肉與腫瘤 MSK", name:"纖維肌痛", en:"Fibromyalgia", page:764, pageStr:"764-765", status:"full", detailed:true,
    aerobic:{f:"從 1–2 天/週開始；漸進至 2–3 天/週", i:"從輕度 30–39% VO₂R 或 HRR 開始（RPE 9）；漸進至中強度 40–59%（RPE 9–12）", t:"從 10 分鐘/天開始；漸進至 30–60 分鐘/天（依耐受度）", ty:"低衝擊活動：水中運動、走路、配樂有氧/舞蹈、游泳、騎車"},
    resistance:{f:"2–3 天/週，每次間隔至少 48 小時", i:"40–80% 1-RM；力量：40%→60%→60–80% 1-RM 漸進；肌耐力：≤50% 1-RM；用 OMNI-RES 1–4（0–10 量表）", t:"力量：從 4–5 下漸進至 8–12 再到 15 下，1 組→2–4 組，組間休息 2–3 分鐘；肌耐力：15–20 下，1–2 組，較短休息", ty:"自身體重、彈力帶、啞鈴、腕踝重量、機械；水中可用增加渦流阻力的器材"},
    flex:{f:"2–3 天/週", i:"在疼痛範圍內伸展至緊繃", t:"靜態維持 10–30 秒，×2–4 次；另含 8–10 個動態低強度低幅度活動度訓練（5–10 分鐘/次）", ty:"靜態伸展（被動/主動）；可加入動態活動度訓練"},
    clinical:[
      {h:"疾病特性", items:["纖維肌痛是慢性全身性疼痛症候群，伴隨疲勞、睡眠障礙、認知問題和情緒困擾","疼痛敏感化（central sensitization）是核心機轉；各種感覺刺激（壓力、聲音、溫度）均可能誘發痛覺","有氧、阻力和混合訓練在症狀管理上效果相等（水中或陸地均可）"]},
      {h:"運動強度自我調節", items:["教導患者根據症狀自我調節強度（self-regulation）","RPE 特別適用於症狀爆發（flare）期間的強度控制","強度進展應根據「運動後症狀狀況」決定（而非固定時程）","教導腹式呼吸，避免 Valsalva 動作"]},
      {h:"運動前後原則", items:["每次運動結束時加入伸展、呼吸練習和放鬆技巧","教導正確動作力學，提供示範影片或單張，減少受傷和疼痛風險","症狀最少時才運動（有晨僵者避免早晨運動）"]}
    ],
    special:[
      {h:"「從低慢進」是核心原則", items:["初期可能症狀短暫加重（最初幾天至幾週），直到運動適應後才改善","初期優先維持低強度和高頻率，以建立規律性；之後才降頻率提強度","若症狀爆發：優先降低強度或時間，再考慮降低頻率；目標是維持某種程度的 PA","改善通常需要超過 7 週才會出現臨床顯著且個人可感受到的效果，需設定現實目標"]},
      {h:"水中運動特殊考量", items:["水中運動水溫建議 33–36°C（91–97°F），以提升舒適度和最大化表現","混合水中與陸上訓練均被證明有效"]},
      {h:"社會支持與依從性", items:["早期監督或團體課程可提供社交支持，有助於依從性","長期目標是培養自主運動能力，不依賴監督"]}
    ],
  acsm11:{
    pageStr:"615-616",
    blocks:[
      {h:"11版柔軟度未列動態活動度訓練（PDF p615-616）",body:"11版柔軟度說明為靜態伸展（被動/主動）加上『動態伸展亦可使用』，未有具體動態 ROM 訓練規範。12版新增：每次訓練含 8-10 個低強度低幅度動態活動度動作（5-10 分鐘）。",list:["11版：靜態伸展為主；動態伸展可使用（無具體次數/時間）","12版：靜態 10-30 秒 × 2-4 次 + 8-10 個動態活動度訓練（5-10 min/次）"]}
    ]
  }
  },
{
    id:"mecfs", cat:"骨骼肌肉與腫瘤 MSK", name:"肌痛性腦脊髓炎/慢性疲勞", en:"ME/CFS", page:773, pageStr:"766-773", status:"full", detailed:true,
    aerobic:{f:"無/輕度：從 1 次/週開始，監測 PEM，漸進至最多 3 次/週；中/重度：禁忌", i:"嚴格維持低於 VAT 心率（需 HR 監控器），避免超過可持續範圍", t:"每次持續時間不超過 90 秒，組間需完全恢復（工作:休息比 1:3 以上）", ty:"從去重力肢體動作開始（仰臥），依耐受進展至對抗重力；中/重度禁忌；嚴重：完全禁忌"},
    resistance:{f:"從 1 次/週開始；漸進至 2–3 次/週（依 PEM 耐受度）", i:"從 1 組 × 2–3 下開始；漸進至 2 組 × 4–6 下；使用 HR 監控確保低於 VAT 心率", t:"每次動作持續時間需在 PEM 耐受範圍內；組間完全恢復", ty:"從被動 ROM 開始，漸進至主動 ROM；避免引發 PEM"},
    flex:{f:"依耐受頻率（視 PEM 反應調整）", i:"被動無痛 ROM（中段範圍內）；依耐受進展至主動 ROM；維持 HR 低於 VAT", t:"依個人耐受度，不引發疼痛和 PEM", ty:"被動伸展和主動 ROM（無/輕度）；被動無痛 ROM（重度）；嚴重：被動無痛中段 ROM 只"},
    clinical:[
      {h:"ME/CFS 核心病理：PEM", items:["ME/CFS 核心特徵：運動後倦怠（Post-Exertional Malaise, PEM）","PEM 定義：體力或認知消耗後出現症狀惡化，恢復時間 ≥24 小時（可長達 2 週）","嚴重程度分類：輕/輕中/中重/嚴重（見 Table 10.5），用 VO₂peak 和 VAT 評估","2-天 CPET（第二天心肺功能測試）是 ME/CFS 的客觀標誌：第二天 VO₂peak 和 VAT 顯著下降（有別於一般失調者）"]},
      {h:"步調管理（Pacing）原則", items:["步調管理 = 刻意平衡活動與休息（非治癒，但有助症狀管理）","「能量信封」概念：維持 ADL 強度在當下可用能量範圍內，避免超支","HR 生物回饋：VAT 心率是「可持續/不可持續」活動的閾值；建議維持 HR < VAT（最好用第二天 CPET 的 VAT 設定）","症狀日誌：記錄活動與症狀，識別觸發 PEM 的原因（注意症狀延遲出現）"]},
      {h:"運動測試特殊原則", items:["非所有患者都需要運動測試；用於鑑別診斷、評估運動反應和失能程度","測試前避免預疲勞；用電子制動式腳踏車測功儀","年齡預測最大 HR 的次最大測試，對 ME/CFS 患者可能是「最大測試」（因心跳時間反應不全）","測試後密切監測：HR、BP、心電圖、SpO₂ 和恢復時間"]}
    ],
    special:[
      {h:"ExRx 最重要的安全原則", items:["標準漸進式 ExRx 對 ME/CFS 可能有害，即使輕度患者（有氧能量系統可能無法在兩次之間正常恢復）","運動不應以「治癒」方式呈現；清楚說明風險與效益","在達到穩定功能基線（通過 pacing）之前，不建議增加 PA","每次 ExRx 進展都需要充分觀察 PEM 是否出現（步驟間需要長的等待時間）"]},
      {h:"實際執行指引", items:["最初從橫膈膜呼吸和被動 ROM 開始；可耐受後，才考慮用 HR 生物回饋進展","運動課程不應以犧牲 ADL 為代價","監控 PEM 觸發因素：包括運動計畫外的身體、認知、情緒和環境刺激","建立強治療同盟，確保患者能自主調整計畫，而非被動服從"]}
    ]
  },
{
    id:"hiv", cat:"骨骼肌肉與腫瘤 MSK", name:"HIV 感染", en:"HIV", page:778, pageStr:"775-780", status:"full", detailed:true,
    aerobic:{f:"3–5 天/週", i:"從低強度 30–39% VO₂R 或 HRR 開始（適應期）；漸進至中強度 40–59% 或高強度 60–70%", t:"從 10 分鐘增量開始；漸進至 30–60 分鐘/天；目標 ≥150 分鐘/週", ty:"依健康狀態與興趣選擇；有骨質疏鬆時謹慎監測高衝擊或增強式活動"},
    resistance:{f:"2–3 天/週", i:"從輕強度開始；目標漸進至 60% 1-RM", t:"1–2 組漸進至 3 組 × 8–10 下（初期謹慎進展，避免受傷）", ty:"機械重量安全有效（不需監督）；初期指導後可用自由重量或彈力帶；鼓勵包含平衡訓練的動作"},
    flex:{f:"≥2–3 天/週", i:"伸展至緊繃或輕微不適", t:"靜態維持 30–60 秒，×2–4 次", ty:"運動後靜態伸展；運動前動態伸展"},
    clinical:[
      {h:"HIV 與共病風險", items:["ART（抗反轉錄病毒療法）已將 HIV 轉為可管理的慢性病；PWH（HIV 感染者）壽命接近一般人","HIV 和 ART 可促進血脂異常、腹部肥胖伴皮下脂肪喪失、胰島素抵抗、肌少症（sarcopenia）","早期 ART 者肥胖盛行率上升；PWH 也有較高的持續性低度發炎","≥50 歲 PWH：83% 有至少一種共病；18–49 歲 PWH：63% 有至少一種共病","HIV 可視為額外的 CVD 風險因素"]},
      {h:"運動效益", items:["運動安全且有效：改善心血管健康、肌力/肌肉量、骨密度、生活品質、體組成","增加 PA 分鐘數與減少疲勞相關（疲勞是 PWH 最常報告且嚴重的症狀）","運動不會抑制免疫功能；反而改善免疫功能","心血管適應可能需要比一般人更長時間；高強度或間歇訓練可能需要達到相同效益"]},
      {h:"運動測試注意事項", items:["HIV 病史、AIDS 或周邊神經病變者：調整測試模式（腳踏車測功儀 vs 跑步機）","PWH 可能有較低 VO₂peak 和更多 chronotropic incompetence","AIDS/晚期 HIV：可能有顯著的運動時間限制","心律不整風險較高：最大運動測試建議 ECG 監測"]}
    ],
    special:[
      {h:"ART 藥物副作用對運動的影響", items:["有 AIDS 病史、早期核苷逆轉錄酶抑制劑（NRTIs）暴露史或長期 ART 者：較高的周邊神經病變、粒線體損傷、運動不耐受風險","這些狀況可能需要調整運動類型、強度、時間和 ROM","高藥物負擔者可能在運動期間或之後報告更多副作用"]},
      {h:"骨骼健康與平衡", items:["骨質疏鬆/骨質減少盛行率高：應鼓勵承重阻力訓練以改善骨密度","已知骨質疏鬆（尤其有非創傷性骨折史）：高衝擊和增強式活動需密切監督","≥50 歲 PWH 平衡障礙、周邊神經病變和跌倒盛行率高 → 應包含平衡訓練；年輕者依個別風險考慮"]},
      {h:"其他要點", items:["HIV 無特定運動禁忌症；所有 PWH 任何診斷階段均強力推薦運動","多重共病或嚴重失調者：建議諮詢運動專業人員","較小的運動間歇（多次短時間）對忙碌者較易執行，且仍提供健康效益","定期監測心血管健康和體適能效益，支持臨床管理"]}
    ],
  acsm11:{
    pageStr:"623-624",
    blocks:[
      {h:"11版有氧強度上限（PDF p624）",body:"11版有氧強度只進展至中強度（40–59% VO₂R/HRR），未包含高強度。12版新增「高強度 60–70% VO₂R/HRR」作為進階選項。",list:["11版：light 30–39% → moderate 40–59% VO₂R/HRR（無高強度）","12版：加入 high intensity 60–70% VO₂R/HRR 作為進階"]},
      {h:"11版柔軟度靜態維持時間（PDF p624）",body:"11版每次靜態伸展維持 10–30 秒；12版增加至 30–60 秒，提高最低維持時間。",list:["11版：靜態維持 10–30 秒（×2–4 次）","12版：靜態維持 30–60 秒（×2–4 次）"]}
    ]
  }
  },
{
    id:"kidney", cat:"骨骼肌肉與腫瘤 MSK", name:"腎臟病", en:"Kidney Disease", page:785, pageStr:"781-788", status:"full", detailed:true,
    aerobic:{f:"3–5 天/週（每週運動分散在至少 3 天，連續兩天不超過為上限）", i:"至少中強度（40–59% VO₂R；RPE 12–13）；高強度（>60% VO₂max）可獲得額外效益", t:"目標 30 分鐘連續（最多 60 分鐘）；初期無法連續者可用間歇：3 分鐘運動＋3 分鐘休息（1:1），初始總共 15 分鐘", ty:"大肌群節律性有氧活動（步行、騎車、游泳）"},
    resistance:{f:"2–3 天/週（非連續日，理想 3 次/週）", i:"65–75% 1-RM（晚期 CKD 禁做 1-RM 測試，改用 ≥3-RM 估算）", t:"1–3 組 × 8–12 下；選擇 8–12 個涵蓋主要肌群的動作", ty:"器械、自由重量或彈力帶；每次課程涵蓋上下肢主要肌群"},
    flex:{f:"5–7 天/週", i:"靜態：伸展至緊繃或輕微不適；PNF：最大自主收縮的 20–75%", t:"靜態：每關節 60 秒（每次伸展 10–30 秒）；PNF：3–6 秒收縮後接 10–30 秒輔助伸展", ty:"靜態或 PNF 伸展"},
    clinical:[
      {h:"CKD 分期與特性", items:["CKD 依 eGFR 和尿液白蛋白分為 5 期；Stage 5（eGFR <15）接近需腎臟替代治療（血液透析/腹膜透析/腎臟移植）","CKD 患者 VO₂peak 約 15–25 mL/kg/min（健康同齡者的 50–80%）；訓練可提升約 17–23% 但通常無法到達正常值","功能低下原因：久坐、心臟功能障礙、貧血、肌肉骨骼功能障礙","CVD、高血壓、DM 是 CKD 最常見共病，且隨 CKD 嚴重度增加"]},
      {h:"運動測試注意事項", items:["3 個月未規律運動者：先取得醫療許可","CVD 確診或有症狀者：運動測試作為醫療許可流程的一部分","終末期腎臟病（Stage 5）和/或虛弱者：運動測試可能是不必要的參與障礙","透析患者：測試應安排在非透析日；測 BP 用無廔管的手臂","血液透析患者：HRpeak 常被抑制（可能不超過年齡預測最大 HR 的 75%）→ 同時監測 RPE"]}
    ],
    special:[
      {h:"各類型腎臟病患者特殊考量", items:[
        {t:"非透析 CKD（Stage 1–4）", sub:["可耐受與一般人相近的強度/量，但需適當篩查、從低到中強度開始、緩慢進展","極度失調者：先從柔軟度和低負荷高次數阻力開始，再加有氧"]},
        {t:"血液透析（Hemodialysis）", sub:["透析中運動（intradialytic）和透析間運動均可，透析中依從性通常更高","透析後多數人沒有精力運動；有能力的話可運動，建議先吃點心","上肢：有暫時或癒合中的動靜脈廔管者避免上肢活動；成熟永久廔管可運動，但避免壓重量","透析中運動：用 RPE 監控強度（透析中移除液體會使 HR 難以預測）","1-RM 測試：因繼發性副甲狀腺亢進相關骨/關節問題不建議"]},
        {t:"腹膜透析（Peritoneal Dialysis）", sub:["避免完整仰臥起坐和全髖屈曲動作（腹腔導管考量）；可用等長收縮和部分捲腹代替","游泳有感染風險：需護蓋導管、游泳後清潔；不建議湖泊游泳","腹腔有液體時運動較不舒適 → 排空後再運動以減少橫膈膜壓力"]},
        {t:"腎臟移植受者", sub:["移植後體重管理常成為重要議題","患者常害怕過度努力 → 強調漸進進展","排斥期間：降低強度和時間（非完全停止）","移植後第一年可能頻繁住院；免疫抑制 → 嚴格消毒設備，避免感染"]}
      ]}
    ],
  acsm11:{
    pageStr:"630-631",
    blocks:[
      {h:"11版柔軟度頻率差異（PDF p630）",body:"11版柔軟度訓練頻率為 2–3 d/wk；12版大幅增加至 5–7 d/wk（幾乎每天）。",list:["11版：2–3 d/wk","12版：5–7 d/wk"]},
      {h:"11版阻力訓練次數差異（PDF p630）",body:"11版規定組數目標為「最少 1 組，漸進至多組 × 10–15 下」；12版具體化為 1–3 組 × 8–12 下。",list:["11版：最少 1 組 × 10–15 下 → 漸進至多組；動作數 8–10 個","12版：1–3 組 × 8–12 下；動作數 8–12 個"]},
      {h:"11版有氧強度範圍（PDF p630）",body:"11版有氧強度規定為中強度（40–59% VO₂R，RPE 12–13），未提及高強度選項。12版新增「高強度 >60% VO₂max 可獲得額外效益」。",list:["11版：中強度 40–59% VO₂R（RPE 12–13）","12版：中強度 40–59%；高強度 >60% VO₂max 可獲額外效益"]}
    ]
  }
  },
{
    id:"ms", cat:"骨骼肌肉與腫瘤 MSK", name:"多發性硬化症", en:"Multiple Sclerosis", page:795, pageStr:"790-797", status:"full", detailed:true,
    aerobic:{f:"2–5 天/週", i:"40–70% HRR 或 VO₂R；RPE 12–15", t:"先從 10 分鐘/天開始，漸進至 30–60 分鐘（依耐受度）", ty:"大肌群節律性活動（步行、騎車、游泳）"},
    resistance:{f:"2 天/週", i:"60–80% 1-RM", t:"從 1 組開始，漸進至 2 組 × 10–15 下", ty:"多關節與單關節動作；器械、自由重量、彈力帶或徒手"},
    flex:{f:"5–7 天/週，每天 1–2 次", i:"伸展至緊繃或輕微不適", t:"靜態維持 30–60 秒，每動作重複 2–4 次", ty:"靜態伸展；痙攣明顯時可進行低負荷姿勢性拉伸（數分鐘至數小時）"},
    clinical:[
      {h:"疾病特性與常見症狀", items:["MS 是中樞神經系統脫髓鞘疾病；Kurtzke EDSS 0–10 分量化功能障礙程度","最常見症狀：疲勞（最常見且最衰弱化）、行動障礙、痙攣、疼痛、認知損傷、膀胱/腸道功能障礙、憂鬱、視覺障礙","熱敏感性（heat sensitivity）：體溫升高可暫時加重症狀（視力模糊、感覺/運動症狀）","失用性體適能下降：因症狀而減少 PA → 有氧能力下降 → 疲勞惡化（負向循環）"]},
      {h:"運動效益（輕到中度障礙者）", items:["有氧訓練改善 CRF、步行速度與耐力；阻力訓練改善肌力","混合訓練改善健康相關生活品質與憂鬱症狀","中等品質證據：有氧及混合訓練可改善疲勞（比無運動組）","EDSS ≥6.0 者：阻力訓練可改善肌肉適能、平衡、疲勞、生活品質"]},
      {h:"運動測試特殊考量", items:["急性惡化期或復發期：避免測試","測試時機：一天中較早（疲勞通常下午更重）","環境：氣候控制房間（22.2–24.4°C、低濕度）；備電扇或冷頸包","模式：腳踏車測功儀為首選（比跑步機需要更少平衡與協調）；非步行者用手臂測功儀","HR 可能因自主神經功能障礙而反應遲鈍 → 同時使用 RPE","嚴重輕癱者：用 OMNI 量表（0–10）分別評估各肢體 RPE"]}
    ],
    special:[
      {h:"熱管理（最重要的安全考量）", items:["體溫升高（甚至 0.5°C）可暫時加重感覺與運動症狀，尤其視力障礙","預防策略：冷卻背心、冷頸包、電扇、噴霧、排汗衣物；可於運動前預冷","若症狀惡化：立即停止運動並降溫；降溫後通常恢復（暫時性 Uhthoff 現象）","因膀胱問題限制飲水者：應鼓勵補充液體，預防脫水與高熱"]},
      {h:"疲勞管理", items:["區分「中樞性 MS 疲勞」（疾病本身）與「周邊性運動後疲勞」（正常反應）","調整阻力訓練：疲勞或明顯輕癱者，組間休息 2–5 分鐘；專注大肌群、減少總動作數","初始以增加時間為主（先達 10 分鐘/天），再漸進強度"]},
      {h:"復發/惡化期與痙攣", items:["輕度復發：按耐受度降低 FITT；維持功能性移動力、有氧和柔軟度訓練","嚴重復發：任何運動都可能過於困難，暫停並等待穩定","痙攣者：非常低強度、低速或無負荷騎車有助緩解；明顯攣縮需長時間低負荷姿勢性拉伸"]},
      {h:"認知與藥物因素", items:["認知損傷者：需書面說明、頻繁口頭提醒與強化","疾病修飾藥物（干擾素 β-1a、glatiramer acetate）副作用：類流感症狀、情緒改變、肝功能異常 → 依副作用狀況調整訓練時間"]}
    ]
  },
{
    id:"anxiety", cat:"神經與心理 Neuro/Psych", name:"焦慮", en:"Anxiety", page:854, pageStr:"850-856", status:"full", detailed:true,
    aerobic:{
      f:"≥3 天/週",
      i:"高強度（60–80% HRmax 或 70% V̇O₂max）效果更佳；建議個別化漸進計畫（從走路進展至跑步），搭配監督",
      t:"20–30 分鐘起；進展至 60–90 分鐘效果更大",
      ty:"大肌群節律性活動（走路、騎車、跑步）"
    },
    resistance:{
      f:"≥2 天/週",
      i:"初學者：50–60% 1-RM 或 RT-specific RPE ≥5；進階者：60–75% 1-RM 或 RPE 6–10",
      t:"初學者：≥2 組 × 8–10 下，組間休息 90–150 秒；進階者：≥3 組 × 6–15 下，自選休息",
      ty:"初學者優先機械式器材（上肢多於下肢）；進階者機械或自由重量皆可；由小肌群漸進至大肌群"
    },
    flex:{
      f:"≥3 天/週，每天最佳",
      i:"全身伸展至輕微不適感",
      t:"靜態維持 10–30 秒，每動作重複 2+ 次，每次至少 10 分鐘",
      ty:"所有主要肌群慢速靜態伸展；瑜伽；皮拉提斯"
    },
    clinical:[
      {h:"流行病學", items:[
        "全球逾 2.5 億人患有焦慮症（WHO），盛行率近十年持續上升",
        "美國成人終生盛行率 >33%；每年 >21% 經歷焦慮症",
        "45–60% 患者未接受治療，許多人對第一線治療反應不佳"
      ]},
      {h:"運動對焦慮的效益", items:[
        "運動有效降低焦慮症狀，無論有無焦慮症診斷或其他醫學共病皆適用",
        "焦慮症患者：運動可單獨使用，也可與其他治療合用；症狀嚴重程度不影響效果",
        "達到 2018 PA 指引（150 分鐘中強度/週 或 75 分鐘高強度/週）即足以降低焦慮"
      ]},
      {h:"運動測試注意事項", items:[
        "建議次最大運動測試（體能差、自我效能低、動機不足）",
        "常用：6 分鐘步行測試（6-MWT）、Franzer 腳踏車測試",
        "測試前篩查藥物：苯二氮平類（benzodiazepines）可造成嗜睡、協調性下降、兒茶酚胺反應降低",
        "焦慮症患者血壓反應可能輕度受損；廣泛性焦慮症：HRV 降低",
        "女性焦慮症患者（無冠心病史）：運動測試時缺血風險增加，需注意"
      ]}
    ],
    special:[
      {h:"恐慌發作（Panic Disorder）", items:[
        "運動可誘發類似恐慌發作的生理反應（HR 升高、呼吸急促）",
        "應事先告知已知恐慌症患者這是正常的運動生理反應，避免恐慌加劇"
      ]},
      {h:"劑量原則", items:[
        "任何運動量都優於不動；達到建議水準效果最佳",
        "高強度有氧比中低強度對焦慮的立即改善效果更顯著"
      ]},
      {h:"依從性與監督", items:[
        "提供監督與支持（尤其是漸進計畫初期）以提升依從性",
        "多模式治療（運動合併其他治療）對有其他醫療共病者效果與單獨運動相近"
      ]}
    ],
  acsm11:{
    pageStr:"715-717",
    blocks:[
      {h:"11版無具體阻力 FITT 表（PDF p715-717）",body:"11版焦慮運動處方以文字敘述（研究回顧）為主，未提供阻力訓練的具體 FITT 數值，僅引用一般成人 PA 指南。12版首次建立阻力 FITT（50-60% 1-RM 起始，進階至 60-75% 1-RM）。",list:["11版：有氧頻率 3-4 次/週效果最佳；高強度 60-90% HRmax 比低強度更有效","11版：無具體阻力 FITT 表（僅一般成人 2 次/週肌力建議）","12版：阻力 ≥2 d/wk；50-60% 1-RM（初學）→ 60-75% 1-RM（進階）"]}
    ]
  }
  },
{
    id:"depression", cat:"神經與心理 Neuro/Psych", name:"憂鬱", en:"Depression", page:855, pageStr:"850-856", status:"full", detailed:true,
    aerobic:{
      f:"持續 ≥13 天的計畫效果更佳；對憂鬱症患者，累計頻率比無憂鬱症者更重要",
      i:"任何強度均有效；中至高強度研究最多，但各強度均優於不動",
      t:"≥20 分鐘即有立即情緒效果；憂鬱症患者建議每次 45 分鐘",
      ty:"有氧與阻力訓練均有效；合併訓練（combo-training）可能有加乘效益"
    },
    resistance:{
      f:"≥2 天/週（最佳頻率仍待研究）",
      i:"依標準 ACSM 阻力訓練指引漸進（最佳抗憂鬱劑量仍待研究）",
      t:"尚無充分證據支持特定時間建議",
      ty:"有氧與阻力訓練合併使用可能有加乘效益"
    },
    flex:{
      f:"尚無充分頻率建議",
      i:"—",
      t:"—",
      ty:"伸展、冥想、放鬆技巧對憂鬱症狀有效，但效果不及有氧/阻力訓練"
    },
    clinical:[
      {h:"流行病學", items:[
        "全球逾 3 億人患有憂鬱症（WHO），盛行率近十年持續上升",
        "美國成人終生盛行率 21%；每年 >10% 經歷情緒疾患",
        "美國每年心理健康支出超過 2010 億美元，超過癌症、心臟病、糖尿病等任何單一疾病"
      ]},
      {h:"運動對憂鬱的效益", items:[
        "有/無臨床憂鬱診斷者均有效降低憂鬱症狀",
        "憂鬱症患者：運動效果與心理治療（psychotherapy）或藥物治療相當",
        "合併標準治療時，運動具加乘效果",
        "任何強度的身體活動均優於不動（可降低憂鬱風險）",
        "在高齡者（含輕度認知障礙，MCI）也有觀察到抗憂鬱效果"
      ]},
      {h:"運動測試注意事項", items:[
        "建議次最大運動測試（體能差、低動機、能量不足）",
        "常用：6 分鐘步行測試（6-MWT）",
        "測試前篩查藥物：苯二氮平類可造成嗜睡、協調性下降",
        "注意：運動生理反應（HR 升高、喘氣）可類似恐慌發作，需事先告知"
      ]}
    ],
    special:[
      {h:"自殺風險（Suicidality）— 最重要", items:[
        "憂鬱症的關鍵危機：自殺意念、計畫或行動",
        "運動雖不改變自殺意念，但與自殺嘗試風險降低 77% 有關",
        "若個案描述或實行傷害自己的計畫，應立即協助聯繫緊急救援",
        "台灣自殺防治專線：1925（安心專線）；美國：988 Suicide & Crisis Lifeline"
      ]},
      {h:"臨床轉介原則", items:[
        "運動專業人員不應嘗試診斷憂鬱症",
        "懷疑有憂鬱症的個案應轉介持照心理健康專業人員進行評估與治療計畫",
        "支持性傾聽與表達關心，有助個案接受轉介"
      ]},
      {h:"行為依從性挑戰", items:[
        "憂鬱症患者對獎勵的敏感性降低 → 維持 PA 計畫更困難",
        "建議補充自我調節支持工具（數位工具、行為改變策略）",
        "找到患者能持續進行的活動最重要；有氧與阻力訓練皆可納入",
        "運動的急性效果（立即改善情緒）可作為動機切入點"
      ]}
    ]
  },
{
    id:"adhd", cat:"神經與心理 Neuro/Psych", name:"注意力不足/過動症", en:"ADHD", page:863, pageStr:"860-864", status:"approx", detailed:true,
    aerobic:{f:"依年齡：兒童/青少年見 Chapter 6；成人見 Chapter 5（多數天/週）", i:"從中等強度開始；達到中等體能適能後可考慮 HIIT", t:"依一般成人/兒童建議漸進", ty:"開放性技巧活動（足球、網球、羽球）或封閉性技巧（跑步、腳踏車、游泳）均有效"},
    resistance:{f:"依一般成人/兒童建議", i:"依耐受度漸進", t:"依一般成人/兒童建議", ty:"功能性動作模式；多樣性訓練"},
    flex:{f:"依需要", i:"舒適範圍", t:"30 s 靜態", ty:"靜態伸展"},
    clinical:[
      {h:"ADHD 背景與運動益處", items:[
        "ADHD：全球兒童/青少年盛行率 5%，成人約 2.5–3.4%；男孩比例為女孩 2–3:1",
        "約 65% 的兒童 ADHD 延續至成年",
        "PA 改善 ADHD 核心症狀：(1) 注意力（inattention）→ WHO 2020 指南強力支持 PA 改善注意力；(2) 衝動控制（cognitive inhibition）",
        "PA 也改善執行功能（計劃、組織）、睡眠品質（ADHD 常伴睡眠障礙）",
        "ADHD 常見共病：肥胖、高血壓、憂鬱/焦慮 → 運動可同時改善這些共病",
        "多數 ADHD 患者可在無事先醫學篩查下開始中等強度運動"
      ]}
    ],
    special:[
      {h:"運動處方考量", items:[
        "低體能適能在 ADHD 中常見 → 起始應緩慢、設定現實目標",
        "發展協調障礙（DCD）在 ADHD 常見 → 複雜需要特定動作技巧的活動（如舞蹈）需更漸進方式導入",
        "提高依從性的策略：選擇有趣和刺激的活動、正向回饋、小組訓練（增進社交技能）",
        "HIIT：在達到中等體能水平後可考慮，短時間高強度有助於提升注意力和專注",
        "運動課的特徵：有結構、事先計劃、融入例行生活、由運動專家帶領或在團體環境中進行、每天有明確的特定可衡量目標"
      ]},
      {h:"藥物互動", items:[
        "PA 通常作為藥物治療的補充，而非替代",
        "運動可增強刺激劑（methylphenidate）對 ADHD 臨床症狀、認知功能和大腦活動的效果",
        "建議 ADHD 患者與主治醫師討論藥物劑量及如何與運動計畫互動；可能需要調整劑量"
      ]}
    ]
  },
{
    id:"autism", cat:"神經與心理 Neuro/Psych", name:"自閉症", en:"Autism Spectrum Disorder (ASD)", page:866, pageStr:"866-875", status:"approx", detailed:true,
    aerobic:{f:"逐步進展至一般族群建議（≥3 次/週）；非活動者先從每次 10 分鐘輕至中強度開始", i:"從輕至中強度開始漸進", t:"從 10 分鐘/次漸進；程式 ≥2 週、每次 ≥90 分鐘、每週 ≥3 次對改善 ASD 特徵更有效", ty:"Type A（步行、緩慢騎車）或 B（慢跑、划船、橢圓機）最適合有動作缺陷者；Type D（足球、籃球）不應被排除（提供社交化機會）"},
    resistance:{f:"逐步進展至一般族群建議（2–3 天/週）", i:"從輕強度開始漸進", t:"依個人耐受度和技能水平", ty:"適應設備和活動以配合可能的動作缺陷（協調、平衡、肌力）"},
    flex:{f:"依需要", i:"舒適範圍", t:"30 s 靜態", ty:"靜態伸展"},
    clinical:[
      {h:"ASD 背景與運動益處", items:[
        "ASD：複雜的神經和發展性疾病；美國盛行率 1/36 兒童",
        "核心特徵：社交溝通差異、受限/重複行為；常見共病：癲癇、腸胃疾病、代謝疾病、ADHD、焦慮、憂鬱、動作缺陷",
        "運動/動作是 ASD 28 項循證實踐之一，對社交/溝通技能、聯合注意力、認知、行為挑戰和動作技能均有中至大效果",
        "ASD 患者達到 PA 指南的比例低於一般人（PA 的身體、社交、感覺和動態要求可能與 ASD 特徵衝突）",
        "≈40% ASD 個體合併智能障礙（ID）→ 可同時參考 ID 相關指引"
      ]}
    ],
    special:[
      {h:"運動環境調整", items:[
        "感覺處理問題（hypersensitivity）：了解個案的感覺需求，調整健身房噪音、燈光等環境",
        "可預測性：每次訓練/測試以可預測方式組織空間",
        "社交環境：個案可能偏好個人、平行、或小組活動；考量社交需求",
        "新環境可能造成焦慮 → 緩慢轉移至新環境，給予充足時間適應"
      ]},
      {h:"循證實踐應用", items:[
        "視覺支持（visual supports）：視覺時間表幫助強化例行程序",
        "任務分析（task analysis）：將活動分解為小的可管理步驟；在測試和教學前可能必要",
        "提示（prompting）：語言（簡潔具體）、手勢、肢體提示均可用",
        "示範（modeling）和影片示範：提供活動/技能的視覺模型",
        "正增強（reinforcement）：給予正向增強，詢問個案/監護人偏好的增強物",
        "提供規律的休息（疲勞、感覺輸入、社交互動均可能需要休息）",
        "藥物副作用（精神科藥物）：體重增加、疲勞、鎮靜 → 影響運動表現和意願"
      ]}
    ]
  },
{
    id:"intellectual_disability", cat:"神經與心理 Neuro/Psych", name:"智能障礙/唐氏症", en:"Intellectual Disability + Down Syndrome", page:887, pageStr:"887-892", status:"full", detailed:true,
    aerobic:{f:"每週大多數天（≥3 天/週）", i:"中至高強度：40–80% VO₂peak，漸進提升", t:"30–60 分鐘/天；可分次 10–15 分鐘間歇替代", ty:"步行類活動、游泳、手腳測功儀、舞蹈"},
    resistance:{f:"大多數天（至少 2–3 天/週）", i:"60–70% 1-RM（6–12 下）；漸進至 70–80% 1-RM（10–12 下）", t:"2–3 組", ty:"優先機器/纜繩控制器材"},
    flex:{f:"大多數天（至少 2–3 天/週）", i:"靜態牽拉至輕微不適感", t:"靜態伸展 10–30 秒，每動作重複 2–4 次", ty:"靜態伸展"},
    clinical:[
      {h:"慢性病風險與運動背景", items:[
        "ID 和 DS 個體的 CRF（心肺適能）顯著低於一般人，DS 缺損尤大",
        "自律神經功能異常（chronotropic incompetence, CI）：DS 患者交感（低兒茶酚胺反應）及副交感（低基礎迷走張力）均受損，導致心率反應比同齡人低約 25–30 bpm",
        "DS HIIT 協議：1:3 工作:休息比（全力衝刺）；或暖身 50% HRR → 4–2 分鐘間歇於 75–85% HRR",
        "藥物影響：可能使用抗高血壓藥、抗癲癇藥、抗憂鬱藥、糖尿病藥，這些藥物可能影響體重管理"
      ]},
      {h:"DS 特別注意事項", items:[
        "DS 常見共病：心臟病、肥胖、白血病、阿茲海默症、真菌感染等，影響運動能力與動機",
        "DS 臉部特徵（小鼻子、扁鼻樑、小嘴）影響呼吸，高強度運動需定期休息並觀察非語言窘迫訊號",
        "關節鬆弛 + 骨骼肌低張力：可能有頸椎不穩（C1-C2 atlantoaxial instability）—— 避免頸部加壓動作（如仰臥起坐）",
        "膝關節和髖關節因體重過重及步態異常而承受額外壓力，建議提供替代性低負重動作",
        "DS 心血管容量持續低於健康對照組，運動中需謹慎監測 HR 和 RPE"
      ]}
    ],
    special:[
      {h:"環境與溝通", items:[
        "短期記憶缺損：使用簡單扼要語言、重複指令，必要時示範動作",
        "注意力缺陷（類 ADHD 特徵）：練習環境應減少干擾，尤其是阻力訓練與平衡訓練期間",
        "平衡和步態能力較差 → 需評估跌倒風險，選擇安全的運動模式",
        "ID 個體需要更多鼓勵；可使用語言肯定、目標設定、建立關係；避免食物型獎勵"
      ]},
      {h:"社交支持與長期參與", items:[
        "特殊奧林匹克等組織運動參與：對生活品質和自我效能有正向影響（但不保證體能改善）",
        "團體運動或熟悉者陪同有助於提升樂趣和持續參與",
        "同儕輔導可透過示範角色提升雙方的自我效能",
        "進入成年期後，學校日間運動計畫停止，需主動維持規律 PA 以抗衡久坐習慣",
        "家庭成員和照護者可作為運動促進者，應納入 ExRx 討論並提供教育"
      ]}
    ],
  acsm11:{
    pageStr:"748",
    blocks:[
      {h:"11版阻力訓練起始次數差異（PDF p748）",body:"11版阻力訓練起始強度為 60-70% 1-RM 固定配合 10-12 下；12版放寬起始次數範圍為 6-12 下（同樣 60-70% 1-RM）。",list:["11版：60-70% 1-RM × 10-12 下 → 70-80% 1-RM × 10-12 下","12版：60-70% 1-RM × 6-12 下（起始次數降至 6 下）"]}
    ]
  }
  },
{
    id:"cerebral_palsy", cat:"神經與心理 Neuro/Psych", name:"腦性麻痺", en:"Cerebral Palsy (CP)", page:900, pageStr:"894-903", status:"approx", detailed:true,
    aerobic:{f:"參照一般成人（每週 ≥150 分鐘中等強度）；無法達標者盡量規律參與", i:"活動強度可能高於體能測量預期（痙攣性增加能量消耗）；幾乎半數步行者已達無氧閾值 → 需謹慎監測", t:"短間歇訓練（high tone 者較佳）；間歇 + 休息交替優於單次長時間", ty:"手腳測功儀（減少跌倒風險）、輪椅推行；GMFCS I-II 可跑步機/地面步行"},
    resistance:{f:"依一般成人建議（2–3 天/週）", i:"緩慢收縮速度；包含向心和離心收縮（全 ROM）；離心訓練可減少共同收縮", t:"依個人耐受度", ty:"優先機器/纜繩（安全性高）；自由重量前需先確認原始反射和神經動作控制"},
    flex:{f:"每次訓練納入放鬆/伸展例行動作", i:"至輕微張力感", t:"高肌張力者：新技能/動作安排在訓練初期", ty:"靜態伸展為主；含關節全 ROM 動作"},
    clinical:[
      {h:"CP 分類與功能評估", items:[
        "CP 是最常見的兒童期運動障礙；主要類型：痙攣（spasticity，最常見）、運動障礙（dyskinesia）、共濟失調（ataxia）",
        "GMFCS 分級：I（步行無限制）→ V（所有環境須輪椅）；指導運動模式和測試選擇",
        "CP 為非進展性腦部損傷，但功能可能隨年齡下降（20–50% 成人在青壯年期回報行動力退步）",
        "CP 患者面臨提早老化風險：繼發性骨質疏鬆、糖尿病、心血管疾病風險增高"
      ]},
      {h:"運動測試注意事項", items:[
        "GMFCS I-II（步行）：跑步機 GXT 評估 CRF；GMFCS III-IV（輪椅）：10 m 輪椅穿梭跑更準確（手臂測功儀低估 CRF）",
        "標準最大心率公式對 CP 患者可能不準確",
        "關節疼痛常見，選擇最小化關節負荷的測試模式",
        "姿位和舒適度需評估，避免誘發肌張力增加或原始反射",
        "1-RM 測試困難（協調困難、難以確認適當阻力）→ 建議 6–10 RM 多關節機器測試"
      ]}
    ],
    special:[
      {h:"安全與訓練調整", items:[
        "骨質疏鬆和骨折風險較高 → 使用測功儀最小化跌倒和骨折風險",
        "高肌張力者：(a) 短間歇訓練取代長時間連續；(b) 納入放鬆和伸展例行；(c) 新技能安排在訓練初期",
        "阻力訓練：全 ROM、包含向心+離心收縮、緩慢速度；離心訓練可減少共同收縮、改善淨扭矩",
        "非常虛弱或選擇性動作控制差者 → 單關節和單側訓練更有效（減少跨肌群協調需求）"
      ]},
      {h:"動作控制與輔具", items:[
        "開始自由重量前：先確認原始反射對動作的影響（頭部、軀幹、近端關節位置）及神經動作控制是否充足",
        "機器重量始終是首選（安全性和平衡支撐），然後再漸進至自由重量",
        "頭部/軀幹/近端關節良好姿位優於固定帶；Velcro 手套讓雙手附著器材也是有效簡單改良",
        "運動強度可能被低估（CP 患者動作能量消耗高於體能活動分類表標準值）",
        "強烈支持運動和競技參與（含帕拉林匹克），精英 CP 運動員不顯示低於正常的神經肌肉疲勞"
      ]}
    ]
  },
{
    id:"alzheimer", cat:"神經與心理 Neuro/Psych", name:"阿茲海默症/失智", en:"Alzheimer's / Dementia", page:910, pageStr:"906-912", status:"full", detailed:true,
    aerobic:{f:"3 天/週", i:"依疾病嚴重度：從輕強度開始，漸進至中強度（40–59% VO₂R 或 HRR；RPE 12–13）", t:"嚴重者先從 <10 分鐘/次開始；漸進至 30–60 分鐘（持續或累積）", ty:"大肌群節律性活動（步行、騎車、游泳、舞蹈）"},
    resistance:{f:"2–3 天/週", i:"初學：40–50% 1-RM；進階：60–70% 1-RM（依認知損傷嚴重度和共病調整）", t:"≥1 組 × 8–12 下（起步者：10–15 下）", ty:"安全起見避免自由重量；優先使用機械式器材和彈力帶/徒手"},
    flex:{f:"≥2–3 天/週，每天最佳", i:"完全伸展、屈曲、旋轉，或伸展至輕微不適", t:"靜態維持 10–30 秒，每動作重複 2–4 次", ty:"所有大肌群的緩慢靜態伸展"},
    clinical:[
      {h:"疾病概述與分期", items:["AD 是最常見的神經退化性疾病；病理特徵為類澱粉斑塊（amyloid-β plaques）和神經纖維糾結（tau tangles）","三期：(1) 前臨床期（有病理但無症狀）→ (2) MCI 期（有病理 + 輕度認知損傷）→ (3) AD 失智期（顯著認知損傷 + 無法獨立執行 I-ADLs）","診斷：神經學檢查、認知功能測試（MMSE、MoCA）、腦部影像（MRI/CT/PET）"]},
      {h:"運動的效益與證據", items:["流行病學：較多 PA 與較低失智風險相關（2018 PA Guidelines：強證據 PA 降低失智風險）","較高 CRF 與早期 AD 較少腦萎縮相關；運動介入可能減緩記憶力喪失與腦萎縮","初步證據：有氧運動可能改善早期 AD 的功能能力（海馬迴神經新生假說）","多模式運動（有氧＋阻力＋協調＋柔軟度＋平衡）可能效果最佳"]},
      {h:"運動測試考量", items:["依疾病嚴重度決定可行性：前臨床/早期：通常可耐受最大測試；嚴重期：記憶問題可使測試禁忌","嚴重認知損傷者：Borg 量表可能無效；嚴重記憶喪失期：避免運動測試","建議：所有測試應諮詢醫師及/或神經心理師；腳踏車測功儀適合有共病（如關節炎）者","確保充分熱身與緩和，密切監測生命徵象"]}
    ],
    special:[
      {h:"安全性與監督", items:["所有 AD 患者的 ExRx 須諮詢醫師和/或神經心理師","建議照護者或支持者陪同運動，提供動機、支持和安全監督","在社區運動時：照護者應在課程結束時出現；在更衣室等共用空間也要提供支援","養護機構/記憶診所/高齡照護機構：鼓勵運動，但須有適當訓練的工作人員監督"]},
      {h:"個別化與認知調整", items:["最早期（MCI）：患者仍可獨立且在社區中運動","運動時機：早晨症狀通常最輕，建議安排在上午","重複指令：需反覆提示和多重線索；書面說明輔助理解","共病：代謝性、心血管、關節、肌肉萎縮等共病可能限制頻率和時長，初期可從 <10 分鐘短時間開始","MICT 和 HIIT：可行且可能增加樂趣和依從性；確保遵循安全準則"]}
    ]
  },
{
    id:"parkinson", cat:"神經與心理 Neuro/Psych", name:"帕金森氏症", en:"Parkinson's Disease", page:927, pageStr:"927-930", status:"full", detailed:true,
    aerobic:{f:"3–4 次/週", i:"輕~中度 PD：高強度 80–85% HRmax；體能差或晚期 PD：中強度 60–65% HRmax，盡量往高強度進展", t:"連續或累積 30 分鐘", ty:"大肌群韻律性活動：步行、跑步、騎車、游泳、划船、橢圓機"},
    resistance:{f:"2–3 次/週（非連續日）", i:"初學者 30–60% 1-RM；進階者 60–80% 1-RM", t:"1–3 組 × 8–12 下，從 1 組開始漸進", ty:"上下肢大肌群；晚期避免自由重量 → 改用機械式器材、彈力帶、自身體重"},
    flex:{f:"≥2–3 次/週，每日最佳", i:"完全伸展/旋轉，或至輕微不適感", t:"靜態伸展 10–30 秒，每動作重複 2–4 次", ty:"全身大肌群慢速靜態伸展，強調 ROM；脊椎旋轉、頸部柔軟度"},
    extra:{label:"神經肌肉 Neuromotor", f:"2–3 次/週", i:"N/A", t:"30–60 分鐘", ty:"平衡/敏捷/協調/步態/雙重任務：太極、瑜珈、多方向步訓、不穩定裝置訓練"},
    clinical:[
      {h:"疾病特性", items:[
        "慢性進行性神經退化疾病，特徵為 bradykinesia（動作遲緩）、靜止性震顫、rigidity（僵直）、姿勢不穩定、步態異常"
      ]},
      {h:"Hoehn & Yahr (HY) 分期", items:[
        "Stage 1–2：單側/雙側，無姿勢不穩",
        "Stage 3：開始出現平衡反射受損，仍可獨立生活",
        "Stage 4：嚴重失能，仍可站立/行走",
        "Stage 5：臥床或需輪椅"
      ]},
      {h:"運動測試注意事項", items:[
        "自律神經功能失調 → 直立性低血壓風險；用藥（特別是多巴胺類藥）加重",
        "常見變時功能不全（chronotropic insufficiency）：無法達到 85% 預測最大心率",
        "實際 peak HR 可偏離年齡預測值達 30 bpm → 強烈建議做 GXT",
        "測試時機：盡量在抗帕金森藥藥效高峰時進行",
        "DBS（深腦刺激）患者：ECG 會受干擾，需神經科醫師協助關閉 DBS 後再測",
        "HY 1–2：可做跑步機（Modified Bruce 或 Modified Gardner Protocol）",
        "HY ≥3：次最大測試優先；HY ≥4：可能需藥物壓力測試"
      ]}
    ],
    special:[
      {h:"藥物影響", items:[
        "Levodopa/Carbidopa（最常用）可能造成運動性心搏過緩、短暫心跳過快、運動異動症（dyskinesia）及直立性低血壓",
        "用藥有變動時，運動反應可能不可預測，需特別謹慎"
      ]},
      {h:"跌倒風險", items:[
        "約 61% 的 PD 患者至少跌倒一次，39% 反覆跌倒",
        "所有 PD 患者都必須進行平衡訓練",
        "移除地板障礙、使用步態帶（gait belt）、保持扶手/平行桿在旁"
      ]},
      {h:"凍結步態 (Freezing of Gait, FOG)", items:[
        "視覺與聽覺提示（節奏聽覺刺激）有助改善但無法根治",
        "可用固定式騎車代替步行以減少 FOG 機會"
      ]},
      {h:"雙重任務 (Dual Task)", items:[
        "初學者需謹慎；PD 患者雙重任務困難，與跌倒風險相關",
        "待單一任務穩定後才加入雙重任務訓練"
      ]},
      {h:"其他", items:[
        "阻力訓練強調軀幹與髖伸肌（對抗 PD 的前傾姿勢）",
        "頸部柔軟度訓練重要（與姿勢、步態、平衡相關）",
        "推薦 Lee Silverman BIG Program：誇大動作幅度的功能性訓練",
        "其他有效模式：水中運動、舞蹈（Tango/Waltz）、太極、Nordic walking、拳擊",
        "認知指導原則：說明要慢且清晰、重複示範、搭配視覺+聽覺+觸覺提示"
      ]}
    ],
  acsm11:{
    pageStr:"766-771",
    blocks:[
      {h:"FITT有氧 Type 欄差異（PDF p767）",body:"11版有氧訓練類型列入「dancing（舞蹈）」；12版改為「rowing（划船）、elliptical（橢圓機）」，dancing一詞在12版消失。",list:["11版 Type：walking, running, cycling, swimming, dancing","12版 Type：walking, running, cycling, swimming, rowing, elliptical"]},
      {h:"跌倒風險具體預測（PDF p771）",body:"11版明確指出：PD患者前一年跌倒超過一次者，預計在未來3個月內很可能再次跌倒。12版刪除此具體預測，僅概述「應記錄跌倒史」。",list:["11版另建議應指導患者學習 how to break falls（如何安全跌倒）並反覆練習，以防嚴重受傷","11版：Most falls in PD occur during multiple tasks or long and complex movement（12版未見此句）"]}
    ]
  }
  },
{
    id:"altitude", cat:"環境考量 Environmental", name:"高海拔", en:"Altitude", page:493, pageStr:"490-494", status:"none", detailed:true,
    aerobic:{f:"最初幾天最小化運動；之後維持與海平面相同的週訓練次數和時間", i:"使用與海平面相同的 THR（目標心率）→ 高海拔下以較低絕對工作量達到 THR；注意：相同 RPE 下配速將降低", t:"維持與海平面相同的每次訓練時間；較長持續時間的活動受高海拔影響更大", ty:"任何有氧運動；以 HR 為基礎的 ExRx 在高海拔提供與海平面相似的訓練刺激"},
    resistance:{f:"依一般建議", i:"依個人耐受度", t:"依一般建議", ty:"依個人偏好"},
    flex:{f:"依需要", i:"舒適範圍", t:"30 s 靜態", ty:"靜態伸展"},
    clinical:[
      {h:"高度海拔疾病（Altitude Illnesses）", items:[
        {t:"AMS（急性高山病）：最常見", sub:["症狀：頭痛、噁心/嘔吐、食欲下降、疲勞、頭暈、睡眠不佳","24 小時內發展；停止上升+限制體力活動 → 18–22 小時後症狀達高峰，24–48 小時內恢復","發生率：快速上升至高海拔 ≤15%；極高海拔 15–70%；極端高度 70–85%"]},
        {t:"HACE（高海拔腦水腫）：少見但危及生命 (<2% 超過 3,658 m)", sub:["症狀：頭痛、噁心 → 共濟失調、意識改變（混亂、嗜睡）→ 昏迷","最緊急治療：立即下降（>急救藥物）"]},
        {t:"HAPE（高海拔肺水腫）：少見但危及生命 (<0.6% 超過 3,658 m)", sub:["初期症狀：用力性呼吸困難 → 休息時呼吸困難、咳嗽（可能帶血絲痰液）","最常在上升第 1–3 天夜間或清晨出現","最緊急治療：立即下降 + 氧氣療法 + Gamow Bag"]}
      ]},
      {h:"預防與治療", items:[
        "最佳預防：高度適應（altitude acclimatization）",
        "預防原則：最小化初期持續體力活動、維持適當水分和食物攝取",
        "預防藥物：Acetazolamide（Diamox）125 mg 每天兩次（加速適應）；快速上升超過 3,500 m 時可加 Dexamethasone 4 mg 每 12 小時",
        "鐮刀型貧血患者：完全避免高海拔訓練",
        "AMS 治療：Acetazolamide 250 mg 每天兩次；頭痛用布洛芬；症狀嚴重 → 下降 300–1,000 m"
      ]}
    ],
    special:[
      {h:"高海拔運動安全要點", items:[
        "準備極端環境：高海拔地區有較大的溫度、濕度、風速和日照輻射波動 → 遵循熱環境和冷環境指引",
        "監測天氣：大氣壓力下降（惡劣天氣）可直接加重高度效應；山地可自行產生天氣",
        "活動修改：根據適應狀態、體能、營養、睡眠品質、年齡和可用液體量調整；增加更長/更頻繁的休息；縮短活動時間",
        "水分補充：合理增加水分攝取（超過正常需求）；注意避免過度補充低滲液體（水）→ 低鈉血症風險",
        "組織規劃：監測高風險個體、規劃適當上升計畫（分段適應）、組建醫療緊急程序",
        "脈搏血氧儀（SpO2）：有症狀時立即使用；注意寒冷血管收縮、陽光或海拔本身可能影響讀數準確性"
      ]}
    ]
  },
{
    id:"heat", cat:"環境考量 Environmental", name:"熱環境", en:"Heat / Hot Environment", page:510, pageStr:"510-512", status:"none", detailed:true,
    aerobic:{f:"依 WBGT 分級調整運動時間、次數和強度；若有 THR 處方，在熱環境中以較低絕對工作量達到同一 THR（如：降低跑速）", i:"維持相同 THR；在熱環境中降低絕對工作量以防熱病；WBGT 提供分級修改指引", t:"縮短訓練時間；增加休息和休息頻率；多次訓練間隔 ≥3 小時（最好 6 小時）", ty:"任何有氧運動；安排於涼爽時段（清晨或傍晚）；避免正午高 WBGT 時段"},
    resistance:{f:"依一般建議；熱環境中可縮短訓練", i:"依耐受度調整", t:"視需要縮短", ty:"依個人偏好"},
    flex:{f:"依需要", i:"舒適範圍", t:"30 s 靜態", ty:"靜態伸展"},
    clinical:[
      {h:"熱病類型與症狀", items:[
        "熱痙攣（heat cramps）：劇烈運動後肌肉痙攣，通常因出汗和液體流失引起",
        "熱暈厥（heat syncope）：因血液輸往周邊血管過多，導致腦部血流不足引起暈厥",
        "熱衰竭（heat exhaustion）：大量出汗、頭暈、虛弱、皮膚濕冷蒼白；需移至陰涼處補水",
        "熱中暑（exertional heatstroke）：核心溫度 >40°C；無法調溫、皮膚燙紅、意識混亂 → 醫療緊急",
        "熱適應（heat acclimatization）需 10–14 天中等強度熱環境運動 → 血漿容量增加 10–20%、更早開始出汗、減少汗液中的鈉損失、降低運動中 HR 和核心溫度"
      ]}
    ],
    special:[
      {h:"熱環境運動安全（Box 7.2 整理）", items:[
        "制定避免脫水和高體溫的計畫",
        "熱適應：漸進增加運動時間和強度 10–14 天",
        "限制高強度運動在一天中最涼爽的時間（清晨）；避免在高熱高濕時進行長時間熱身",
        "了解自己的汗率和需補充的液體量；以尿液顏色（淡黃色/稻草黃）作為水分指標",
        "若當日體重比平均體重低 >1%，應先補水再運動",
        "液體攝取個別化：補充量匹配出汗量，體重變化限制在 <2%；不限制運動中液體攝取",
        "多次每日訓練：間隔 ≥3 小時（最好 6 小時）恢復和補水",
        "高 WBGT 時：延長休息、縮短活動時間、移除裝備、提供充足液體和廁所設施",
        "兒童和老年人在高 WBGT 條件下應更謹慎修改活動",
        "出現睡眠不足、感染/發燒、腹瀉/嘔吐、碳水化合物耗竭、藥物使用或飲酒時應避免或減少熱環境運動"
      ]}
    ]
  }
];

const CATEGORIES = ["核心原則 General Principles", "心臟復健分期 Cardiac Rehab Phases", "一般族群 General", "心臟血管 CV", "肺部 Pulmonary", "代謝 Metabolic", "骨骼肌肉與腫瘤 MSK", "神經與心理 Neuro/Psych", "環境考量 Environmental"];
