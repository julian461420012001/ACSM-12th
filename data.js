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
    id:"children", cat:"一般族群 General", name:"兒童與青少年", en:"Children & Adolescents", page:396, pageStr:"396-397", status:"full",
    aerobic:{f:"每天，含每週 ≥3 天高強度", i:"中至高強度", t:"每天 ≥60 分鐘（多數為有氧）", ty:"有趣、適齡的活動（跑步、遊戲、運動、騎車）"},
    resistance:{f:"每週 ≥3 天", i:"自身體重或適當阻力", t:"納入 60 分鐘的一部分", ty:"肌力強化遊戲與活動（攀爬、伏地挺身、彈力帶）"},
    flex:{f:"納入日常", i:"溫和", t:"—", ty:"伸展與活動度"},
    extra:{label:"骨骼強化", f:"每週 ≥3 天", i:"衝擊性", t:"—", ty:"跑跳等衝擊性活動強化骨骼"},
    clinical:[{h:"重點", items:["每天至少 60 分鐘中高強度身體活動。","強調樂趣與多樣性；含骨骼與肌力強化活動每週 3 天。"]}]
  },
{
    id:"older_adults", cat:"一般族群 General", name:"老年人", en:"Older Adults", page:439, pageStr:"439-444", status:"full",
    aerobic:{f:"≥5 天/週（中強度）或 ≥3 天/週（高強度）", i:"中強度（5–6/10 量表）至高強度（7–8/10）", t:"30–60 分鐘/天，每次 ≥10 分鐘", ty:"低關節壓力活動（走路、水中、騎車）"},
    resistance:{f:"≥2 天/週", i:"輕（40–50% 1-RM）起始至中高強度", t:"1–3 組 × 8–12 下（或 10–15 下）", ty:"漸進式阻力訓練、爬樓梯、負重活動"},
    flex:{f:"≥2 天/週", i:"伸展至緊繃或輕微不適", t:"靜態 30–60 秒", ty:"靜態伸展"},
    extra:{label:"平衡訓練", f:"建議納入", i:"—", t:"—", ty:"有跌倒風險者加入平衡與神經動作訓練（太極等）"},
    clinical:[{h:"重點", items:["跌倒預防是重點：納入平衡訓練。","強度可用 0–10 自覺量表；依個人功能能力調整。"]}]
  },
{
    id:"pregnancy", cat:"一般族群 General", name:"懷孕", en:"Pregnancy", page:407, pageStr:"407-413", status:"approx",
    aerobic:{f:"多數天，最好每天", i:"中強度（RPE 12–14；可說話測試）", t:"至少 150 分鐘/週中強度，分散於數天", ty:"低衝擊大肌群活動（走路、游泳、固定式騎車、孕婦有氧）"},
    resistance:{f:"2–3 天/週", i:"輕至中強度，避免閉氣", t:"主要肌群", ty:"阻力訓練（避免仰臥姿勢於孕中後期）"},
    flex:{f:"溫和", i:"避免過度伸展（鬆弛素影響）", t:"靜態", ty:"溫和伸展"},
    clinical:[{h:"重點", items:["避免仰臥位運動（孕 16 週後）與高跌倒/碰撞風險活動。","注意停止運動的警訊（出血、暈眩、呼吸困難等），保持水分與避免過熱。"]}]
  },
{
    id:"diastasis_recti", cat:"一般族群 General", name:"腹直肌分離", en:"Diastasis Recti Abdominis", page:413, pageStr:"413", status:"none", detailed:false,
    aerobic:{f:"此情境書中無 FITT 處方表，僅有 Special Considerations", i:"", t:"", ty:""}, resistance:{f:"—",i:"",t:"",ty:""}, flex:{f:"—",i:"",t:"",ty:""},
    clinical:[{h:"重點", items:["⚠️ 待補：請用 Claude Code 依「補充指令.md」從 ACSM 第 413 頁整理此情境的臨床原則與處方。"]}]
  },
{
    id:"low_back_pain", cat:"一般族群 General", name:"下背痛", en:"Low Back Pain", page:419, pageStr:"419-423", status:"approx", detailed:false,
    aerobic:{f:"書中無獨立 FITT 表，請參照相近情境或敘述", i:"", t:"", ty:""}, resistance:{f:"—",i:"",t:"",ty:""}, flex:{f:"—",i:"",t:"",ty:""},
    clinical:[{h:"重點", items:["⚠️ 待補：請用 Claude Code 依「補充指令.md」從 ACSM 第 419-423 頁整理此情境的臨床原則與處方。"]}]
  },
{
    id:"transgender", cat:"一般族群 General", name:"跨性別", en:"Transgender Individuals", page:451, pageStr:"451", status:"none", detailed:false,
    aerobic:{f:"此情境書中無 FITT 處方表，僅有 Special Considerations", i:"", t:"", ty:""}, resistance:{f:"—",i:"",t:"",ty:""}, flex:{f:"—",i:"",t:"",ty:""},
    clinical:[{h:"重點", items:["⚠️ 待補：請用 Claude Code 依「補充指令.md」從 ACSM 第 451 頁整理此情境的臨床原則與處方。"]}]
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
    ]
  },
{
    id:"scad", cat:"心臟血管 CV", name:"自發性冠狀動脈剝離", en:"Spontaneous Coronary Artery Dissection (SCAD)", page:540, pageStr:"540-541", status:"none", detailed:false,
    aerobic:{f:"此情境書中無 FITT 處方表，僅有 Special Considerations", i:"", t:"", ty:""}, resistance:{f:"—",i:"",t:"",ty:""}, flex:{f:"—",i:"",t:"",ty:""},
    clinical:[{h:"重點", items:["⚠️ 待補：請用 Claude Code 依「補充指令.md」從 ACSM 第 540-541 頁整理此情境的臨床原則與處方。"]}]
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
    ]
  },
{
    id:"sternotomy", cat:"心臟血管 CV", name:"胸骨切開術", en:"Sternotomy", page:551, pageStr:"551", status:"none", detailed:false,
    aerobic:{f:"此情境書中無 FITT 處方表，僅有 Special Considerations", i:"", t:"", ty:""}, resistance:{f:"—",i:"",t:"",ty:""}, flex:{f:"—",i:"",t:"",ty:""},
    clinical:[{h:"重點", items:["⚠️ 待補：請用 Claude Code 依「補充指令.md」從 ACSM 第 551 頁整理此情境的臨床原則與處方。"]}]
  },
{
    id:"pacemaker_icd", cat:"心臟血管 CV", name:"心律器/去顫器", en:"Pacemaker / ICD", page:555, pageStr:"555", status:"none", detailed:false,
    aerobic:{f:"此情境書中無 FITT 處方表，僅有 Special Considerations", i:"", t:"", ty:""}, resistance:{f:"—",i:"",t:"",ty:""}, flex:{f:"—",i:"",t:"",ty:""},
    clinical:[{h:"重點", items:["⚠️ 待補：請用 Claude Code 依「補充指令.md」從 ACSM 第 555 頁整理此情境的臨床原則與處方。"]}]
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
    ]
  },
{
    id:"pots", cat:"心臟血管 CV", name:"姿勢性心搏過速症候群", en:"POTS", page:565, pageStr:"565-567", status:"approx", detailed:false,
    aerobic:{f:"書中無獨立 FITT 表，請參照相近情境或敘述", i:"", t:"", ty:""}, resistance:{f:"—",i:"",t:"",ty:""}, flex:{f:"—",i:"",t:"",ty:""},
    clinical:[{h:"重點", items:["⚠️ 待補：請用 Claude Code 依「補充指令.md」從 ACSM 第 565-567 頁整理此情境的臨床原則與處方。"]}]
  },
{
    id:"pediatric_cardiac", cat:"心臟血管 CV", name:"兒童心臟復健", en:"Pediatric Cardiac Rehabilitation", page:571, pageStr:"571", status:"full", detailed:false,
    aerobic:{f:"（待 Claude Code 從書中填入具體數值）", i:"", t:"", ty:""}, resistance:{f:"（待 Claude Code 從書中填入具體數值）", i:"", t:"", ty:""}, flex:{f:"（待 Claude Code 從書中填入具體數值）", i:"", t:"", ty:""},
    clinical:[{h:"重點", items:["⚠️ 待補：請用 Claude Code 依「補充指令.md」從 ACSM 第 571 頁整理此情境的臨床原則與處方。"]}]
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
    ]
  },
{
    id:"asthma", cat:"肺部 Pulmonary", name:"氣喘", en:"Asthma", page:583, pageStr:"583-585", status:"full",
    aerobic:{f:"最少 3–5 天/週", i:"中強度起始，依耐受漸進", t:"逐步至 30–40 分鐘/天", ty:"大肌群有氧活動；游泳因濕暖環境常被良好耐受"},
    resistance:{f:"2–3 天/週", i:"依一般族群指引", t:"2–4 組 × 8–12 下", ty:"主要肌群阻力訓練"},
    flex:{f:"≥2–3 天/週", i:"伸展至緊繃或輕微不適", t:"靜態 10–30 秒", ty:"靜態與動態"},
    clinical:[{h:"重點", items:["運動前充分熱身可減少運動誘發支氣管收縮（EIB）。","隨身攜帶短效支氣管擴張劑；避免冷乾空氣與高過敏原環境。"]}]
  },
{
    id:"copd", cat:"肺部 Pulmonary", name:"慢性阻塞性肺病", en:"COPD", page:595, pageStr:"595-598", status:"full",
    aerobic:{f:"最少 3 天/週，最好到 5 天/週", i:"中至高強度（50–80% 尖峰功率，或 Borg CR10 量表 3–6）", t:"初期 10–15 分鐘/天，漸增至 20–60 分鐘；達不到則累積 ≥20 分鐘穿插休息", ty:"走路（地面或跑步機）、固定式騎車、上肢測功儀"},
    resistance:{f:"至少 2 天/週，非連續日", i:"力量：初學 60–70% 1-RM，進階 ≥80%；耐力：<50% 1-RM", t:"力量：2–4 組 × 8–12 下；耐力：≤2 組 × 15–20 下", ty:"重量機械、自由重量、彈力帶、自身體重"},
    flex:{f:"≥2–3 天/週（每天最佳）", i:"伸展至緊繃或輕微不適", t:"靜態伸展 10–30 秒 ×2–4 次", ty:"靜態、動態"},
    clinical:[{h:"重點", items:["監測血氧飽和度（SpO2），必要時補充氧氣。","採用噘嘴呼吸與呼吸控制技巧，搭配肺復原計畫。"]}]
  },
{
    id:"pah", cat:"肺部 Pulmonary", name:"肺動脈高壓", en:"Pulmonary Arterial Hypertension (PAH)", page:600, pageStr:"600-602", status:"approx", detailed:false,
    aerobic:{f:"書中無獨立 FITT 表，請參照相近情境或敘述", i:"", t:"", ty:""}, resistance:{f:"—",i:"",t:"",ty:""}, flex:{f:"—",i:"",t:"",ty:""},
    clinical:[{h:"重點", items:["⚠️ 待補：請用 Claude Code 依「補充指令.md」從 ACSM 第 600-602 頁整理此情境的臨床原則與處方。"]}]
  },
{
    id:"ild", cat:"肺部 Pulmonary", name:"間質性肺病", en:"Interstitial Lung Disease (ILD)", page:603, pageStr:"603", status:"approx", detailed:false,
    aerobic:{f:"書中無獨立 FITT 表，請參照相近情境或敘述", i:"", t:"", ty:""}, resistance:{f:"—",i:"",t:"",ty:""}, flex:{f:"—",i:"",t:"",ty:""},
    clinical:[{h:"重點", items:["⚠️ 待補：請用 Claude Code 依「補充指令.md」從 ACSM 第 603 頁整理此情境的臨床原則與處方。"]}]
  },
{
    id:"cystic_fibrosis", cat:"肺部 Pulmonary", name:"囊狀纖維化", en:"Cystic Fibrosis (CF)", page:603, pageStr:"603-604", status:"approx", detailed:false,
    aerobic:{f:"書中無獨立 FITT 表，請參照相近情境或敘述", i:"", t:"", ty:""}, resistance:{f:"—",i:"",t:"",ty:""}, flex:{f:"—",i:"",t:"",ty:""},
    clinical:[{h:"重點", items:["⚠️ 待補：請用 Claude Code 依「補充指令.md」從 ACSM 第 603-604 頁整理此情境的臨床原則與處方。"]}]
  },
{
    id:"lung_transplant", cat:"肺部 Pulmonary", name:"肺移植", en:"Lung Transplantation", page:605, pageStr:"605-606", status:"approx", detailed:false,
    aerobic:{f:"書中無獨立 FITT 表，請參照相近情境或敘述", i:"", t:"", ty:""}, resistance:{f:"—",i:"",t:"",ty:""}, flex:{f:"—",i:"",t:"",ty:""},
    clinical:[{h:"重點", items:["⚠️ 待補：請用 Claude Code 依「補充指令.md」從 ACSM 第 605-606 頁整理此情境的臨床原則與處方。"]}]
  },
{
    id:"diabetes", cat:"代謝 Metabolic", name:"糖尿病", en:"Diabetes Mellitus", page:661, pageStr:"661-664", status:"full",
    aerobic:{f:"3–7 天/週，連續不活動不超過 2 天", i:"40–59% VO2R/HRR（中強度，RPE 11–12）；或 60–89%（高強度，RPE 14–17）", t:"中強度 150–300 分鐘/週，或高強度 75–150 分鐘/週，或組合", ty:"大肌群韻律性活動（走路、騎車、游泳）；連續活動或 HIIT"},
    resistance:{f:"至少 2 個非連續天/週，最好 3 天", i:"中強度 50–69% 1-RM 至高強度 70–85% 1-RM", t:"至少 8–10 個動作，1–3 組 × 10–15 下接近疲勞", ty:"阻力機械、自由重量、彈力帶、自身體重"},
    flex:{f:"≥2–3 天/週", i:"伸展至緊繃或輕微不適；平衡運動：輕至中強度", t:"靜態伸展 10–30 秒，每動作 2–4 次；平衡任意時長", ty:"靜態、動態、其他伸展、瑜伽"},
    clinical:[{h:"重點", items:["鼓勵以非結構化活動（雜務、家事、庭院）與全天少量活動打斷久坐。","運動前後監測血糖，預防低血糖；注意周邊神經病變與足部照護。"]}]
  },
{
    id:"dyslipidemia", cat:"代謝 Metabolic", name:"血脂異常", en:"Dyslipidemia", page:674, pageStr:"674", status:"full",
    aerobic:{f:"≥5 天/週", i:"中至高強度", t:"30–60 分鐘/天以利能量消耗與體重管理", ty:"大肌群有氧活動"},
    resistance:{f:"2–3 天/週", i:"依一般指引", t:"2–4 組 × 8–12 下", ty:"主要肌群阻力訓練"},
    flex:{f:"≥2–3 天/週", i:"伸展至緊繃", t:"靜態 10–30 秒", ty:"靜態與動態"},
    clinical:[{h:"重點", items:["增加運動量（時間）對血脂改善最有幫助。","常合併其他心血管危險因子，需綜合管理。"]}]
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
    ]
  },
{
    id:"obesity", cat:"代謝 Metabolic", name:"過重與肥胖", en:"Overweight & Obesity", page:692, pageStr:"692-693", status:"full",
    aerobic:{f:"≥5 天/週以最大化能量消耗", i:"中強度起始（40–59% VO2R/HRR），漸進至高強度", t:"≥30 分鐘/天漸增至 60 分鐘以上，以利減重", ty:"大肌群韻律性活動（走路、騎車、游泳）"},
    resistance:{f:"2–3 天/週", i:"依一般成人指引", t:"2–4 組 × 8–12 下", ty:"主要肌群阻力訓練"},
    flex:{f:"≥2–3 天/週", i:"伸展至緊繃或輕微不適", t:"靜態 10–30 秒", ty:"靜態與動態"},
    clinical:[{h:"重點", items:["減重需搭配飲食控制與行為改變；目標每週減 0.5–1 kg。","注意關節負荷，初期選低衝擊活動。"]}]
  },
{
    id:"masld", cat:"代謝 Metabolic", name:"代謝脂肪肝", en:"MASLD (舊稱 NAFLD)", page:708, pageStr:"708", status:"full", detailed:false,
    aerobic:{f:"（待 Claude Code 從書中填入具體數值）", i:"", t:"", ty:""}, resistance:{f:"（待 Claude Code 從書中填入具體數值）", i:"", t:"", ty:""}, flex:{f:"（待 Claude Code 從書中填入具體數值）", i:"", t:"", ty:""},
    clinical:[{h:"重點", items:["⚠️ 待補：請用 Claude Code 依「補充指令.md」從 ACSM 第 708 頁整理此情境的臨床原則與處方。"]}]
  },
{
    id:"metabolic_syndrome", cat:"代謝 Metabolic", name:"代謝症候群", en:"Metabolic Syndrome", page:699, pageStr:"699-700", status:"approx", detailed:false,
    aerobic:{f:"書中無獨立 FITT 表，請參照相近情境或敘述", i:"", t:"", ty:""}, resistance:{f:"—",i:"",t:"",ty:""}, flex:{f:"—",i:"",t:"",ty:""},
    clinical:[{h:"重點", items:["⚠️ 待補：請用 Claude Code 依「補充指令.md」從 ACSM 第 699-700 頁整理此情境的臨床原則與處方。"]}]
  },
{
    id:"multiple_chronic", cat:"代謝 Metabolic", name:"多重慢性病", en:"Multiple Chronic Diseases", page:816, pageStr:"816", status:"none", detailed:false,
    aerobic:{f:"此情境書中無 FITT 處方表，僅有 Special Considerations", i:"", t:"", ty:""}, resistance:{f:"—",i:"",t:"",ty:""}, flex:{f:"—",i:"",t:"",ty:""},
    clinical:[{h:"重點", items:["⚠️ 待補：請用 Claude Code 依「補充指令.md」從 ACSM 第 816 頁整理此情境的臨床原則與處方。"]}]
  },
{
    id:"arthritis", cat:"骨骼肌肉與腫瘤 MSK", name:"關節炎（骨/類風濕）", en:"Arthritis (OA/RA)", page:737, pageStr:"737", status:"full",
    aerobic:{f:"依書中表格", i:"中強度", t:"漸進至 150 分鐘/週", ty:"低衝擊活動（水中運動、騎車、走路）"},
    resistance:{f:"2–3 天/週", i:"低至中強度起始", t:"關節周圍肌群", ty:"等長與動態阻力，避免急性發炎期過度負荷"},
    flex:{f:"每天", i:"溫和伸展至活動度末端", t:"維持關節活動度", ty:"關節活動度運動"},
    clinical:[{h:"重點", items:["急性發炎期降低強度，著重關節活動度。","水中運動減少關節負荷，是良好選擇。"]}]
  },
{
    id:"osteoporosis", cat:"骨骼肌肉與腫瘤 MSK", name:"骨質疏鬆", en:"Osteoporosis", page:799, pageStr:"799-800", status:"full",
    aerobic:{f:"4–5 天/週", i:"中強度 40–59% VO2R/HRR；CR-10 量表 3–4", t:"從 20 分鐘漸增至 ≥30 分鐘（上限 45–60 分鐘）", ty:"走路、騎車等（負重活動較佳）；低中骨折風險者可加衝擊性運動（跳躍、踏階）"},
    resistance:{f:"從 1–2 個非連續天/週開始，可進展至 2–3 天", i:"調整阻力使最後 2 下具挑戰性；可耐受者高強度高速訓練有益", t:"從 1 組 × 8–12 下開始，約 2 週後增至 2 組；每次 ≤8–10 個動作", ty:"標準器材搭配充分指導與安全考量；複合動作最佳"},
    flex:{f:"5–7 天/週", i:"伸展至緊繃或輕微不適", t:"靜態伸展 10–30 秒 ×2–4 次", ty:"所有主要關節靜態伸展"},
    clinical:[{h:"重點", items:["目前無明確運動禁忌指引；建議中強度負重運動。","避免脊椎過度屈曲與扭轉動作，降低壓迫性骨折風險。"]}]
  },
{
    id:"sci", cat:"骨骼肌肉與腫瘤 MSK", name:"脊髓損傷", en:"Spinal Cord Injury", page:807, pageStr:"807-808", status:"full",
    aerobic:{f:"最少 2 天/週漸進至 3 天；運動員可增至 3–5 天", i:"初學者中強度 40–59% HRR，漸進至高強度 75–90% HRR", t:"初期 5–10 分鐘穿插 5 分鐘主動恢復，漸增至每次 20–40 分鐘", ty:"盡可能多的肌群：手腳測功儀、FES-下肢結合自主手臂運動、划船、半臥踏步、輪椅測功儀"},
    resistance:{f:"最少 2 天/週", i:"初期 50% 1-RM 漸進至 80% 1-RM，所有大肌群", t:"初期 1–2 組 × 8 下，漸進至 3 組 × 10 下", ty:"無障礙阻力機械方便安全；或啞鈴、腕部重量、彈力帶；表面神經肌肉電刺激"},
    flex:{f:"每天，尤其有關節攣縮、痙攣或頻繁輪椅推進與轉位時", i:"伸展不適 ≤2/10 疼痛量表", t:"每肌群反覆伸展 3–4 分鐘/天，最好在熱身後或訓練後", ty:"靜態為主"},
    clinical:[{h:"重點", items:["注意自主神經反射異常（autonomic dysreflexia）與體溫調節障礙。","損傷平面影響運動能力與心血管反應。"]}]
  },
{
    id:"cancer", cat:"骨骼肌肉與腫瘤 MSK", name:"癌症存活者", en:"Cancer Survivors", page:751, pageStr:"751", status:"full",
    aerobic:{f:"3–5 天/週", i:"40–<60% VO2R/HRR；可用 RPE 衡量強度", t:"≥30 分鐘/天，無下限；治療期間因化放療毒性可能需調整", ty:"走路、划船、騎車、游泳、循環訓練（MICT 或 HIIT）。有中央靜脈導管、造口、免疫低下或正接受放療者勿游泳"},
    resistance:{f:"2–5 天/週，同肌群間隔至少 48 小時", i:"60–80% 1-RM 或 6–15 下；>15 下時加重。不需力竭，可在力竭前 1–2 下停止（RIR 1–2）", t:"≥1 組，每組 ≥6 下，組間休息 ≥60 秒", ty:"8–10 個主要肌群動作；自身體重、機械或自由重量"},
    flex:{f:"2–3 天/週至每天", i:"在疼痛範圍內伸展至緊繃或輕微不適", t:"每個伸展維持 10–30 秒", ty:"靜態伸展（被動/主動），可搭配太極與瑜伽"},
    clinical:[{h:"重點", items:["治療相關毒性、貧血、淋巴水腫與骨轉移需個別化評估。","運動有助減輕疲勞、改善體能與生活品質。"]}]
  },
{
    id:"fibromyalgia", cat:"骨骼肌肉與腫瘤 MSK", name:"纖維肌痛", en:"Fibromyalgia", page:764, pageStr:"764-765", status:"full",
    aerobic:{f:"從 1–2 天/週開始，漸進至 2–3 天", i:"從輕度 30–39% VO2R/HRR 開始，漸進至中強度 40–59%（RPE 9–12）", t:"從 10 分鐘/天開始，漸進至 30–60 分鐘/天", ty:"低衝擊（水中運動、走路、配樂有氧、游泳、騎車）"},
    resistance:{f:"2–3 天/週，間隔至少 48 小時", i:"40–80% 1-RM；力量訓練從 40%→60%→60–80% 漸進；肌耐力 ≤50% 1-RM", t:"力量：從 4–5 下漸進至 8–12 至 15 下，1→2–4 組，組間休息 2–3 分鐘；耐力：15–20 下", ty:"自身體重、彈力帶、啞鈴、腕踝重量、機械；水中可用器材增加阻力"},
    flex:{f:"2–3 天/週", i:"在疼痛範圍內伸展至緊繃", t:"靜態 10–30 秒 ×2–4 次；8–10 個動態低強度活動度訓練（5–10 分鐘）", ty:"靜態與動態活動度訓練"},
    clinical:[{h:"重點", items:["「從低開始、慢慢進展」是核心原則，依運動後症狀調整。","運動初期可能症狀短暫加重，需耐心漸進避免放棄。"]}]
  },
{
    id:"mecfs", cat:"骨骼肌肉與腫瘤 MSK", name:"肌痛性腦脊髓炎/慢性疲勞", en:"ME/CFS", page:773, pageStr:"773", status:"full",
    aerobic:{f:"依嚴重度個別化（無至輕/輕至中）", i:"極低強度起始，嚴格避免過度", t:"極短時段起始", ty:"依耐受選擇，避免誘發倦怠後不適（PEM）"},
    resistance:{f:"低頻率", i:"極輕", t:"極短", ty:"溫和阻力"},
    flex:{f:"視耐受", i:"溫和", t:"短", ty:"靜態伸展"},
    clinical:[{h:"重點", items:["核心是避免「運動後倦怠（PEM）」：採用步調管理（pacing）。","傳統漸進式運動可能有害，需極度保守個別化。"]}]
  },
{
    id:"hiv", cat:"骨骼肌肉與腫瘤 MSK", name:"HIV 感染", en:"HIV", page:778, pageStr:"778", status:"full",
    aerobic:{f:"3–5 天/週", i:"從低強度 30–39% VO2R/HRR 開始適應，漸進至中強度 40–59% 或高強度 60–70%", t:"從 10 分鐘增量漸進至 30–60 分鐘/天，至少 150 分鐘/週", ty:"依健康狀態與興趣調整；有骨質疏鬆時謹慎監測高衝擊或增強式活動"},
    resistance:{f:"2–3 天/週", i:"從輕強度開始，目標漸進至 60% 1-RM", t:"1–2 組漸進至 3 組 × 8–10 下", ty:"機械重量安全有效；初期指導後可用自由重量或彈力帶；鼓勵平衡訓練"},
    flex:{f:"≥2–3 天/週", i:"伸展至緊繃或輕微不適", t:"靜態伸展 30–60 秒 ×2–4 次", ty:"運動後靜態、運動前動態"},
    clinical:[{h:"重點", items:["常合併肌肉量低與肌肉脂肪浸潤、肌力下降。","運動改善體能、心理健康與代謝；注意藥物副作用。"]}]
  },
{
    id:"kidney", cat:"骨骼肌肉與腫瘤 MSK", name:"腎臟病", en:"Kidney Disease", page:785, pageStr:"785-786", status:"full",
    aerobic:{f:"3–5 天/週", i:"中強度起始", t:"漸進至 30 分鐘", ty:"大肌群有氧活動；透析患者可於透析中運動"},
    resistance:{f:"2–3 天/週", i:"中強度", t:"主要肌群", ty:"阻力訓練改善肌肉萎縮"},
    flex:{f:"≥2–3 天/週", i:"溫和伸展", t:"靜態 10–30 秒", ty:"靜態"},
    clinical:[{h:"重點", items:["透析患者可在透析時段運動（intradialytic exercise）。","注意電解質、貧血與心血管共病。"]}]
  },
{
    id:"ms", cat:"骨骼肌肉與腫瘤 MSK", name:"多發性硬化症", en:"Multiple Sclerosis", page:795, pageStr:"795-796", status:"full",
    aerobic:{f:"2–5 天/週", i:"中強度起始，依耐受漸進", t:"漸進累積", ty:"大肌群活動，視功能調整"},
    resistance:{f:"2–3 天/週", i:"中強度", t:"主要肌群", ty:"阻力訓練，注意疲勞與平衡"},
    flex:{f:"每天", i:"溫和伸展", t:"處理痙攣", ty:"靜態伸展，針對痙攣肌群"},
    clinical:[{h:"重點", items:["避免過熱（heat sensitivity）：選涼爽環境、預冷策略。","依疲勞程度調整，避免惡化症狀。"]}]
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
    ]
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
    id:"adhd", cat:"神經與心理 Neuro/Psych", name:"注意力不足/過動症", en:"ADHD", page:863, pageStr:"863-864", status:"approx", detailed:false,
    aerobic:{f:"書中無獨立 FITT 表，請參照相近情境或敘述", i:"", t:"", ty:""}, resistance:{f:"—",i:"",t:"",ty:""}, flex:{f:"—",i:"",t:"",ty:""},
    clinical:[{h:"重點", items:["⚠️ 待補：請用 Claude Code 依「補充指令.md」從 ACSM 第 863-864 頁整理此情境的臨床原則與處方。"]}]
  },
{
    id:"autism", cat:"神經與心理 Neuro/Psych", name:"自閉症", en:"Autism Spectrum Disorder (ASD)", page:866, pageStr:"866-875", status:"approx", detailed:false,
    aerobic:{f:"書中無獨立 FITT 表，請參照相近情境或敘述", i:"", t:"", ty:""}, resistance:{f:"—",i:"",t:"",ty:""}, flex:{f:"—",i:"",t:"",ty:""},
    clinical:[{h:"重點", items:["⚠️ 待補：請用 Claude Code 依「補充指令.md」從 ACSM 第 866-875 頁整理此情境的臨床原則與處方。"]}]
  },
{
    id:"intellectual_disability", cat:"神經與心理 Neuro/Psych", name:"智能障礙/唐氏症", en:"Intellectual Disability + Down Syndrome", page:887, pageStr:"887-891", status:"full", detailed:false,
    aerobic:{f:"（待 Claude Code 從書中填入具體數值）", i:"", t:"", ty:""}, resistance:{f:"（待 Claude Code 從書中填入具體數值）", i:"", t:"", ty:""}, flex:{f:"（待 Claude Code 從書中填入具體數值）", i:"", t:"", ty:""},
    clinical:[{h:"重點", items:["⚠️ 待補：請用 Claude Code 依「補充指令.md」從 ACSM 第 887-891 頁整理此情境的臨床原則與處方。"]}]
  },
{
    id:"cerebral_palsy", cat:"神經與心理 Neuro/Psych", name:"腦性麻痺", en:"Cerebral Palsy (CP)", page:896, pageStr:"896-901", status:"approx", detailed:false,
    aerobic:{f:"書中無獨立 FITT 表，請參照相近情境或敘述", i:"", t:"", ty:""}, resistance:{f:"—",i:"",t:"",ty:""}, flex:{f:"—",i:"",t:"",ty:""},
    clinical:[{h:"重點", items:["⚠️ 待補：請用 Claude Code 依「補充指令.md」從 ACSM 第 896-901 頁整理此情境的臨床原則與處方。"]}]
  },
{
    id:"alzheimer", cat:"神經與心理 Neuro/Psych", name:"阿茲海默症/失智", en:"Alzheimer's / Dementia", page:910, pageStr:"910-911", status:"full",
    aerobic:{f:"3 天/週起", i:"中強度", t:"漸進", ty:"走路等簡單重複性活動"},
    resistance:{f:"2 天/週", i:"中強度", t:"主要肌群", ty:"簡單監督下阻力訓練"},
    flex:{f:"≥2–3 天/週", i:"溫和伸展", t:"靜態 10–30 秒", ty:"靜態"},
    clinical:[{h:"重點", items:["指令簡單、環境熟悉、需照護者監督確保安全。","運動可能延緩認知功能下降並改善行為症狀。"]}]
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
    ]
  },
{
    id:"altitude", cat:"環境考量 Environmental", name:"高海拔", en:"Altitude", page:493, pageStr:"493", status:"none", detailed:false,
    aerobic:{f:"此情境書中無 FITT 處方表，僅有 Special Considerations", i:"", t:"", ty:""}, resistance:{f:"—",i:"",t:"",ty:""}, flex:{f:"—",i:"",t:"",ty:""},
    clinical:[{h:"重點", items:["⚠️ 待補：請用 Claude Code 依「補充指令.md」從 ACSM 第 493 頁整理此情境的臨床原則與處方。"]}]
  },
{
    id:"heat", cat:"環境考量 Environmental", name:"熱環境", en:"Heat / Hot Environment", page:510, pageStr:"510", status:"none", detailed:false,
    aerobic:{f:"此情境書中無 FITT 處方表，僅有 Special Considerations", i:"", t:"", ty:""}, resistance:{f:"—",i:"",t:"",ty:""}, flex:{f:"—",i:"",t:"",ty:""},
    clinical:[{h:"重點", items:["⚠️ 待補：請用 Claude Code 依「補充指令.md」從 ACSM 第 510 頁整理此情境的臨床原則與處方。"]}]
  }
];

const CATEGORIES = ["一般族群 General", "心臟血管 CV", "肺部 Pulmonary", "代謝 Metabolic", "骨骼肌肉與腫瘤 MSK", "神經與心理 Neuro/Psych", "環境考量 Environmental"];
