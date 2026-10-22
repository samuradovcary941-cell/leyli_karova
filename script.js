/* Images and the hero video are plain <img src> and <video><source src> tags in the HTML above: paste your links there.
   PIECES come from the <figure class="piece"> items inside #ring (name, optional data-sold / data-year,
   data-process = link for that piece's "View process" button; empty = scrolls to the #process section). */
const WORKS=[...document.querySelectorAll('#ring .piece')].map(el=>({name:el.dataset.name||'', year:el.dataset.year||'', sold:el.dataset.sold==='true', note:{en:'One of one',ru:'Единственный экземпляр',tk:'Ýekeje nusga'}, process:(el.dataset.process||'').trim(), el}));
/* INSPECT: points on the back image. x/y = marker in %, cx/cy/z = zoom target. */
const INSPECT = [ {x:49.2,y:25.0,cx:49.5,cy:38,z:2.4}, {x:65.3,y:60.5,cx:66.3,cy:53.9,z:2.4}, {x:41.7,y:71.0,cx:40.7,cy:73.6,z:2.4}, {x:20.3,y:51.3,cx:25.7,cy:48.6,z:2.4} ];

/* Add real reviews here; the section stays hidden while the list is empty.
   Example: { en:'Text', ru:'Текст', who:'Name, City' } */
const REVIEWS = [];

const I18N = {
  en:{
    cta_order:'Order a piece',nav_author:'Author',menu_aria:'Menu',au_h:'The author, around the world',au_s:'Where the ornament has travelled.',au_p:'Leyli wears her own work wherever she goes. A boat at sea, the rooftops of Milan Cathedral, a flooded square in Venice, the New York waterfront at sunset, an old-town street lined with easels, a park in tulip season. Cities and light keep changing; the ornament stays the same and meets every new place as if it had always belonged there.',au_cta:'Follow along on Instagram',au_l1:'At sea',au_l2:'Milan · Duomo roofs',au_l3:'Milan · Duomo terraces',au_l4:'Milan · Piazza del Duomo',au_l5:'Venice · Piazza San Marco',au_l6:'New York · waterfront',au_l7:'New York · Times Square',au_l8:'Dubai · night',au_l9:'Old town',au_l10:'Tulip season',au_l11:'Up close',au_aria:'Photos from around the world',au_cl_h:'7 places, one ornament',au_cl_s:'At sea · Milan · Venice · New York · Dubai · Old town · Tulip season',au_lb:'Photo viewer',au_lb_p:'Previous photo',au_lb_n:'Next photo',pv_h:'Watch a pattern being born',pv_p:'A short silent clip from the studio, from the first line to the last stroke.',pv_cta:'More process on TikTok',pv_tag:'No sound',pv_aria:'Silent process video: an ornament being painted by hand',pv_toggle:'Play or pause the video',ig_post:'Post {n} on Instagram',pv_c1:'Hand-painted',pv_c2:'One of one',seo_t:'Leyli Karova — Hand-Painted Blazers, One of One',seo_d:'Leyli Karova is an artist who hand-paints ornament and portraits on blazers and jackets: Turkmen motifs or any story you choose. Every piece exists once. Order a one-of-one piece.',
    soc_h:'Follow along',soc_s:'New pieces, process and behind the scenes.',soc_ig_d:'New pieces, stories and reviews.',soc_tt_d:'Process videos and behind the scenes.',soc_open:'Open',soc_soon:'Coming soon',
    copy:'© 2026 Leyli Karova. All artworks and images on this site are protected by copyright. Copying or using them without written permission is prohibited.',
    ig_follow:'Follow',ig_msg:'Message',ig_contacts:'Contacts',ig_cat:'Artist',ig_hl2:'Reviews ❤️',
    ig_view:'View in Instagram',
    hero_p:'Hand-painted ornament and portraits on blazers. Every piece exists once.',proc_s:'One person, one blazer, four steps.',
    faq_p:'Can\'t find your answer? Ask Leyli directly.',faq_cta:'Write to Leyli',
    lk_h:'Look closer',in_hint:'Choose a point on the painting.',in_reset:'Zoom out',
    tr1h:'The front, kept clean',tr1p:'This blazer keeps its front quiet on purpose. On yours, the painting can go anywhere: front, sleeves, collar. Scroll to turn it around.',
    tr2h:'The side',tr2p:'The first gold motifs appear at the seam.',
    tr3h:'The other side',tr3p:'The painting wraps around the seam and grows toward the back.',
    tr4h:'The back',tr4p:'Here it is: a portrait in traditional Turkmen dress, painted by hand.',
    in1h:'The portrait',in1p:'A woman in traditional Turkmen dress, painted by hand across the whole back.',
    in2h:'The pattern',in2p:'The veil carries a carpet pattern. Every motif is drawn separately.',
    in3h:'The jewellery',in3p:'Silver, stones and tassels, rendered down to the red inlays.',
    in4h:'The gold ornament',in4p:'Fine gold motifs scattered around the portrait, like a second layer of the story.',
    ab_r1:'Art that',ab_r2:'remembers',ab_r3:'its roots.',mq1:'Ornament',mq2:'Hand-painted',mq3:'One of one',mq4:'Any motif',
    bn2_h:'Made by hand. <span class="ol">Worn by one.</span>',bn2_p:'From the first line to the last, the ornament is painted by hand. The blazer that leaves the studio exists only once.',bn2_cta:'See the pieces',
    bn_h:'An ornament is a <span class="ol">language</span> older than fashion.',bn_p:'Each pattern says who you are and where you come from. Leyli writes it by hand, line by line, on the blazer you will wear.',bn_cta:'Order a piece',
    pl_t:'Hand-painted blazer',pl_e:'Edition 1 of 1',pl_tip:'Move over the work to magnify',v_close:'Close',
    ba_h:'From blank to painted',ba_s:'Drag the line to see what hand painting changes.',ba_before:'Before',ba_after:'After',ba_aria:'Before and after comparison',
    nav_orn:'Ornaments',orn:'Ornament and its meaning',orn_s:'Every pattern carries a story. Turkmen motifs are one of the languages the pieces are written in.',
    o1:'The traditional headdress of Turkmen women: gilded plates set with red stones. On the blazer it is painted as a portrait, not copied.',
    o2:'The medallion of Turkmen carpets. Each tribe has its own gül, so the motif works as a sign of belonging.',
    o3:'Silver pendants and chains frame the face, as in traditional dress, and give the portrait its light.',
    o4:'A black cap with a hand-painted portrait of a girl in an ornate headdress, surrounded by red flowers and gold accents. Traditional ornament in a modern accessory.',
    o5:'A black blazer hand-painted on the back with a girl in a red crystal-studded kokoshnik and a long braid tied with a red ribbon. Red flowers and viburnum berries carry the traditional ornament.',
    o6:'A black blazer hand-painted with a girl in a red traditional costume holding a pomegranate to her face. Carpet-style motifs, gold sequins, beadwork, a calligraphic “Ayseli” and a crescent moon on the shoulder.',
    ab_lead:'Art that remembers its roots.',
    ab_1:'Leyli Karova is a Turkmen artist who paints ornament and portraits by hand on blazers. Traditional jewellery, headdresses and carpet patterns become clothing meant to be worn, not stored. The motif can be Turkmen or any other: the story is yours to choose.',
    ab_2:'Each piece is made for one person and is never repeated.',
    f1:'Technique',f1v:'Hand-painted',f2:'Edition',f2v:'One of one',f3:'Heritage',f3v:'Turkmen and beyond',f4:'Community',f4v:'109K on Instagram',
    rev:'Words from owners',faq:'Questions',
    q1:'Will anyone else have the same piece?',a1:'No. Every ornament is painted by hand and exists once. A motif can return in another work, but never as a copy.',
    q2:'Can I choose the ornament?',a2:'Yes. Tell Leyli which motif or story you want, whether Turkmen, from another tradition or entirely your own, and the pattern is drawn to the cut of your blazer.',
    q3:'Can I buy a piece from the collection?',a3:'Pieces shown here are available until marked as found their owner. Write to ask which ones are free.',
    q4:'How are price, timing and delivery decided?',a4:'Each piece is agreed personally, because the scale of the ornament and the amount of painting differ from work to work.',q5:'Painted stones or real fittings?',a5:'Both are possible, and the choice is yours. Stones and jewellery can be painted by hand, so they stay part of the picture and add no weight. Or they can be real fittings: crystals, beads, chains and tassels sewn onto the blazer for volume and shine. A mix of the two also works. Say which you prefer, and Leyli will suggest what suits the design.',pc_btn:'View process',
    
    
    
    
    sold:'Found its owner',
    nav_pieces:'Pieces',nav_process:'Process',nav_inquiry:'Inquiries',tagline:'Clothes that <span class="ol">speak for you</span>',enter:'Scroll',
    m1:'This is not fashion.',m2:'This is art that has a name.',
    m3:'There is no mass production here. Every ornament is painted by hand on the blazer, and every piece exists once. Turkmen patterns, or any pattern that is yours, carried into clothes you wear.',
    pieces:'Pieces',drag:'Drag to browse',process:'How a piece is made',
    s1h:'Choose the ornament',s1p:'You pick the motif, its meaning and where it sits on the blazer. You also choose how the jewellery is made: stones painted by hand, or real fittings sewn on.',
    s2h:'Sketch',s2p:'The pattern is drawn to the cut of your blazer before any paint touches it.',
    s3h:'Paint by hand',s3p:'Each line is painted by Leyli. No prints, no copies.',
    s4h:'Receive your piece',s4p:'The finished blazer arrives as a one-of-one work.',
    inq:'For inquiries, <span class="ol">message me.</span>',ig:'Write on Instagram',foot:'We are Turkmen.'},
  ru:{
    cta_order:'Заказать работу',nav_author:'Автор',menu_aria:'Меню',au_h:'Автор по всему миру',au_s:'Где побывал орнамент.',au_p:'Лейли носит свои работы везде, куда приезжает: на яхте в открытом море, на крышах Миланского собора, на затопленной площади Сан-Марко в Венеции, на набережной Нью-Йорка на закате, на улочке старого города с мольбертами, в парке в сезон тюльпанов. Города и свет меняются, а орнамент остаётся тем же и встречает каждое новое место так, будто всегда там был.',au_cta:'Следить в Instagram',au_l1:'В море',au_l2:'Милан · крыши собора',au_l3:'Милан · террасы собора',au_l4:'Милан · площадь Дуомо',au_l5:'Венеция · площадь Сан-Марко',au_l6:'Нью-Йорк · набережная',au_l7:'Нью-Йорк · Таймс-сквер',au_l8:'Дубай · ночью',au_l9:'Старый город',au_l10:'Сезон тюльпанов',au_l11:'Крупным планом',au_aria:'Фотографии из разных уголков мира',au_cl_h:'7 мест, один орнамент',au_cl_s:'В море · Милан · Венеция · Нью-Йорк · Дубай · Старый город · Сезон тюльпанов',au_lb:'Просмотр фото',au_lb_p:'Предыдущее фото',au_lb_n:'Следующее фото',pv_h:'Как рождается узор',pv_p:'Короткий ролик без звука из мастерской: от первой линии до последнего штриха.',pv_cta:'Больше процесса в TikTok',pv_tag:'Без звука',pv_aria:'Видео процесса без звука: орнамент рисуют вручную',pv_toggle:'Включить или поставить видео на паузу',ig_post:'Публикация {n} в Instagram',pv_c1:'Расписано вручную',pv_c2:'В единственном экземпляре',seo_t:'Лейли Карова — пиджаки с ручной росписью в единственном экземпляре',seo_d:'Лейли Карова — художница, которая вручную рисует орнаменты и портреты на пиджаках и куртках: туркменские мотивы или любая история на ваш выбор. Каждая работа существует в одном экземпляре. Закажите свою.',
    soc_h:'Следите за новым',soc_s:'Новые работы, процесс и закулисье.',soc_ig_d:'Новые работы, истории и отзывы.',soc_tt_d:'Видео процесса и закулисье.',soc_open:'Открыть',soc_soon:'Скоро',
    copy:'© 2026 Leyli Karova. Все работы и изображения на сайте защищены авторским правом. Копирование и использование без письменного разрешения запрещены.',
    ig_follow:'Подписаться',ig_msg:'Сообщение',ig_contacts:'Контакты',ig_cat:'Деятель искусств',ig_hl2:'Отзывы ❤️',
    ig_view:'Открыть в Instagram',
    hero_p:'Орнаменты и портреты, нарисованные вручную на пиджаках. Каждая работа существует один раз.',proc_s:'Один человек, один пиджак, четыре шага.',
    faq_p:'Не нашли ответ? Спросите Лейли напрямую.',faq_cta:'Написать Лейли',
    lk_h:'Рассмотрите ближе',in_hint:'Выберите точку на росписи.',in_reset:'Отдалить',
    tr1h:'Лицевая сторона',tr1p:'У этого пиджака перед намеренно оставлен чистым. На вашем роспись может быть где угодно: на лицевой стороне, рукавах, воротнике. Листайте, чтобы повернуть.',
    tr2h:'Бок',tr2p:'У шва появляются первые золотые мотивы.',
    tr3h:'Другой бок',tr3p:'Роспись заходит за шов и разрастается к спине.',
    tr4h:'Спина',tr4p:'Вот она: портрет в традиционном туркменском наряде, написанный вручную.',
    in1h:'Портрет',in1p:'Женщина в традиционном туркменском наряде, написанная вручную по всей спине.',
    in2h:'Узор',in2p:'Покрывало несёт ковровый узор. Каждый мотив прорисован отдельно.',
    in3h:'Украшения',in3p:'Серебро, камни и подвески, прорисованные вплоть до красных вставок.',
    in4h:'Золотой орнамент',in4p:'Тонкие золотые мотивы вокруг портрета, как второй слой истории.',
    ab_r1:'Искусство',ab_r2:'помнит',ab_r3:'свои корни.',mq1:'Орнамент',mq2:'Роспись вручную',mq3:'Один экземпляр',mq4:'Любой мотив',
    bn2_h:'Сделано вручную. <span class="ol">Носит один.</span>',bn2_p:'От первой линии до последней орнамент рисуется вручную. Пиджак, который покидает мастерскую, существует только один раз.',bn2_cta:'Смотреть работы',
    bn_h:'Орнамент — <span class="ol">язык</span> старше моды.',bn_p:'Каждый узор говорит, кто вы и откуда. Лейли пишет его вручную, линия за линией, на пиджаке, который вы будете носить.',bn_cta:'Заказать работу',
    pl_t:'Пиджак, роспись вручную',pl_e:'Тираж 1 из 1',pl_tip:'Проведите по работе, чтобы увеличить',v_close:'Закрыть',
    ba_h:'От чистого к расписанному',ba_s:'Двигайте линию, чтобы увидеть, что меняет роспись.',ba_before:'До',ba_after:'После',ba_aria:'Сравнение до и после',
    nav_orn:'Орнаменты',orn:'Орнамент и его смысл',orn_s:'У каждого узора есть история. Туркменские мотивы — один из языков, на которых написаны работы.',
    o1:'Традиционный головной убор туркменских женщин: золочёные пластины с красными камнями. На пиджаке он написан как портрет, а не скопирован.',
    o2:'Медальон туркменских ковров. У каждого племени свой гёль, поэтому мотив служит знаком принадлежности.',
    o3:'Серебряные подвески и цепочки обрамляют лицо, как в традиционном наряде, и дают портрету свет.',
    o4:'Чёрная кепка с рисунком, выполненным вручную: девушка в узорном уборе и красные цветы с золотыми акцентами. Традиционный орнамент в современном аксессуаре.',
    o5:'Чёрный жакет с ручной росписью на спине: девушка в красном кокошнике, украшенном кристаллами, с длинной косой и алой лентой. Красные цветы и ягоды калины продолжают традиционный орнамент.',
    o6:'Чёрный жакет с ручной росписью: девушка в красном национальном наряде с гранатом у лица. Ковровые узоры, золотые пайетки, бисер, каллиграфическая надпись «Ayseli» и полумесяц на плече.',
    ab_lead:'Искусство, которое помнит свои корни.',
    ab_1:'Лейли Карова — туркменская художница, которая вручную рисует орнаменты и портреты на пиджаках. Традиционные украшения, головные уборы и ковровые узоры становятся одеждой, которую носят, а не хранят. Мотив может быть туркменским или любым другим: историю выбираете вы.',
    ab_2:'Каждая работа создаётся для одного человека и не повторяется.',
    f1:'Техника',f1v:'Ручная роспись',f2:'Тираж',f2v:'Один экземпляр',f3:'Корни',f3v:'Туркменские и не только',f4:'Сообщество',f4v:'109 тыс. в Instagram',
    rev:'Слова владельцев',faq:'Вопросы',
    q1:'Будет ли у кого-то такая же работа?',a1:'Нет. Каждый орнамент рисуется вручную и существует один раз. Мотив может вернуться в другой работе, но не как копия.',
    q2:'Можно ли выбрать орнамент?',a2:'Да. Расскажите Лейли, какой мотив или историю вы хотите: туркменскую, из другой традиции или совсем свою, и узор будет нарисован по крою вашего пиджака.',
    q3:'Можно ли купить работу из коллекции?',a3:'Показанные здесь работы доступны, пока не отмечены как нашедшие владельца. Напишите, чтобы узнать, какие свободны.',
    q4:'Как определяются цена, сроки и доставка?',a4:'Каждая работа обсуждается лично: масштаб орнамента и объём росписи у всех разные.',q5:'Нарисованные камни или живая фурнитура?',a5:'Возможны оба варианта, выбор за вами. Камни и украшения можно нарисовать вручную: они остаются частью картины и не добавляют веса. Или сделать их живой фурнитурой: кристаллы, бисер, цепочки и кисти, пришитые к пиджаку, дают объём и блеск. Можно и сочетать оба подхода. Скажите, что вам ближе, и Лейли предложит то, что подойдёт к рисунку.',pc_btn:'Посмотреть процесс',
    sold:'Нашла владельца',
    nav_pieces:'Работы',nav_process:'Процесс',nav_inquiry:'Заказ',tagline:'Одежда, которая <span class="ol">говорит за вас</span>',enter:'Листайте',
    m1:'Это не мода.',m2:'Это искусство, у которого есть имя.',
    m3:'Здесь нет массового производства. Каждый орнамент рисуется вручную на пиджаке, и каждая работа существует в единственном экземпляре. Туркменские узоры или любой другой узор, близкий вам, в одежде, которую носят.',
    pieces:'Работы',drag:'Листайте',process:'Как создаётся работа',
    s1h:'Выбор орнамента',s1p:'Вы выбираете мотив, его смысл и место на пиджаке. Также вы выбираете, как будут сделаны украшения: камни, нарисованные вручную, или живая фурнитура, пришитая к пиджаку.',
    s2h:'Эскиз',s2p:'Узор рисуется по крою вашего пиджака ещё до первого мазка краской.',
    s3h:'Роспись вручную',s3p:'Каждую линию рисует Лейли. Никакой печати, никаких копий.',
    s4h:'Ваша работа',s4p:'Готовый пиджак приходит к вам как единственный в своём роде.',
    inq:'По вопросам заказа — <span class="ol">напишите мне.</span>',ig:'Написать в Instagram',foot:'Мы туркмены.'},
 tk:{
    cta_order:'Eser sargyt et',nav_author:'Awtor',menu_aria:'Menýu',au_h:'Awtor bütin dünýäde',au_s:'Nagyş nirelerde bolup gördi.',au_p:'Leýli öz eserlerini barýan ýerleriniň hemmesinde geýýär: açyk deňizdäki ýahtada, Milan soborynyň balkonynda, Wenesiýadaky suw basan San-Marko meýdançasynda, Nýu-Ýorkuň kenarýakasynda gün ýaşanda, molbertli köne şäher köçesinde, lälegül möwsüminde seýilgähde. Şäherler we ýagtylyk üýtgeýär, emma nagyş öňküligine galýar we her täze ýeri hemişe şol ýerde bolan ýaly garşylaýar.',au_cta:'Instagram-da yzarla',au_l1:'Deňizde',au_l2:'Milan · soboryň terassasy',au_l3:'Milan · soboryň gözelligi',au_l4:'Milan · Duomo meýdançasy',au_l5:'Wenesiýa · San-Marko meýdançasy',au_l6:'Nýu-Ýork · kenarýaka',au_l7:'Nýu-Ýork · Taýms-skwer',au_l8:'Dubaý · gijesi',au_l9:'Köne şäher',au_l10:'Lälegül möwsümi',au_l11:'Ýakyndan görnüş',au_aria:'Dünýäniň dürli künjeklerinden suratlar',au_cl_h:'7 ýer, bir nagyş',au_cl_s:'Deňizde · Milan · Wenesiýa · Nýu-Ýork · Dubaý · Köne şäher · Lälegül möwsümi',au_lb:'Suraty görmek',au_lb_p:'Öňki surat',au_lb_n:'Indiki surat',pv_h:'Nagyş nähili döreýär',pv_p:'Ussahanadan sessiz gysga wideo: ilkinji çyzykdan soňky çyzyga çenli.',pv_cta:'TikTok-da proses barada has köp',pv_tag:'Sessiz',pv_aria:'Sessiz proses wideosy: nagyş elde çekilýär',pv_toggle:'Wideony açmak ýa-da duruzmak',ig_post:'Instagram-da {n}-nji ýazgy',pv_c1:'Elde çekilen',pv_c2:'Ýeke-täk nusgada',seo_t:'Leýli Karowa — elde nagyşlanan ýeke-täk penjekler',seo_d:'Leýli Karowa — nagyşlary we portretleri penjeklere hem kurtkalara elde çekýän suratkeş: türkmen nagyşlary ýa-da özüňiz saýlan islendik hekaýa. Her eser ýeke-täk nusgada bar. Özüňiziňkini sargyt ediň.',
    soc_h:'Täzelikleri yzarlaň',soc_s:'Täze eserler, proses we perdäniň aňyrsy.',soc_ig_d:'Täze eserler, hekaýalar we pikirler.',soc_tt_d:'Proses wideolary we perdäniň aňyrsy.',soc_open:'Aç',soc_soon:'Ýakynda',
    copy:'© 2026 Leyli Karova. Saýtdaky ähli eserler we suratlar awtorlyk hukugy bilen goralýar. Ýazmaça rugsatsyz göçürmek we ulanmak gadagan.',
    ig_follow:'Yzarla',ig_msg:'Habar',ig_contacts:'Aragatnaşyk',ig_cat:'Sungat işgäri',ig_hl2:'Pikirler ❤️',
    ig_view:'Instagram-da aç',
    hero_p:'Penjeklere elde çekilen nagyşlar we portretler. Her eser diňe bir gezek bar.',proc_s:'Bir adam, bir penjek, dört ädim.',
    faq_p:'Jogap tapmadyňyzmy? Leýlädän göni soraň.',faq_cta:'Leýlä ýazmak',
    lk_h:'Ýakyndan synlaň',in_hint:'Nagyşdan bir nokat saýlaň.',in_reset:'Daşlaşdyr',
    tr1h:'Öň tarap',tr1p:'Bu penjegiň öň tarapy ýörite arassa galdyryldy. Siziňkide nagyş islendik ýerde bolup biler: öň tarapda, ýeňlerde, ýakada. Aýlamak üçin süýşüriň.',
    tr2h:'Gapdal',tr2p:'Tikinde ilkinji altyn nagyşlar peýda bolýar.',
    tr3h:'Beýleki gapdal',tr3p:'Nagyş tikinden aşyp, arka tarap ýaýraýar.',
    tr4h:'Arka tarap',tr4p:'Ine, ol: türkmen milli lybasyndaky aýalyň elde çekilen portreti.',
    in1h:'Portret',in1p:'Türkmen milli lybasyndaky aýal, arka tarapyň ählisine elde çekilen.',
    in2h:'Nagyş',in2p:'Ýaglyk haly nagşyny göterýär. Her nagyş aýratyn çekilen.',
    in3h:'Şaý-sepler',in3p:'Kümüş, daşlar we asylgy şaýlar, gyzyl goýmalara çenli jikme-jik çekilen.',
    in4h:'Altyn nagyş',in4p:'Portretiň daşyndaky inçe altyn nagyşlar hekaýanyň ikinji gatlagy ýaly.',
    ab_r1:'Sungat',ab_r2:'öz köklerini',ab_r3:'ýada salýar.',mq1:'Nagyş',mq2:'Elde çekilen',mq3:'Ýeke nusga',mq4:'Islendik nagyş',
    bn2_h:'Elde ýasalan. <span class="ol">Ýeke adam geýýär.</span>',bn2_p:'Ilkinji çyzykdan soňky çyzyga çenli nagyş elde çekilýär. Ussahanadan çykýan penjek dünýäde ýeke-täk bolýar.',bn2_cta:'Eserlere seret',
    bn_h:'Nagyş — modadan hem gadymy <span class="ol">dil</span>.',bn_p:'Her nagyş siziň kimdigiňizi we nireden gelýändigiňizi aýdýar. Leýli ony siziň geýjek penjegiňize çyzyk-çyzyk, elde çekýär.',bn_cta:'Eser sargyt et',
    pl_t:'Penjek, elde çekilen',pl_e:'Tiraž 1 / 1',pl_tip:'Ulaltmak üçin eseriň üstünden süýşüriň',v_close:'Ýap',
    ba_h:'Arassadan nagyşlanana çenli',ba_s:'Nagyşyň nämäni üýtgedýändigini görmek üçin çyzygy süýşüriň.',ba_before:'Öň',ba_after:'Soň',ba_aria:'Öň we soň deňeşdirmesi',
    nav_orn:'Nagyşlar',orn:'Nagyş we onuň many-mazmuny',orn_s:'Her nagşyň öz hekaýasy bar. Türkmen nagyşlary eserler ýazylýan dilleriň biridir.',
    o1:'Türkmen aýallarynyň milli baş geýimi: gyzyl daşly, altyn suwly plastinalar. Penjekde ol göçürilmän, portret hökmünde çekilýär.',
    o2:'Türkmen halylarynyň medalýony. Her tireniň öz gölü bar, şonuň üçin nagyş degişlilik alamaty bolup hyzmat edýär.',
    o3:'Kümüş asylgylar we zynjyrlar ýüzi milli lybasdaky ýaly gurşap alýar we portrete ýagtylyk berýär.',
    o4:'Elde çekilen suratly gara kepka: nagyşly baş geýimli gyz we altyn öwüşginli gyzyl güller. Häzirki zaman goşundysynda däp bolan nagyş.',
    o5:'Arkasyna elde çekilen gara žaket: kristallar bilen bezelen gyzyl kokoşnikli, uzyn örümli we gyzyl lentaly gyz. Gyzyl güller we kalina miweleri däp bolan nagşy dowam etdirýär.',
    o6:'Elde nagyşlanan gara žaket: ýüzüniň ýanynda nar bilen gyzyl milli lybasdaky gyz. Haly nagyşlary, altyn pailetkalar, monjuk, «Ayseli» diýen kalligrafiýa ýazgysy we egnindäki ýarym aý.',
    ab_lead:'Öz köklerini ýada salýan sungat.',
    ab_1:'Leýli Karowa — penjeklere nagyşlary we portretleri elde çekýän türkmen suratkeşi. Däp bolan şaý-sepler, baş geýimler we haly nagyşlary saklanylmaýan, eýsem geýilýän lybasa öwrülýär. Nagyş türkmen ýa-da başga islendik bolup biler: hekaýany özüňiz saýlaýarsyňyz.',
    ab_2:'Her eser bir adam üçin döredilýär we gaýtalanmaýar.',
    f1:'Tehnika',f1v:'Elde çekmek',f2:'Tiraž',f2v:'Ýeke nusga',f3:'Kökler',f3v:'Türkmen we başga',f4:'Jemgyýet',f4v:'Instagram-da 109 müň',
    rev:'Eýeleriniň sözleri',faq:'Soraglar',
    q1:'Kimdir birinde şuňa meňzeş eser bolarmy?',a1:'Ýok. Her nagyş elde çekilýär we diňe bir gezek bar. Nagyş başga eserde gaýdyp gelip biler, emma göçürme hökmünde däl.',
    q2:'Nagşy saýlap bolýarmy?',a2:'Hawa. Leýlä haýsy nagşy ýa-da hekaýany isleýändigiňizi aýdyň: türkmen, başga däpden ýa-da doly özüňiziňki, nagyş penjegiňiziň kesimine görä çekiler.',
    q3:'Kolleksiýadan eser satyn alyp bolýarmy?',a3:'Bu ýerde görkezilen eserler eýe tapdy diýlip bellenýänçä elýeterli. Haýsynyň boşdugyny bilmek üçin ýazyň.',
    q4:'Baha, möhlet we eltip bermek nädip kesgitlenýär?',a4:'Her eser şahsy taýdan ara alnyp maslahatlaşylýar: nagşyň masştaby we çekilişiň möçberi hemmeler üçin dürli.',q5:'Çekilen daşlarmy ýa-da hakyky furniturami?',a5:'Ikisi hem mümkin, saýlaw siziňki. Daşlary we şaý-sepleri elde çekmek bolar: olar suratyň bir bölegi bolup galýar we agram goşmaýar. Ýa-da hakyky furnitura bolup biler: penjege tikilen kristallar, monjuklar, zynjyrlar we saçaklar göwrüm we ýalpyldy berýär. Ikisini bile ulanmak hem bolýar. Size haýsy ýakyn bolsa, şony aýdyň, Leýli bolsa çyzgy üçin ýaraýanyny teklip eder.',pc_btn:'Prosesi görmek',
    sold:'Eýe tapdy',
    nav_pieces:'Eserler',nav_process:'Proses',nav_inquiry:'Sargyt',tagline:'Siziň adyňyzdan <span class="ol">gürleýän</span> eşik',enter:'Süýşüriň',
    m1:'Bu moda däl.',m2:'Bu ady bolan sungat.',
    m3:'Bu ýerde köpçülikleýin önümçilik ýok. Her nagyş penjege elde çekilýär we her eser ýeke-täk nusgada bar. Geýilýän eşikdäki türkmen nagyşlary ýa-da size ýakyn başga islendik nagyş.',
    pieces:'Eserler',drag:'Süýşüriň',process:'Eser nähili döredilýär',
    s1h:'Nagşy saýlamak',s1p:'Siz nagşy, onuň manysyny we penjekdäki ýerini saýlaýarsyňyz. Şeýle hem şaý-sepleriň nähili ýasalmalydygyny saýlaýarsyňyz: elde çekilen daşlar ýa-da penjege tikilen hakyky furnitura.',
    s2h:'Eskiz',s2p:'Nagyş ilkinji reňk çalynmanka penjegiňiziň kesimine görä çyzylýar.',
    s3h:'Elde çekmek',s3p:'Her çyzygy Leýli çekýär. Çap ýok, göçürme ýok.',
    s4h:'Siziň eseriňiz',s4p:'Taýýar penjek size ýeke-täk eser hökmünde gelip ýetýär.',
    inq:'Sargyt boýunça — <span class="ol">maňa ýazyň.</span>',ig:'Instagram-a ýazmak',foot:'Biz türkmenler.'},

};

/* ---------- language ---------- */
let lang = 'en';
function setLang(l){
  lang = l; document.documentElement.lang = l;
  document.querySelectorAll('[data-i18n]').forEach(el=>{ const v=I18N[l][el.dataset.i18n]; if(v===undefined) return; if(v.indexOf('<span class="ol">')>-1) el.innerHTML=v; else el.textContent=v; });
  document.querySelectorAll('.lang button').forEach(b=>b.setAttribute('aria-pressed', b.dataset.lang===l));
  if(window.updateNow) updateNow();
  renderReviews();
  renderMarquee();
  if(window.tourRefresh) tourRefresh();
  if(window.inspRefresh) inspRefresh();
  if(window.igLabel) igLabel();
  document.querySelectorAll('[data-aria]').forEach(el=>{ const a=I18N[l][el.dataset.aria]; if(a!==undefined) el.setAttribute('aria-label',a); });
  const st=document.getElementById('status'); if(st) st.textContent='';
  const T=I18N[l]; document.title=T.seo_t;
  [['meta[name="description"]',T.seo_d],['meta[property="og:description"]',T.seo_d],['meta[name="twitter:description"]',T.seo_d],
   ['meta[property="og:title"]',T.seo_t],['meta[name="twitter:title"]',T.seo_t]].forEach(([q,v])=>{ const m=document.querySelector(q); if(m) m.setAttribute('content',v); });
  try{ localStorage.setItem('lk-lang', l); }catch(e){}
}
document.querySelectorAll('.lang button').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.lang)));

/* ---------- mobile menu ---------- */
(function(){
  const btn=document.getElementById('burger'), menu=document.getElementById('menu');
  if(!btn||!menu) return;
  function set(on){ btn.setAttribute('aria-expanded',on?'true':'false'); menu.classList.toggle('on',on); menu.setAttribute('aria-hidden',on?'false':'true'); menu.inert=!on; document.body.classList.toggle('lock',on); }
  btn.addEventListener('click',()=>set(btn.getAttribute('aria-expanded')!=='true'));
  menu.addEventListener('click',e=>{ if(e.target.closest('a')||e.target===menu) set(false); });
  addEventListener('keydown',e=>{ if(e.key==='Escape'&&menu.classList.contains('on')){ set(false); btn.focus(); } });
  const mq=matchMedia('(min-width:761px)'); const off=e=>{ if(e.matches) set(false); };
  if(mq.addEventListener) mq.addEventListener('change',off); else if(mq.addListener) mq.addListener(off);
})();

/* ---------- generated ornament placeholder ---------- */
function ornament(seed){
  const c = 100, cy = 130, n = 8 + (seed % 3) * 4;
  let s = '<svg viewBox="0 0 200 266" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#d6cdb4" stroke-width=".6">';
  for(let r=0;r<4;r++){
    const R = 22 + r*16 + (seed%2)*3, pts=[];
    for(let i=0;i<n;i++){ const a=(i/n)*Math.PI*2 + (r%2)*Math.PI/n; const rr = i%2? R*.78 : R; pts.push((c+Math.cos(a)*rr).toFixed(1)+','+(cy+Math.sin(a)*rr).toFixed(1)); }
    s += '<polygon points="'+pts.join(' ')+'" opacity="'+(1-r*.15)+'"/>';
  }
  for(let i=0;i<n;i++){ const a=(i/n)*Math.PI*2; s += '<line x1="'+c+'" y1="'+cy+'" x2="'+(c+Math.cos(a)*80).toFixed(1)+'" y2="'+(cy+Math.sin(a)*80).toFixed(1)+'" opacity=".35"/>'; }
  s += '<path d="M100 118 L112 130 L100 142 L88 130Z" fill="#a3202f" stroke="none"/>';
  for(let i=0;i<9;i++){ const x=14+i*21; s += '<path d="M'+x+' 14 l10 14 l-10 14 l-10 -14Z" opacity=".5"/><path d="M'+x+' 252 l10 -14 l-10 -14 l-10 14Z" opacity=".5"/>'; }
  return s + '</svg>';
}

/* ---------- 3D carousel ---------- */
(function(){
  const car=document.getElementById('carousel'), ring=document.getElementById('ring');
  const N=WORKS.length, step=360/N, reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cards=WORKS.map((w,i)=>{
    const f=w.el; const gl=document.createElement('div'); gl.className='glow'; f.insertBefore(gl,f.firstChild);
    f.addEventListener('click',()=>{ if(moved>6) return; if(i===activeIdx) window.openViewer(i); else goTo(i); });
    return f;
  });
  let angle=0,target=0,down=false,sx=0,st=0,moved=0,lastX=0,vel=0,hover=false,idle=0,activeIdx=-1,running=false;

  let gap=0,depth=0;
  function layout(){ const w=cards[0].offsetWidth; gap=w*1.02; depth=w*.7; draw(); }
  function norm(a){ a=((a%360)+540)%360-180; return a; }
  function wrapIdx(d){ return (((d+N/2)%N)+N)%N-N/2; }
  function draw(){
    const pos=-angle/step;                       /* continuous index of the card in the centre */
    cards.forEach((c,i)=>{
      const d=wrapIdx(i-pos), ad=Math.abs(d), sg=d<0?-1:1;
      const x=sg*(Math.min(ad,1)*gap+Math.max(0,ad-1)*gap*.55), z=-Math.min(ad,2.6)*depth, ry=-sg*Math.min(ad,1)*32;
      const tr='translate3d('+x.toFixed(1)+'px,0,'+z.toFixed(1)+'px) rotateY('+ry.toFixed(2)+'deg)';
      const op=Math.max(0,1-ad*.5).toFixed(2);
      if(c._tr!==tr){ c.style.transform=tr; c._tr=tr; }
      if(c._op!==op){ c.style.opacity=op; c._op=op; }
    });
    const idx=((Math.round(pos)%N)+N)%N;
    if(idx!==activeIdx){ activeIdx=idx; cards.forEach((c,k)=>c.classList.toggle('act',k===idx)); updateNow(); }
  }
  const dotsEl=document.getElementById('cDots'), tilt=document.getElementById('tilt');
  WORKS.forEach((w,i)=>{ const b=document.createElement('button'); b.type='button'; b.setAttribute('aria-label',w.name); b.addEventListener('click',()=>goTo(i)); dotsEl.appendChild(b); });
  window.updateNow=function(){
    if(activeIdx<0) return; const w=WORKS[activeIdx];
    document.getElementById('nowName').textContent=w.name;
    document.getElementById('nowCount').textContent=String(activeIdx+1).padStart(2,'0')+' / '+String(N).padStart(2,'0');
    const n=document.getElementById('nowNote'); n.textContent=w.sold?I18N[lang].sold:w.note[lang]; n.classList.toggle('sold',!!w.sold);
    [...dotsEl.children].forEach((d,k)=>d.classList.toggle('on',k===activeIdx));
    const pb=document.getElementById('nowProcess');
    if(pb){
      const u=w.process;
      if(u){ pb.setAttribute('href',u); if(/^https?:/i.test(u)){ pb.target='_blank'; pb.rel='noopener'; } else { pb.removeAttribute('target'); pb.removeAttribute('rel'); } }
      else { pb.setAttribute('href','#process'); pb.removeAttribute('target'); pb.removeAttribute('rel'); }
    }
  };
  if(!reduce){
    let rect=null, tr=0, px=0, py=0;
    addEventListener('scroll',()=>{ rect=null; },{passive:true}); addEventListener('resize',()=>{ rect=null; });
    car.addEventListener('pointermove',e=>{
      if(down) return; if(!rect) rect=car.getBoundingClientRect();
      px=(e.clientX-rect.left)/rect.width-.5; py=(e.clientY-rect.top)/rect.height-.5;
      if(!tr) tr=requestAnimationFrame(()=>{ tr=0; tilt.style.transform='rotateX('+(-py*7).toFixed(2)+'deg) rotateY('+(px*3).toFixed(2)+'deg)'; });
    });
    car.addEventListener('pointerleave',()=>{ tilt.style.transform=''; rect=null; });
  }
  function tick(){
    angle+= (target-angle)*(down?.35:.09);
    if(Math.abs(target-angle)<.01 && !down){ angle=target; running=false; draw(); return; }
    draw(); requestAnimationFrame(tick);
  }
  function kick(){ if(!running){ running=true; requestAnimationFrame(tick); } }
  function snap(extra){ target=Math.round((target+(extra||0))/step)*step; kick(); }
  function goTo(i){ const want=-i*step; target+=norm(want-target); kick(); idle=0; }
  document.getElementById('next').addEventListener('click',()=>{ target=Math.round(target/step)*step-step; kick(); idle=0; });
  document.getElementById('prev').addEventListener('click',()=>{ target=Math.round(target/step)*step+step; kick(); idle=0; });
  car.addEventListener('keydown',e=>{ if(e.key==='ArrowRight'){e.preventDefault();document.getElementById('next').click();} if(e.key==='ArrowLeft'){e.preventDefault();document.getElementById('prev').click();} });

  car.addEventListener('pointerdown',e=>{ down=true; moved=0; sx=lastX=e.clientX; st=target; vel=0; car.classList.add('drag'); kick(); });
  window.addEventListener('pointermove',e=>{ if(!down) return; moved=Math.max(moved,Math.abs(e.clientX-sx)); vel=e.clientX-lastX; lastX=e.clientX; target=st+(e.clientX-sx)*.28; });
  window.addEventListener('pointerup',()=>{ if(!down) return; down=false; car.classList.remove('drag'); snap(vel*3.2); idle=0; setTimeout(()=>{moved=0},0); });
  car.addEventListener('pointerenter',()=>hover=true); car.addEventListener('pointerleave',()=>hover=false);
  car.addEventListener('wheel',e=>{ if(Math.abs(e.deltaX)>Math.abs(e.deltaY)){ e.preventDefault(); target+=-e.deltaX*.12; clearTimeout(car._w); car._w=setTimeout(()=>snap(),120); kick(); } },{passive:false});

  if(!reduce) setInterval(()=>{ if(down||hover||document.hidden) return; idle+=1; if(idle>=4){ target=Math.round(target/step)*step-step; kick(); idle=0; } },1000);
  new ResizeObserver(layout).observe(car);
  layout();
})();

/* ---------- manifesto reveal (one-time) ---------- */
const io = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('on'); io.unobserve(e.target);} }),{threshold:.35});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));


/* ---------- reviews (shown only if REVIEWS has items) ---------- */
function renderReviews(){
  const sec=document.getElementById('reviews'), g=document.getElementById('rGrid');
  sec.hidden=!REVIEWS.length; if(!REVIEWS.length) return;
  g.innerHTML=''; REVIEWS.forEach(r=>{ const b=document.createElement('blockquote'); b.textContent=r[lang]||r.en; const c=document.createElement('cite'); c.textContent=r.who||''; b.appendChild(c); g.appendChild(b); });
}

/* ---------- hero video ---------- */
(function(){
  const v=document.getElementById('heroVideo'); if(!v) return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){ v.removeAttribute('autoplay'); v.pause(); return; }
  v.muted=true; v.defaultMuted=true;
  const p=v.play(); if(p&&p.catch) p.catch(()=>{});
  new IntersectionObserver(es=>{ if(es[0].isIntersecting){ const q=v.play(); if(q&&q.catch) q.catch(()=>{}); } else v.pause(); }).observe(document.getElementById('hero'));
})();

/* ---------- before / after ---------- */
(function(){
  const ba=document.getElementById('ba'), rng=document.getElementById('baRange');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

  function set(v){ v=Math.max(0,Math.min(100,v)); ba.style.setProperty('--p',v+'%'); rng.value=v; }
  function fromEvent(e){ const r=ba.getBoundingClientRect(); set((e.clientX-r.left)/r.width*100); }
  const line=ba.querySelector('.ba-line'); let down=false;
  function fromEvent(e){ const r=ba.getBoundingClientRect(); set((e.clientX-r.left)/r.width*100); }
  line.addEventListener('pointerdown',e=>{ down=true; line.classList.add('on'); line.setPointerCapture(e.pointerId); cancelAnimationFrame(sweepId); e.preventDefault(); });
  line.addEventListener('pointermove',e=>{ if(down) fromEvent(e); });
  const endDrag=()=>{ down=false; line.classList.remove('on'); };
  line.addEventListener('pointerup',endDrag); line.addEventListener('pointercancel',endDrag);
  rng.addEventListener('input',()=>set(+rng.value));
  set(50);
  let sweepId=0;
  new IntersectionObserver((es,o)=>{ if(!es[0].isIntersecting) return; o.disconnect(); if(reduce) return;
    const t0=performance.now(); (function f(n){ const k=(n-t0)/2400; if(k>=1){ set(50); return; } set(50+Math.sin(k*Math.PI*2)*(1-k)*28); sweepId=requestAnimationFrame(f); })(t0);
  },{threshold:.6}).observe(ba);
})();

/* ---------- viewer with loupe ---------- */
(function(){
  const v=document.getElementById('viewer'), art=document.getElementById('vArt'), lp=document.getElementById('loupe'), lin=document.getElementById('loupeIn'), stage=document.getElementById('vStage');
  const Z=2.6, R=95, header=document.querySelector('.top');
  const noGutter=!(window.CSS&&CSS.supports&&CSS.supports('scrollbar-gutter','stable'));
  let opener=null, cur=0, tx=0, ty=0, cx=0, cy=0, raf=0, active=false, off=0, offT=0;
  const isOpen=()=>v.classList.contains('on');
  function content(i){ const im=WORKS[i].el.querySelector('img'), s=im&&im.getAttribute('src'); return s?'<img src="'+s+'" alt="" draggable="false">':''; }
  function plaque(){
    const w=WORKS[cur], L=I18N[lang];
    document.getElementById('plaque').innerHTML='<b>'+w.name+'</b><p>'+L.pl_t+'</p>'+(w.year?'<p>'+w.year+'</p>':'')+'<p>'+L.pl_e+'</p>'+(w.sold?'<p class="sold">'+L.sold+'</p>':'')+'<p class="tip">'+L.pl_tip+'</p>';
  }
  function lock(on){
    document.body.classList.toggle('lock',on);
    if(noGutter){ const sbw=on?innerWidth-document.documentElement.clientWidth:0; document.body.style.paddingRight=sbw?sbw+'px':''; if(header) header.style.right=sbw?sbw+'px':''; }
  }
  function size(){ lin.style.width=stage.offsetWidth+'px'; lin.style.height=stage.offsetHeight+'px'; }
  window.openViewer=function(i){
    cur=i; opener=document.activeElement; art.innerHTML=content(i); lin.innerHTML=content(i); plaque(); size();
    lock(true); v.setAttribute('aria-hidden','false'); v.classList.add('on');
    document.getElementById('vClose').focus({preventScroll:true});
  };
  function close(){ hide(); v.classList.remove('on'); v.setAttribute('aria-hidden','true'); lock(false); if(opener&&opener.focus) opener.focus({preventScroll:true}); }
  document.getElementById('vClose').addEventListener('click',close);
  v.addEventListener('pointerdown',e=>{ if(e.target===v) close(); });
  window.addEventListener('keydown',e=>{ if(isOpen()&&e.key==='Escape') close(); });
  addEventListener('resize',()=>{ if(isOpen()) size(); });

  /* the loupe eases towards the pointer instead of jumping */
  function loop(){
    cx+=(tx-cx)*.22; cy+=(ty-cy)*.22; off+=(offT-off)*.22;
    lp.style.transform='translate3d('+(cx-R).toFixed(1)+'px,'+(cy-R-off).toFixed(1)+'px,0)';
    lin.style.transform='translate3d('+(R-Z*cx).toFixed(1)+'px,'+(R-Z*cy).toFixed(1)+'px,0) scale('+Z+')';
    raf=(active||Math.hypot(tx-cx,ty-cy)>.2||Math.abs(offT-off)>.2)?requestAnimationFrame(loop):0;
  }
  function hide(){ active=false; lp.classList.remove('on'); }
  function point(e){
    const r=stage.getBoundingClientRect(), k=stage.offsetWidth/r.width, x=(e.clientX-r.left)*k, y=(e.clientY-r.top)*k;
    if(x<0||y<0||x>stage.offsetWidth||y>stage.offsetHeight){ hide(); return; }
    tx=x; ty=y;
    const touch=e.pointerType!=='mouse';      /* a finger would hide the loupe: lift it above the touch point */
    offT=touch?R+62:0; lp.classList.toggle('touch',touch);
    if(!active){ active=true; cx=x; cy=y; off=offT; lp.classList.add('on'); }
    if(!raf) raf=requestAnimationFrame(loop);
  }
  stage.addEventListener('pointermove',point);
  stage.addEventListener('pointerdown',point);
  stage.addEventListener('pointerleave',hide);
  stage.addEventListener('pointerup',e=>{ if(e.pointerType!=='mouse') hide(); });
  document.querySelectorAll('.lang button').forEach(b=>b.addEventListener('click',()=>{ if(isOpen()) plaque(); }));
})();

/* ---------- banner backgrounds + parallax ---------- */
(function(){
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.banner').forEach(sec=>{
    const bg=sec.querySelector('.banner-bg');
    if(reduce) return;
    let vis=false, tick=false;
    function upd(){ tick=false; const r=sec.getBoundingClientRect(), k=(r.top+r.height/2-innerHeight/2)/innerHeight; bg.style.transform='translate3d(0,'+(k*-70).toFixed(1)+'px,0)'; }
    function onScroll(){ if(vis&&!tick){ tick=true; requestAnimationFrame(upd); } }
    new IntersectionObserver(es=>{ vis=es[0].isIntersecting; if(vis) upd(); }).observe(sec);
    addEventListener('scroll',onScroll,{passive:true}); addEventListener('resize',onScroll);
  });
})();

/* ---------- about: marquee + drifting rows ---------- */
function renderMarquee(){
  const L=I18N[lang], set=['mq1','mq2','mq3','mq4'].map(k=>'<span>'+L[k]+'</span><i>&#9670;</i>').join('');
  document.getElementById('mq').innerHTML=set.repeat(6);
}
(function(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const sec=document.querySelector('.a-hero'), rows=[...sec.querySelectorAll('.a-row')], dir=[-1,1,-1];
  let vis=false,tick=false;
  function upd(){ tick=false; const r=sec.getBoundingClientRect(), k=(r.top+r.height/2-innerHeight/2)/innerHeight; rows.forEach((el,i)=>{ el.style.transform='translate3d('+(k*dir[i]*90).toFixed(1)+'px,0,0)'; }); }
  function on(){ if(vis&&!tick){ tick=true; requestAnimationFrame(upd); } }
  new IntersectionObserver(es=>{ vis=es[0].isIntersecting; if(vis) upd(); }).observe(sec);
  addEventListener('scroll',on,{passive:true}); addEventListener('resize',on);
})();

/* ---------- look: turn around (scroll, separate blazers) ---------- */
(function(){
  const sec=document.getElementById('tour'), track=document.getElementById('tourTrack'), cap=document.getElementById('tourCap'), dots=document.getElementById('tourDots');
  const items=[...track.querySelectorAll('.tour-item')], N=items.length;
  items.forEach(it=>it.querySelector('img').addEventListener('load',()=>measure()));
  dots.innerHTML='<i></i>'.repeat(N);
  let centers=[], cur=-1; const lerp=(a,b,k)=>a+(b-a)*k, ease=u=>u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2;
  function measure(){ centers=items.map(it=>it.offsetLeft+it.offsetWidth/2); upd(); }
  function setText(i){ const L=I18N[lang];
    document.getElementById('tourTitle').textContent=L['tr'+(i+1)+'h']; document.getElementById('tourBody').textContent=L['tr'+(i+1)+'p'];
    document.getElementById('tourCount').textContent=String(i+1).padStart(2,'0')+' / '+String(N).padStart(2,'0');
    [...dots.children].forEach((d,k)=>d.classList.toggle('on',k===i)); }
  let target=0, cur2=0, raf=0;
  function render(tt){
    if(!centers.length) return;
    const f=tt*(N-1)*1.0001, i=Math.min(N-2,Math.floor(f)), u=Math.min(1,f-i);
    const p=i+ease(Math.max(0,Math.min(1,(u-.12)/.88)));   /* short hold, then glide to the next blazer */
    const x=innerWidth/2-lerp(centers[i],centers[i+1],p-i);
    track.style.transform='translate3d('+x.toFixed(1)+'px,0,0)';
    items.forEach((it,k)=>{ const d=Math.min(1,Math.abs(p-k)); it.style.transform='scale('+(1-.16*d).toFixed(3)+')'; it.style.opacity=(1-.72*d).toFixed(3); });
    const act=Math.round(p);
    if(act!==cur){ cur=act; cap.classList.add('sw'); setTimeout(()=>{ setText(act); cap.classList.remove('sw'); },110); }
  }
  function readTarget(){ const r=sec.getBoundingClientRect(), total=r.height-innerHeight; target=Math.max(0,Math.min(1,-r.top/total)); }
  function loop(){                                           /* damped follow: scroll steps never show as jumps */
    cur2+=(target-cur2)*.13; if(Math.abs(target-cur2)<.0003) cur2=target;
    render(cur2); raf=(cur2!==target)?requestAnimationFrame(loop):0;
  }
  function upd(){ readTarget(); if(!raf) raf=requestAnimationFrame(loop); }
  addEventListener('scroll',upd,{passive:true}); addEventListener('resize',()=>{ measure(); });
  new ResizeObserver(measure).observe(track);
  window.tourRefresh=function(){ if(cur>=0) setText(cur); };
  setText(0); cur=0; measure();
})();

/* ---------- look: inspect points (tap) ---------- */
(function(){
  const stage=document.getElementById('inspStage'), img=document.getElementById('inspImg'), over=document.getElementById('inspOver');
  const copy=document.getElementById('inspCopy'), hint=document.getElementById('inspHint'), reset=document.getElementById('inspReset');
  const im=document.getElementById('inspBack'); if(!im.getAttribute('src')){ const tb=document.querySelectorAll('#tourTrack .tour-item img'); if(tb.length) im.src=tb[tb.length-1].getAttribute('src'); }
  const chips=document.createElement('div'); chips.className='insp-chips';
  let cur=-1; const cl=(v,m)=>Math.max(50/m,Math.min(100-50/m,v));
  const mq=matchMedia('(max-width:860px)');
  INSPECT.forEach((p,i)=>{
    const ln=document.createElement('div'); ln.className='ln'; ln.style.cssText='left:'+p.x+'%;top:'+p.y+'%;width:calc('+(100-p.x)+'% + 34px)'; over.appendChild(ln);
    const mk=document.createElement('button'); mk.type='button'; mk.className='mk'; mk.style.cssText='left:'+p.x+'%;top:'+p.y+'%'; mk.textContent=i+1; mk.setAttribute('data-n',i); over.appendChild(mk);
    const lb=document.createElement('button'); lb.type='button'; lb.className='lb'; lb.setAttribute('data-n',i); lb.style.top=p.y+'%'; lb.innerHTML='<span>0'+(i+1)+'</span><b></b>'; lb.querySelector('b').style.fontWeight='inherit';
    over.appendChild(lb);
    [mk,lb].forEach(el=>el.addEventListener('click',e=>{ e.stopPropagation(); show(i); }));
  });
  function labels(){ const L=I18N[lang]; document.querySelectorAll('#insp .lb').forEach((lb,i)=>{ lb.querySelector('b').textContent=L['in'+(i+1)+'h']; lb.classList.toggle('on',i===cur); }); }
  function show(i){
    cur=i; const p=INSPECT[i], L=I18N[lang];
    img.style.transform='translate('+(50-p.z*cl(p.cx,p.z)).toFixed(2)+'%,'+(50-p.z*cl(p.cy,p.z)).toFixed(2)+'%) scale('+p.z+')';
    stage.classList.add('zoomed'); hint.hidden=true; copy.hidden=false; reset.hidden=false;
    document.getElementById('inspTitle').textContent=L['in'+(i+1)+'h']; document.getElementById('inspBody').textContent=L['in'+(i+1)+'p'];
    labels();
  }
  function out(){ cur=-1; img.style.transform='translate(0,0) scale(1)'; stage.classList.remove('zoomed'); hint.hidden=false; copy.hidden=true; reset.hidden=true; labels(); }
  reset.addEventListener('click',out);
  document.getElementById('inspFrame').addEventListener('click',()=>{ if(cur>=0) out(); });
  addEventListener('keydown',e=>{ if(e.key==='Escape'&&cur>=0) out(); });
  /* labels below the picture on small screens */
  function place(){ const lbs=[...document.querySelectorAll('#insp .lb')]; if(mq.matches){ lbs.forEach(l=>chips.appendChild(l)); if(!chips.parentNode) stage.parentNode.insertBefore(chips,stage.nextSibling); }
    else { lbs.forEach(l=>over.appendChild(l)); if(chips.parentNode) chips.remove(); } }
  mq.addEventListener('change',place); place();
  window.inspRefresh=function(){ labels(); if(cur>=0) show(cur); };
  labels();
})();

/* ---------- questions accordion ---------- */
(function(){
  const items=[...document.querySelectorAll('#qaList .qa-item')];
  items.forEach(it=>{
    const btn=it.querySelector('.qa-q');
    btn.addEventListener('click',()=>{
      const open=!it.classList.contains('open');
      items.forEach(o=>{ o.classList.remove('open'); o.querySelector('.qa-q').setAttribute('aria-expanded','false'); });
      if(open){ it.classList.add('open'); btn.setAttribute('aria-expanded','true'); }
    });
  });
})();

/* ---------- process: progress line ---------- */
(function(){
  const flow=document.getElementById('flow'), steps=[...flow.querySelectorAll('.step')], N=steps.length;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce){ flow.style.setProperty('--p',1); steps.forEach(s=>s.classList.add('on')); return; }
  let tick=false;
  function upd(){ tick=false;
    const r=flow.getBoundingClientRect(), vh=innerHeight, p=Math.max(0,Math.min(1,(vh*.82-r.top)/(Math.max(r.height,vh*.5)+vh*.1)));
    flow.style.setProperty('--p',p.toFixed(3));
    steps.forEach((s,i)=>s.classList.toggle('on',p>=(i/N)+.02));
  }
  function on(){ if(!tick){ tick=true; requestAnimationFrame(upd); } }
  addEventListener('scroll',on,{passive:true}); addEventListener('resize',on); upd();
})();

/* ---------- instagram block: defaults for empty src / href ---------- */
(function(){
  const IMG={avatar:'images/ig-avatar.webp',h1:'images/ig-highlight-1.webp',h2:'images/ig-highlight-2.webp',h3:'images/ig-highlight-3.webp',h4:'images/ig-highlight-4.webp',p1:'images/ig-1.webp',p2:'images/ig-2.webp',p3:'images/ig-3.webp',p4:'images/ig-4.webp',p5:'images/ig-5.webp',p6:'images/ig-6.webp'};
  const PROFILE='https://instagram.com/leyli_karova';
  // ===== INSTAGRAM LINKS =====
  // Paste the address of each post, reel or highlight between the quotes, in the same order as on the page.
  // An empty pair of quotes means that item opens the profile.
  //   post or reel : https://www.instagram.com/p/XXXXXXXXXXX/   or   https://www.instagram.com/reel/XXXXXXXXXXX/
  //   highlight    : https://www.instagram.com/stories/highlights/1234567890123456789/
  const LINKS={
    highlights:['','','',''],   // 1 Exclusive, 2 Reviews, 3 ПокоримВес…, 4 100K
    posts:['','','','','','']   // 1 to 6: left to right, top to bottom
  };
  const OK=/^https:\/\/(www\.)?instagram\.com\//i;
  function apply(sel,list){ document.querySelectorAll(sel).forEach((a,i)=>{ const u=String(list[i]||'').trim(); if(!u) return; if(OK.test(u)) a.setAttribute('href',u); else console.warn('Instagram link ignored, it must start with https://instagram.com/ :',u); }); }
  apply('#instagram .ig-hi',LINKS.highlights);
  apply('#instagram .ig-cell',LINKS.posts);
  document.querySelectorAll('#instagram img[data-slot]').forEach(el=>{ if(!el.getAttribute('src')) el.setAttribute('src',IMG[el.dataset.slot]); });
  document.querySelectorAll('#instagram a').forEach(a=>{ if(!a.getAttribute('href')) a.setAttribute('href',PROFILE); });
  window.igLabel=function(){ const t=((I18N[lang]||I18N.en).ig_post)||''; document.querySelectorAll('#instagram .ig-cell').forEach((a,i)=>a.setAttribute('aria-label',t.replace('{n}',i+1))); };
  igLabel();
})();

/* ---------- image protection ---------- */
(function(){
  const MEDIA='img,video,.piece,.tour-item,.ba,.orn-img,.v-stage,.insp-stage,.ig-cell,.ig-hi,.ig-av,.hero .portrait,.banner-bg';
  document.addEventListener('contextmenu',e=>{ if(e.target.closest&&e.target.closest(MEDIA)) e.preventDefault(); });
  document.addEventListener('dragstart',e=>{ if(e.target.tagName==='IMG'||e.target.tagName==='VIDEO') e.preventDefault(); });
  document.querySelectorAll('video').forEach(v=>{ v.setAttribute('controlsList','nodownload noplaybackrate'); v.disablePictureInPicture=true; });
})();

/* ---------- social cards ---------- */
(function(){
  const DEFAULTS={instagram:'https://instagram.com/leyli_karova'};
  document.querySelectorAll('#social .soc').forEach(a=>{
    let href=a.getAttribute('href')||''; if(!href) href=DEFAULTS[a.dataset.net]||'';
    if(!href){ a.classList.add('off'); a.removeAttribute('href'); a.setAttribute('aria-disabled','true'); return; }
    a.setAttribute('href',href);
    const m=href.match(/(?:instagram\.com\/|tiktok\.com\/@)([\w.]+)/i);
    a.querySelector('.soc-handle').textContent=m?'@'+m[1]:'';
  });
})();

/* ---------- init ---------- */
let saved = 'en';
const guess=()=>{ const n=(navigator.language||'').toLowerCase(); return n.startsWith('ru')?'ru':(n.startsWith('tk')?'tk':'en'); };
try{ saved = localStorage.getItem('lk-lang') || guess(); }catch(e){ saved = guess(); }
setLang(saved);
/* ---------- entry animation ---------- */
(function(){
  const el=document.getElementById('intro');
  function done(){ document.body.classList.remove('intro-on'); if(el) el.remove(); try{ sessionStorage.setItem('lk-intro','1'); }catch(e){} }
  if(!el||document.documentElement.classList.contains('skip-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches){ done(); return; }
  let fin=false; const end=()=>{ if(!fin){ fin=true; done(); } };
  el.addEventListener('animationend',e=>{ if(e.animationName==='introOut') end(); });
  el.addEventListener('pointerdown',()=>{ el.style.transition='opacity .35s'; el.style.opacity=0; setTimeout(end,380); });
  setTimeout(end,5000);
})();
;
(function(){
  var lb=document.getElementById('clLb'); if(!lb) return;
  var cards=[].slice.call(document.querySelectorAll('.collage .cl'));
  var img=lb.querySelector('.cl-lb-stage img'), cap=lb.querySelector('.cl-lb-cap'), cnt=lb.querySelector('.cl-lb-n');
  var cur=-1, opener=null, tx=0, ty=0, touching=false;
  function pad(n){ return (n<10?'0':'')+n; }
  function label(i){ var s=cards[i].querySelector('figcaption [data-i18n]'); return s?s.textContent:''; }
  function sync(){ cards.forEach(function(c,i){ c.setAttribute('aria-label',label(i)); }); if(cur>=0) cap.textContent=label(cur); }
  function show(i){
    cur=(i+cards.length)%cards.length;
    var im=cards[cur].querySelector('img');
    img.src=im.currentSrc||im.src; img.alt=im.alt;
    cap.textContent=label(cur); cnt.textContent=pad(cur+1)+' / '+pad(cards.length);
  }
  function open(i){
    opener=document.activeElement; show(i);
    lb.inert=false; lb.setAttribute('aria-hidden','false'); lb.classList.add('on');
    document.documentElement.classList.add('cl-lock');
    lb.querySelector('.cl-lb-x').focus({preventScroll:true});
  }
  function close(){
    lb.classList.remove('on'); lb.setAttribute('aria-hidden','true'); lb.inert=true;
    document.documentElement.classList.remove('cl-lock'); cur=-1;
    if(opener&&opener.focus) opener.focus({preventScroll:true});
  }
  cards.forEach(function(c,i){
    c.addEventListener('click',function(){ open(i); });
    c.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); open(i); } });
  });
  lb.querySelector('.cl-lb-x').addEventListener('click',close);
  lb.querySelector('.cl-lb-p').addEventListener('click',function(){ show(cur-1); });
  lb.querySelector('.cl-lb-nx').addEventListener('click',function(){ show(cur+1); });
  lb.addEventListener('click',function(e){ if(e.target===lb||e.target.classList.contains('cl-lb-stage')) close(); });
  lb.addEventListener('touchstart',function(e){ if(e.touches.length!==1) return; tx=e.touches[0].clientX; ty=e.touches[0].clientY; touching=true; },{passive:true});
  lb.addEventListener('touchend',function(e){
    if(!touching) return; touching=false;
    var t=e.changedTouches[0], dx=t.clientX-tx, dy=t.clientY-ty;
    if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.3) show(cur+(dx<0?1:-1));
    else if(dy>90&&Math.abs(dy)>Math.abs(dx)*1.3) close();
  },{passive:true});
  lb.addEventListener('keydown',function(e){
    if(e.key!=='Tab') return;
    var f=[].slice.call(lb.querySelectorAll('button')), i=f.indexOf(document.activeElement);
    e.preventDefault(); f[(i+(e.shiftKey?-1:1)+f.length)%f.length].focus();
  });
  window.addEventListener('keydown',function(e){
    if(cur<0) return;
    if(e.key==='Escape') close(); else if(e.key==='ArrowRight') show(cur+1); else if(e.key==='ArrowLeft') show(cur-1);
  });
  document.querySelectorAll('.lang button').forEach(function(b){ b.addEventListener('click',sync); });
  sync();
})();
;
(function(){
  var box=document.querySelector('.proc-video'); if(!box) return;
  var v=box.querySelector('video'), b=box.querySelector('.pv-toggle'), fill=box.querySelector('.pv-fill'), tm=box.querySelector('.pv-time'), track=box.querySelector('.pv-track');
  var userPaused=matchMedia('(prefers-reduced-motion: reduce)').matches, inView=false;
  v.muted=true;
  function two(n){ return (n<10?'0':'')+n; }
  function play(){ var p=v.play(); if(p&&p.catch) p.catch(function(){}); }
  function upd(){ if(inView&&!userPaused) play(); else v.pause(); }
  function sync(){ var on=!v.paused; box.classList.toggle('is-playing',on); b.classList.toggle('is-playing',on); b.setAttribute('aria-pressed',on?'true':'false'); }
  function prog(){
    var t=v.currentTime||0, d=v.duration||0;
    fill.style.transform='scaleX('+(d?Math.min(1,t/d):0)+')';
    tm.textContent=two(Math.floor(t/60))+':'+two(Math.floor(t%60));
  }
  if('IntersectionObserver' in window) new IntersectionObserver(function(es){ inView=es[0].isIntersecting; upd(); },{threshold:.35}).observe(v);
  b.addEventListener('click',function(){ if(v.paused){ userPaused=false; play(); } else { userPaused=true; v.pause(); } });
  v.addEventListener('click',function(){ b.click(); });
  track.addEventListener('click',function(e){ var r=track.getBoundingClientRect(); if(v.duration) v.currentTime=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width))*v.duration; });
  v.addEventListener('play',sync); v.addEventListener('pause',sync); v.addEventListener('timeupdate',prog); v.addEventListener('loadedmetadata',prog);
  sync(); prog();
})();
