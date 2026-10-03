# טיוטת שאלות חזרה לכל שיעורי הקורס — 2026-10-03

## מצב והיקף

נכתבה טיוטה של 139 שאלות חזרה: שאלה אחת לכל אחד מ־139 השיעורים בגרסת הקורס 2.2.0. לכל שאלה שלוש אפשרויות, תשובה נכונה, הסבר, סעיף בשיעור ומזהי המקורות שהוגדרו לו. גרסת המאגר היא 1.0.0; מצב המאגר `draft` ומצב הביקורת `requires-human-review`. אין כאן אישור לשחרור או ביקורת הוראה אנושית. הטיוטה אינה מופעלת בממשק הקורס ואינה מחליפה מבחן מעשי או מחוון.

השאלות נכתבו בנפרד לפי התוכן של כל שיעור: למשל פענוח JSON, זיהוי ביצוע חוזר, שיוך תוצאות כלי, התאמת מקור לטענה, תכנון ניסוי קריאייטיב, שגיאות תמלול, מיזוג לקוחות ושינוי בהיקף פיילוט. אין שימוש בשאלה גנרית חוזרת על עצם הגשת ראיות. התשובות הנכונות מפוזרות במיקומים A/B/C, במספרים 47/46/46. זו בחירה של עריכת טיוטה, ולא מדידת איכות השאלות.

## מה נקרא בפועל

כיסוי גופי השיעורים: **139 / 139**. נקראו פסקאות המקור עצמן, ולא רק שמות השיעורים או תקצירים. המקור הציבורי כולל 872,071 תווים. כדי לא להציג פסקאות זהות פעמים רבות, הקריאה נעשתה באמצעות חילוץ מדויק של 1,398 פסקאות ייחודיות, ובהן 241,356 תווים: פסקה זהה לחלוטין נקראה בהופעתה הראשונה; פסקה עם שינוי כלשהו נקראה מחדש. חלוקה זו כללה גם קוד, הנחיות בנייה, מעבדות כשל, אתגרים, בדיקות שליטה, תיעוד והערות. לאחר הקריאה הושווה החילוץ שוב לכל 139 קובצי המקור ונמצא זהה.

כל 139 גופי השיעורים הפעילים הושוו לפי תוכנם לגרסאות המקבילות ב־`content/releases/2.2.0/lessons`; לא נמצאו הבדלים. לא נערך אף שיעור משוחרר, לא שונו מזהים, מחוונים או התקדמות משתמשים. הטבלה למטה מציינת לכל קובץ את מזהה השיעור, SHA-256 של הקובץ שנקרא, סעיף שעליו נשענת השאלה ומזהי המקורות של השאלה. נתיב כל קובץ נקרא הוא `content/curriculum/lessons/<lessonId>.md`; ההשוואה לגרסה המשוחררת משתמשת באותו שם תחת `content/releases/2.2.0/lessons`.

גם `content/authoring/HEBREW_STYLE_GUIDE.md` נקרא במלואו. קובצי הקטלוג והמקורות הציבוריים נקראו כדי לבדוק שיוך מזהים. המקורות החיצוניים עצמם לא נפתחו מחדש במהלך כתיבת הטיוטה; הפניות אליהם הן הפניות הקורס הקיים. אין כאן טענה לאימות טכני עדכני של כל מקור או להרצת כל תרגיל. לא נקראו מסדי משתמשים, סודות, שיחות או מחברות אישיות.

## ביקורת ובדיקות

נוסח השאלות נבדק במהלך הכתיבה מול הסעיפים שנקראו. ביקורת עברית נפרדת של כל המאגר נשלחה לסוכן נוסף, אך הריצה נעצרה בגלל מגבלת שימוש לפני שהתקבל אישור לקריאת המאגר. אין כאן טענה שהביקורת הנפרדת הושלמה. ביקורת עברית אינה ביקורת פדגוגית אנושית ואינה אישור טכני לנכונות כל תשובה.

נוספו בדיקות ממוקדות לסכמה, כיסוי כל המזהים, מקור הסעיפים, שיוך מקורות, ייחוד שאלות ואפשרויות, פיזור תשובות, הפרדה מקוד הלומד, התאמה לקבצים המשוחררים ותיעוד הגיבובים. שש בדיקות הטיוטה עברו במסגרת `npm run quality:audit` ב־2026-10-03. בנק הטיוטה מיוצא לכספת הציבורית בלבד, בתיקייה נפרדת עם מצב ביקורת מפורש; הוא אינו מופעל בשיעורים. הבדיקות המבניות אינן מסוגלות לקבוע בעצמן שנימוק הוא נכון, שכל מסיח טוב להוראה או שאין טעויות עברית.

## החלטות שנדרשות לפני שחרור

יש לבצע ביקורת הוראה אנושית של שאלות, תשובות ומסיחים לפי הטבלה; לבדוק שהשאלה בוחנת את העיקרון המתאים לשיעור ושרמת הקושי מתאימה; ולהחליט על גרסה משוחררת ועל דרך השימוש בה. אין להציג תשובה נכונה בחידון כהוכחה לשליטה מקצועית. כל החידונים נשארים בשלב זה במיקום המבודד `content/authoring/quiz-bank/1.0.0-draft.json`.

## גרסאות ציבוריות שנקראו

- `content/curriculum/curriculum.json`: `dbb2d759fb9c77b7fb8acda05a52fa54f89a25da22172ad65bff8fc77af7b7b7`.
- `content/curriculum/sources.json`: `6663af086db00804043c89f341cddb872db39f8c1aa58e01fda9b007cffc6c04`.
- `content/authoring/HEBREW_STYLE_GUIDE.md`: `e10bb1065d4866b960c31697ee5378ca17bdfc3197c7260bb1e0764e0fd0f564`.
- `content/authoring/quiz-bank/1.0.0-draft.json`: `be65e9590911fc07d000936ba742af72ba4fe6da0dae225c1e7c153b0710cb29`.

| מזהה שיעור                                    | SHA-256 של הגוף שנקרא                                              | סעיף מקור לשאלה | מזהי המקורות                                 |
| --------------------------------------------- | ------------------------------------------------------------------ | --------------- | -------------------------------------------- |
| W01D01_FIRST_AI_PROGRAM                       | `ebdaedb1bbdefa3124b6f1d5eb428771c98ee41122b8f4d29486aa183ce5cb60` | Concepts        | PYTHON_TUTORIAL, OPENAI_QUICKSTART, GIT_BOOK |
| W01D02_PYTHON_FOR_AGENT_BUILDERS_I            | `3f3496d5b0333d006de144419f137fb48da60f898fbd34b1aa5695559cee9383` | Build First     | PYTHON_TUTORIAL                              |
| W01D03_PYTHON_FOR_AGENT_BUILDERS_II           | `f9b1a391dc916bc4588a90a048bea15b1986085c3375d4e1c426c13b31891f8c` | Build First     | PYTHON_JSON, PYTHON_TUTORIAL                 |
| W01D04_HTTP_APIS                              | `c6740249f35f81a1b50588f32bbbcabc94f72911ca41275f0474e6fef31a633e` | Concepts        | HTTP_OVERVIEW, PYTHON_JSON                   |
| W01D05_PROJECT_AGENT_ZERO                     | `b95edb571d1d2085c0a6cdc8cc0aae1d57efdcf5d9bf7e0219e226a72bb68cfb` | Failure Lab     | OPENAI_TOOLS, PYTHON_TUTORIAL                |
| W02D06_HOW_LLM_APPLICATIONS_WORK              | `f3b6524f7271e1fffe6fc6da0c9a5ddcc948c0081f324e97feaf79c7370f4342` | Concepts        | OPENAI_QUICKSTART, GOOGLE_ML                 |
| W02D07_CONTEXT_ENGINEERING                    | `28639894e47d7a262d94f860c9430c53f1c5eade918471c448bca3fd89062824` | Concepts        | OPENAI_QUICKSTART, ANTHROPIC_AGENTS          |
| W02D08_STRUCTURED_OUTPUTS                     | `72256998d280234d42fadb6a803c3e836a3c7662fdba5aaf6bd3b470ec557386` | Concepts        | OPENAI_SCHEMA, PYTHON_JSON                   |
| W02D09_MODEL_RELIABILITY                      | `8d5f27664f326f43ea91e30f1667e91f6ec638248d1859f4fd04338d418e4831` | Build First     | PYTHON_TUTORIAL, ANTHROPIC_AGENTS            |
| W02D10_PROJECT_INTELLIGENT_INTAKE_ENGINE      | `1310517ea4151c73ed4efec017de6d7e00716cd9c5adcd8b7dfc787fdd240049` | Build First     | PYTHON_TUTORIAL, ANTHROPIC_AGENTS            |
| W03D11_WHAT_MAKES_SOMETHING_AN_AGENT          | `ca80590cbd16d88f55c1be5368d6dbb3a5d19bc78495e751bb989df3b36b0821` | Concepts        | PYTHON_TUTORIAL, ANTHROPIC_AGENTS            |
| W03D12_TOOL_CALLING                           | `3627eb3e16a735b6affcb8e1b540300e3eea5404d093e135650b188eef83beea` | Build First     | OPENAI_TOOLS                                 |
| W03D13_AGENT_LOOP                             | `3d978a2ce29c7839cde3fdd4643b3bd68fe534e5db4070ccf4eda393788c5468` | Concepts        | OPENAI_TOOLS, ANTHROPIC_AGENTS               |
| W03D14_RELIABILITY_FAILURE_HANDLING           | `5bf786cfca5c50bef5391179d4b8bc0864e8aecd554b35d59d5336a918715862` | Build First     | PYTHON_TUTORIAL, ANTHROPIC_AGENTS            |
| W03D15_PROJECT_AGENT_FROM_SCRATCH             | `ac014573ab7cdb6378327f6f8707bdfe265e9c04328d1e15d6c54da8d55f7d31` | Concepts        | PYTHON_TUTORIAL, ANTHROPIC_AGENTS            |
| W04D16_TASK_DECOMPOSITION                     | `a2927db64ea0d728d8694f6dd422c6ae755e978a5eb73abe893a1e56812ecea5` | Concepts        | ANTHROPIC_AGENTS, OPENAI_TOOLS               |
| W04D17_SEARCH_EVIDENCE                        | `3ec27505d745e91dbe968e0d9004cc9e7f4146f6666973a46504135b438a907a` | Build First     | ANTHROPIC_AGENTS, OPENAI_TOOLS               |
| W04D18_ITERATIVE_RESEARCH                     | `6fc4abd71ad962fac19a6393804d30abfa2dc93c2344fedb7e13452251f6c46c` | Concepts        | ANTHROPIC_AGENTS, OPENAI_TOOLS               |
| W04D19_RESEARCH_QUALITY                       | `b9bd1e3de9b42bda84d4c2a8062a117309a6b9fc4a35d6822c3f7a496d0063bd` | Failure Lab     | ANTHROPIC_AGENTS, OPENAI_TOOLS               |
| W04D20_BOSS_LEVEL_1_RESEARCH_AGENT            | `0be338e49c83dd4b5a9d495f9575613e236aa8881c501e408f03a4ad380bcb1e` | Concepts        | ANTHROPIC_AGENTS, OPENAI_TOOLS               |
| W05D21_DATABASES                              | `3e555c53847f6423ff7ccfb6f3dfefdff3220da0f1427c207927967a1a294050` | Concepts        | PYTHON_SQLITE, POSTGRES_TRANSACTIONS         |
| W05D22_STATE                                  | `0f93eec747b97ccc0539db71d23ede9626c1471128d1b9062c12c768c7e2c9e7` | Build First     | PYTHON_SQLITE, LANGGRAPH_STATE               |
| W05D23_AGENT_MEMORY                           | `8fa73632b0d9187e48501ebb977280cb82b8c72a0e43d6d0953efe0158a4ebf8` | Concepts        | SEARCH_SECURITY, ANTHROPIC_EVALS             |
| W05D24_MEMORY_QUALITY                         | `fe35b835e317e7231a9bd79bf3b9a3d377ab63b3e694a4a6729130f0355dac9a` | Concepts        | SEARCH_SECURITY, ANTHROPIC_EVALS             |
| W05D25_PROJECT_PERSONAL_MEMORY_AGENT          | `2020d2e620d49b921287d3155828b272ec49274425ffe4cb5974eae36c99e600` | Concepts        | SEARCH_SECURITY, ANTHROPIC_EVALS             |
| W06D26_EMBEDDINGS                             | `3a9130be7040414e51213f42932407f732931068fb64e686f673143750e9f5da` | Concepts        | SEARCH_SECURITY, ANTHROPIC_EVALS             |
| W06D27_CHUNKING_VECTOR_RETRIEVAL              | `16de07fb4b681fb4c5230e8d52857232246d227a6515f59066364a39f70a72ca` | Build First     | SEARCH_SECURITY, ANTHROPIC_EVALS             |
| W06D28_HYBRID_RETRIEVAL_RERANKING             | `64c424a07e6e8c81f232cbcd3fcdd432f82bbb37fe2ed2f083ddc9cf5e523354` | Concepts        | SEARCH_SECURITY, ANTHROPIC_EVALS             |
| W06D29_RAG_FAILURE_MODES                      | `6d336e64d19b823f1cba49c551b2b04a9135f2214cb910e3ba2e1108212043f3` | Concepts        | SEARCH_SECURITY, ANTHROPIC_EVALS             |
| W06D30_PROJECT_KNOWLEDGE_AGENT                | `f266a064912e0314829a5373b56219cf13b16b5d190a88c7ef6b6ea8ba5da2e6` | Concepts        | SEARCH_SECURITY, ANTHROPIC_EVALS             |
| W07D31_PRODUCTION_APIS                        | `f2d4df6bad98843a2449dca05557e48f5a2d731c7fe2d4cca0d5e9c63e7688bd` | Build First     | HTTP_OVERVIEW, STRIPE_WEBHOOKS               |
| W07D32_TOOL_DESIGN                            | `b69ad934f1ac935c8ffa0657f57294b82a2ebb3885b00159edeb51b90c9cdcbf` | Concepts        | N8N_APPROVALS, STRIPE_WEBHOOKS               |
| W07D33_MCP                                    | `ead2027bf5af880be3d5ff97b7585e7962b3d0e76480b2385b95bfa812a1f4b5` | Concepts        | MCP_SPEC                                     |
| W07D34_SIDE_EFFECTS_PERMISSIONS               | `fbd405e9f7446d06169a3a1b56c60576b8576eb2ad08bd0602fb15cde69feea1` | Concepts        | N8N_APPROVALS, STRIPE_WEBHOOKS               |
| W07D35_PROJECT_OPERATIONS_AGENT               | `4014d70c9aa79ca6207bfa4b10d7de682d8ac589ba57defd6621f5eb3ba4dc3f` | Concepts        | N8N_APPROVALS, STRIPE_WEBHOOKS               |
| W08D36_RESPONSES_API                          | `66790f97d958cdbb8087a7c62817d44c8762bd12f8d78c1c55d40ef9b771a6ce` | Concepts        | OPENAI_TOOLS, OPENAI_QUICKSTART              |
| W08D37_AGENTS_SDK                             | `6b28d1cc6208af80761e8f4f03f5363e24d5d2a7750b016f8d9b6e8d4f693304` | Concepts        | OPENAI_AGENTS                                |
| W08D38_MANAGED_DURABLE_AGENT_RUNTIME_CONCEPTS | `467e6491facfd6a2c028b2e0422ba000fefba54686da85736390614b72784b39` | Concepts        | OPENAI_RUNTIME, OPENAI_DEPRECATIONS          |
| W08D39_LANGGRAPH                              | `faf2c780a7cf2d0a31c3cc26048ef06c9873007e725eaa43b36d584513681ab2` | Concepts        | LANGGRAPH_STATE                              |
| W08D40_BOSS_LEVEL_2_BUILD_ONE_SYSTEM_TWICE    | `567c01d5051193ad92cf596ef198a981fdb631fe0fff7f1c7a1798a589845bbe` | Concepts        | ANTHROPIC_AGENTS, OPENAI_TOOLS               |
| W09D41_DETERMINISTIC_VS_AGENTIC_WORKFLOW      | `64e0968fc026d2200eb4cd4a8161220fa509d1d673bd789e4af8420eb872eaba` | Concepts        | ANTHROPIC_AGENTS, OPENAI_TOOLS               |
| W09D42_ROUTERS                                | `0cd7d6fc660a9a3b8313fe9cf53d7c26800a2ae4fd4d55ad91f4d0bfe2c1fe66` | Concepts        | ANTHROPIC_AGENTS, OPENAI_TOOLS               |
| W09D43_PARALLEL_WORK                          | `0d797c16098cab58dc38c5b4e43049fbe6dd6f61b275ce917b22c23b27fd8369` | Build First     | PYTHON_ASYNC                                 |
| W09D44_LONG_RUNNING_WORKFLOWS                 | `5ccc87713253e8683376f6c5100d6e5e4cf23c38e3c962fc71a674974cdb6893` | Build First     | LANGGRAPH_STATE, STRIPE_WEBHOOKS             |
| W09D45_PROJECT_DURABLE_WORKFLOW_AGENT         | `96732aaf9f6b246182cde24cdca1289d3f30baf9b737810766cef15e94c05e5f` | Concepts        | LANGGRAPH_STATE, STRIPE_WEBHOOKS             |
| W10D46_WHEN_MULTI_AGENT_MAKES_SENSE           | `21d524f534941bf7ac4182f0b51e3d3bbfb737741170251537267f1bb9687e4e` | Build First     | ANTHROPIC_AGENTS, OPENAI_TOOLS               |
| W10D47_MANAGER_PATTERN                        | `daeed8c5016ed0a64c77ccd202600fa9206ba51836e177767e5c4f05a0e1ab4f` | Concepts        | ANTHROPIC_AGENTS, OPENAI_TOOLS               |
| W10D48_HANDOFFS                               | `dc4463d168a6b0a170f2060e8ad8a9468a8c208457cd87d12d37fc494bb9ea97` | Concepts        | ANTHROPIC_AGENTS, OPENAI_TOOLS               |
| W10D49_SHARED_STATE_COORDINATION              | `4eb7a24c2ddffe220eb11e761f25167e6df7132ee019e04a3de1abc1030677df` | Build First     | ANTHROPIC_AGENTS, OPENAI_TOOLS               |
| W10D50_PROJECT_AI_COMPANY                     | `b833a284b9af4de7a272a4465f247a977aa5458b237ece68df2c281d8759dd56` | Concepts        | ANTHROPIC_AGENTS, OPENAI_TOOLS               |
| W11D51_WHY_DEMOS_LIE                          | `42f6d085debd8e638ba56c02d85cc3d10394794a7892a181964c5a19ca7dac8f` | Concepts        | PYTHON_TUTORIAL, ANTHROPIC_AGENTS            |
| W11D52_EVALUATION_DATASET_DESIGN              | `86c24492643d64c9938e4b43ffc7900f4900cf957857b807df6e740926bc4223` | Concepts        | ANTHROPIC_EVALS, PROMPTFOO_TESTS             |
| W11D53_GRADERS                                | `419daaee9ed9d2c1a1513c4d6eba907825138bb1f3039a1da4ae68bde9de17a7` | Concepts        | ANTHROPIC_EVALS, PROMPTFOO_TESTS             |
| W11D54_TRACING                                | `f54d1c0f7922b5bd4695fd24b3b6316d29c509aba86fa5c9a0ab224edf1fa0bd` | Build First     | OTEL                                         |
| W11D55_PROJECT_AGENT_QUALITY_LAB              | `00b378a2bdc49c1440bac0835f4931b38d34cb61656387a6e8874a77345ed11c` | Concepts        | ANTHROPIC_EVALS, OWASP_GENAI                 |
| W12D56_PROMPT_INJECTION                       | `7d6537789c4239c21351f90bbc8612840d5c67a1ac027464cbe063d789e9d64a` | Concepts        | ANTHROPIC_EVALS, OWASP_GENAI                 |
| W12D57_TOOL_ATTACKS                           | `f32e4bff19840ffc71ae2bab67404dfba1ae5a96b6f9f0141ee65c26069998ae` | Concepts        | ANTHROPIC_EVALS, OWASP_GENAI                 |
| W12D58_AUTHENTICATION_AUTHORIZATION           | `34c6755a284000ee88c38ea98a0c09923d543b0c428bedd19eb0f4d32bcc455b` | Concepts        | SEARCH_SECURITY, OWASP_GENAI                 |
| W12D59_HUMAN_IN_THE_LOOP                      | `af5021bb78430e4cf748f6a4f56296fb89a8dc32ebd202a26559fc2a1201f6f6` | Concepts        | N8N_APPROVALS, LANGGRAPH_STATE               |
| W12D60_BOSS_LEVEL_3_RED_TEAM                  | `1779a2bb45e6cccf7a5b07df556e658199c783a38d555686ac66e320b8dd9754` | Failure Lab     | ANTHROPIC_EVALS, OWASP_GENAI                 |
| W13D61_BACKEND_APIS                           | `7fca1136384b16f6041b0eea3de118f0e7f013e19944fe0ac7a0e40caf2062ef` | Build First     | FASTAPI                                      |
| W13D62_PRODUCTION_DATABASES                   | `58f9255dd0a50cae7756304f2f7b0b129a4672d613d96b919c07b64f16c0546c` | Build First     | POSTGRES_TRANSACTIONS                        |
| W13D63_QUEUES_WORKERS                         | `17be5496924fef76785dd51b7ceeee798872873b85ba76110ba9a5e89cbaeb06` | Concepts        | STRIPE_WEBHOOKS, OTEL                        |
| W13D64_STREAMING                              | `2f148e3e3e39980992f536567c57ccc123a561c88d9feb19f9f3c68d2c3c60dc` | Concepts        | HTTP_OVERVIEW, FASTAPI                       |
| W13D65_PROJECT_CONVERT_AGENT_INTO_API_SERVICE | `291cf49c0db6a919a9b202990c1cf5f3b0c8e0a2421870a4df8b3178bb0815e5` | Build First     | FASTAPI, OTEL                                |
| W14D66_FRONTEND_FUNDAMENTALS                  | `b009b2dc1fdfe7d393ab4f060841dc69206f056f7cbb475900898a1453668f18` | Challenge       | REACT, NEXTJS                                |
| W14D67_AGENT_UI                               | `a76f2f54b618dbcbe230a96936537dbe40a9941289e2602190452a49da56b892` | Concepts        | REACT, N8N_APPROVALS                         |
| W14D68_DEPLOYMENT                             | `80fb15b8e9e4d4cd4d0eb6e65efb82aaef7605f0f94f868366375245fc10cb4d` | Concepts        | DOCKER, NEXTJS                               |
| W14D69_PRODUCTION_CONCERNS                    | `3908d747d1b4eb4387837f3adbe867caacff8c9d36823f18c7d46e25edb7ec6a` | Concepts        | OTEL, OPENAI_DATA                            |
| W14D70_PROJECT_AGENT_SAAS                     | `0dcb5e0e9f39cc089d753134dc800bbaf9826e467e4c8ea0d80b3a6538fac904` | Concepts        | FASTAPI, OTEL                                |
| W15D71_BROWSER_COMPUTER_AGENTS                | `46b8ac5371f22448355febedd877f9feafbaec722f45b86b01868d44bc2bd392` | Concepts        | ANTHROPIC_AGENTS, OWASP_GENAI                |
| W15D72_CODE_SANDBOX_AGENTS                    | `cfd0f37b5a54437bc5bfebe3ce87be39c60e952ba1f27ad1b10e2301ec939aed` | Failure Lab     | DOCKER, OWASP_GENAI                          |
| W15D73_DYNAMIC_TOOLS                          | `31c430a19c402da4038ac0fe43b69bc0486fe0688e7b4d02b17d26fcc68d910e` | Concepts        | MCP_SPEC, OPENAI_TOOLS                       |
| W15D74_AGENTIC_CODING                         | `41bbee9e37b7ba46dba160e63d4257703cc5822d6972491d1074807e12a33fe6` | Concepts        | ANTHROPIC_AGENTS, OPENAI_TOOLS               |
| W15D75_PROJECT_AUTONOMOUS_WORKFLOW            | `1eee45638aba7debfea80169288bb87fa966eb6d47fe2033f4d4c76b78323164` | Concepts        | ANTHROPIC_AGENTS, OPENAI_TOOLS               |
| W16D76_DISCOVERY                              | `3c11130e81c0ae9a9cb96fd20a44c8923959b5a6a0dcc6c24606028244c701b6` | Concepts        | OWASP_GENAI, ANTHROPIC_EVALS                 |
| W16D77_ARCHITECTURE                           | `e62598eb939ad2204756b8a60d9931dc94f9b566d98b1766c221da521f3ba017` | Concepts        | OWASP_GENAI, ANTHROPIC_EVALS                 |
| W16D78_BUILD                                  | `1e9ab3b22d6fff8baff40221a5f20eca90904f6bafe2be7216fd2ba880586169` | Concepts        | OWASP_GENAI, ANTHROPIC_EVALS                 |
| W16D79_HARDEN                                 | `3190a6258b80ae2645558b59a0a94dd922a3d3bc7b330e7594106ce0812e3053` | Challenge       | OWASP_GENAI, ANTHROPIC_EVALS                 |
| W16D80_FINAL_BOSS_DEMONSTRATE_FULL_SOLUTION   | `7d9715a29d8ca85ff58e4dc9a1e75ff220525314095710181c56bb4a62e3adbf` | Concepts        | OWASP_GENAI, ANTHROPIC_EVALS                 |
| FND_01                                        | `8e081bffb45c98522a5f8e79b0c412fc505481baf1fcc27f9986ecc7707865fb` | Build First     | GOOGLE_ML, ANTHROPIC_AGENTS                  |
| FND_02                                        | `860380d592453c874f9f05ed7e96bf5f0c2c63dbee787f1c63cb0c759cc48e59` | Concepts        | ANTHROPIC_EVALS, OPENAI_DATA                 |
| FND_03                                        | `365398ee62426203d9281961dd8434259a5132482c136ae2fb1665a1d9457853` | Concepts        | GEMINI_DOCUMENTS, OPENAI_AUDIO               |
| FND_04                                        | `fd18c2237e5115bfb186b8e6833c656a4f5db98980a3e1b7344fe796778c9027` | Concepts        | PYTHON_TUTORIAL, ANTHROPIC_AGENTS            |
| AGT_01                                        | `0df92b1537019b079fd40baaaed263a34a66bdf7ce9a8a9b60aa4fcddf0364da` | Build First     | MCP_SPEC, A2A_SPEC                           |
| AUT_01                                        | `0c8abf610898c89e7c50dd0f171e2b554a7f90983d9cb90f93f6ff18340371e9` | Concepts        | N8N_WEBHOOK, N8N_APPROVALS                   |
| AUT_02                                        | `10a07331361547b01f8826b02d840671eda060c906ea14805795b9657fb2e3d9` | Build First     | N8N_WEBHOOK, HUBSPOT_WEBHOOKS                |
| AUT_03                                        | `234b59446b6d920bbf8d86f0e94704cc451bf50bc2a6f4faf4bfebc849fef1cf` | Concepts        | OPENAI_SCHEMA, N8N_APPROVALS                 |
| AUT_04                                        | `2e385ed84c6dcf39c1e8bd2218206e3d507844ec38b5adde40a6e877c98583bf` | Concepts        | STRIPE_WEBHOOKS, POSTGRES_TRANSACTIONS       |
| AUT_05                                        | `defec806baad0cde2573170605c5337d50eda8c69da09bccfd377809c519f741` | Challenge       | N8N_APPROVALS                                |
| AUT_06                                        | `97d4b210a8f54f555e73e25a1e39dec6c0d407a71a6294ba4363ef8a7aadfe82` | Build First     | MAKE_AGENTS, N8N_EVALS                       |
| AUT_07                                        | `8b2371e1a51e81992c7928db0d94c7b1fd2b3b0b8e5b34697ed55fc0cb3d9862` | Concepts        | COPILOT, POWER_DLP                           |
| AUT_08                                        | `e31f54312c510e18d07308fabe141b243c34595962a7da285775eb169ab90c1e` | Concepts        | N8N_APPROVALS, STRIPE_WEBHOOKS               |
| MKT_01                                        | `b8444e584571000c94e85385761c8065f51ba3da9508f814a5c100882d9b45c2` | Concepts        | GOOGLE_AI_CONTENT, OPENAI_SCHEMA             |
| MKT_02                                        | `5218bdcf5cffb0d5de78f14d51971dd38a69cfa34b97589a551200243c64e6b6` | Concepts        | GOOGLE_AI_CONTENT, OPENAI_SCHEMA             |
| MKT_03                                        | `fd9072308394fdf1c22f24a4f79aa0816d1a0d1a72b57af5cb88d8d06d610626` | Concepts        | GOOGLE_AI_CONTENT, OPENAI_SCHEMA             |
| MKT_04                                        | `187bed5813038e6bef0984de752f757a9741d45595fa4735d15a3b582bb40ccd` | Concepts        | OPENAI_QUICKSTART, GOOGLE_AI_CONTENT         |
| MKT_05                                        | `5b0b8669bfecaefea682c9366dc1dc0a0e8a48eafb36b2d57507da20c1548a86` | Concepts        | OPENAI_SCHEMA, GOOGLE_AI_CONTENT             |
| MKT_06                                        | `5e1c7b2984f0bbb4bcdcfc70cc78ce195a71920d2f956eb1f765169c5402ad8f` | Concepts        | OPENAI_IMAGE                                 |
| MKT_07                                        | `7ebee566766abeb4526823db4bff821707b3066b45d83fa6e98a910e46c38abc` | Concepts        | OPENAI_VIDEO                                 |
| MKT_08                                        | `00d0b636f268464b06d22fca2ca0304a5930aefbad64795d23829d72a92adf98` | Concepts        | OPENAI_AUDIO                                 |
| MKT_09                                        | `c1d01ae2668ff4b3f5c0f2ea3ebe2aa2fd10b0f91a5e476a19947fab778e8935` | Concepts        | GOOGLE_AI_CONTENT, N8N_APPROVALS             |
| MKT_10                                        | `3cd8c1904a8833df7645d2463f492a8fa48d19f728e32a9b9a5ee2eb86730828` | Concepts        | GOOGLE_AI_CONTENT, OPENAI_SCHEMA             |
| ADS_01                                        | `8c204c2598fcb521909b547f9d571a9f69c3b5cfd3e4af13cd83767a0e095950` | Concepts        | GOOGLE_ADS_TESTS, ANTHROPIC_EVALS            |
| ADS_02                                        | `e8a0cb24a93599d0f9dd4b622f02bdc3afe06415bb652730dfb454bf558dd945` | Concepts        | GOOGLE_ADS_TESTS, ANTHROPIC_EVALS            |
| ADS_03                                        | `37a815914bcfc0baed1101b12cfeb7a852452601caa5179fb049ca34ccff5447` | Concepts        | GOOGLE_ADS_TESTS, ANTHROPIC_EVALS            |
| ADS_04                                        | `c33f8a45429333df74616dd56b1f675c33d29b3ee77fd70c790092b1757a5e81` | Concepts        | GOOGLE_ADS_TESTS, ANTHROPIC_EVALS            |
| ADS_05                                        | `17b861bc96947a09da5271d7e49d519a78a293dc414bc1f32334891ea0f658c2` | Concepts        | GOOGLE_ADS_TESTS, ANTHROPIC_EVALS            |
| ADS_06                                        | `7250a17da1162b417e3578a0f6bcabeae1dc0b2872f9b8ccdd3bee0054e996d0` | Concepts        | GOOGLE_ADS_TESTS, ANTHROPIC_EVALS            |
| CRM_01                                        | `ff59b96654c2c8a46f9e719e6f49b1aff7f5a054aca161522e6a91f0ad138739` | Concepts        | HUBSPOT_WEBHOOKS, STRIPE_WEBHOOKS            |
| CRM_02                                        | `291ae2625432e3f4d9693fdcd179cd1eb73d357a219f83fc003a4131596b5bf3` | Concepts        | HUBSPOT_WEBHOOKS, STRIPE_WEBHOOKS            |
| CRM_03                                        | `45339afe1bbfcec08690cb577417ed21a862dc57e652f688e7964d36588a94ea` | Concepts        | HUBSPOT_WEBHOOKS, STRIPE_WEBHOOKS            |
| CRM_04                                        | `5527150a061d06149568e8df5c27e6c6ad2654d4ab8f683b0be2f86736fc586f` | Concepts        | POSTGRES_TRANSACTIONS, OPENAI_SCHEMA         |
| CRM_05                                        | `5eb4f8b069680ab736b454c6ba4a0f08c790bf16161545e267e2a6c9d74c621f` | Concepts        | TWILIO_SANDBOX, HUBSPOT_WEBHOOKS             |
| CRM_06                                        | `4419f5ad3d96dd60bc5599be02a81f03f84c86d7bd80301add685151fe5c79a5` | Concepts        | SEARCH_SECURITY, OWASP_GENAI                 |
| CRM_07                                        | `a81ce64914d66c2b4202d930569942eee131f09c438ef8db17fddc596a41b059` | Concepts        | POSTGRES_TRANSACTIONS, STRIPE_WEBHOOKS       |
| CRM_08                                        | `5ff39aaca5ba6f59722d524e815d96026c187a093f33683656d7998003e4e6a7` | Concepts        | HUBSPOT_WEBHOOKS, STRIPE_WEBHOOKS            |
| WEB_01                                        | `205c7f68caaece0a92100a0dd7034ff0ff007557f74ddbd352e68976b96a1271` | Deep Dive       | REACT, NEXTJS                                |
| WEB_02                                        | `bab092882d40cd7810ec76af37b199f7706b53b99e39865292c614772f0294d0` | Concepts        | WCAG, REACT                                  |
| WEB_03                                        | `9b8c903c26e2c4e27a16415da3cc22a495e8cfe7f2747c0da3a3d38b43a6eb6e` | Mastery Check   | REACT, NEXTJS                                |
| WEB_04                                        | `b869aa97840aa5701e2a3885748043b7502cb9385c45b8ca2ec7114305827780` | Concepts        | FASTAPI, HUBSPOT_WEBHOOKS                    |
| WEB_05                                        | `15b8ebbe1948bd139f6c50706d64ccc1ab5638ade51b611cd27efbef99fab3c3` | Concepts        | WCAG, DOCKER                                 |
| WEB_06                                        | `49be7e581b803ed546fa43986f64565589820d717b0b9030cecaba9bd8d7af1b` | Concepts        | REACT, NEXTJS                                |
| VOI_01                                        | `bde7087ac62ccbbb57d467080cdfb4a3adf543dad7b454bdd6e597216d7fabe1` | Concepts        | OPENAI_AUDIO                                 |
| VOI_02                                        | `d607ef575c962175a0dff6b5ed7701629570a1eb059722b21952e17bed2d4fe0` | Challenge       | OPENAI_AUDIO                                 |
| VOI_03                                        | `627012ff13cd190506aa370e81e3ad7cb52cb6e7c15a6b1279bf5e3183a49d40` | Concepts        | OPENAI_AUDIO                                 |
| VOI_04                                        | `38bece2ec67fd18bb40894467abec34f4021f57feb6b4e12a5138a85c3486469` | Concepts        | OPENAI_WEBRTC, OPENAI_AUDIO                  |
| VOI_05                                        | `86d3c7eb559180857812cee666c5fc8aa418f6883d29e022638bec33f37ebc8f` | Concepts        | OPENAI_AUDIO, HUBSPOT_WEBHOOKS               |
| VOI_06                                        | `90569202fee57e6815880c2f4cb896954d08b24ae43f57ebbc8d26d31c92898b` | Concepts        | OPENAI_AUDIO, GEMINI_DOCUMENTS               |
| DAT_01                                        | `b65b6740424213dff11104ec39016b90c02c64a6e88dbc104e96d985e3b19db8` | Deep Dive       | PYTHON_SQLITE, POSTGRES_TRANSACTIONS         |
| DAT_02                                        | `0289124e6ed72dbddde28b3157392dc33dc0d98d38d9606fbc7d11a02add68ec` | Concepts        | GOOGLE_ML, OLLAMA_SCHEMA                     |
| DAT_03                                        | `6b24e48f8a3788d0fa1a8b6f57662a468cf6275c392c2362ebf2f21943ce150a` | Concepts        | OLLAMA_SCHEMA, OPENAI_DATA                   |
| DAT_04                                        | `a8b25a881679291f6e46274a46e7e0e531a4f6863b3917163628cc39bc5b85d9` | Concepts        | PEFT_LORA, ANTHROPIC_EVALS                   |
| BIZ_01                                        | `21fcd5848227c1305ce984bdc9f11693662f8836dd621155479478da16f43650` | Concepts        | ANTHROPIC_AGENTS, ANTHROPIC_EVALS            |
| BIZ_02                                        | `088453935d6e59aaeccb89612aeb92ecb12d7d784fe824f037cbdac7ddacb3d8` | Concepts        | ANTHROPIC_AGENTS, ANTHROPIC_EVALS            |
| BIZ_03                                        | `0692e9e42a0297747a7329952d281e949bb46d359d6fcc7e368aefa1bc91c8b8` | Concepts        | ANTHROPIC_AGENTS, ANTHROPIC_EVALS            |
| BIZ_04                                        | `52fac964f06216590fc5bfb563bc98adb2e5cd013d09fe2439755bff6d3eb57e` | Concepts        | OPENAI_DATA, OWASP_GENAI                     |
| BIZ_05                                        | `faa64da39266b937d906c7e3c95fb97dc68ee97cb38229cd9d1ad60ca915f1a1` | Concepts        | ANTHROPIC_AGENTS, ANTHROPIC_EVALS            |
| BIZ_06                                        | `74886664f0d7becd930bb405abcf38cd9124c4b18f26a45db1a052456d165792` | Mastery Check   | ANTHROPIC_AGENTS, ANTHROPIC_EVALS            |

זמן תיעוד השלמת קריאת המקורות וכתיבת הטיוטה (UTC): 2026-10-03T08:44:08.465932+00:00.
