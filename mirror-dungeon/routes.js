(() => {
  const pool = (ids, priority = '핵심 재료') => ids.map(id => ({ id, priority, way: '기프트 풀' }));
  const gift = (id, way, priority = '있으면 좋음') => ({ id, way, priority });
  const route = (id, why, gifts = [], rank = '추천', note = '') => ({ id, why, gifts, rank, note });
  const recipe = (id, materials, note) => ({ id, materials, note });
  const deck = (id, name, start, targets, team, routes, recipes, source) =>
    ({ id, name, start, targets, team, routes, recipes, source });
  const community = 'https://gall.dcinside.com/mgallery/board/view/?id=limbuscompany&no=';
  const navi = 'https://md-navi.com/seasons/s8/decks/';
  const saigo = 'https://saigo-no-dante.com/ko/planner/community/';
  const ing = 'https://limbus.ing/decks/';

  const factory = route(1004, '초반에 무리 없이 클리어할 수 있는 팩을 골라 코스트와 합성 재료를 모읍니다.', [], '초반 후보');
  const chicken = route(1101, '필요한 팩이 안 보이면 합성 재료와 상점 코스트를 보충합니다.', [], '초반 후보');
  const chickenBleed = route(1101, '출혈을 보강하면서 합성 재료를 모읍니다.', [
    gift(9703, '헬스치킨 이벤트'), gift(9704, '기프트 풀'), gift(9705, '클리어 보상 후보')
  ], '초반 후보');
  const gun = route(1114, '탄환 또는 진동을 쓰는 편성이면 필요한 전용 이벤트를 우선합니다.', [
    gift(9770, '톱니교단 이벤트', '진동 보강'), gift(9768, '사무소 이벤트', '탄환 보강'),
    gift(9769, '공부 이벤트')
  ]);
  const clock = route(1120, '진동을 부여하는 3스킬을 자주 쓰면 시계 케이스와 시계침을 모읍니다.', [
    gift(9721, '팩 전용', '합성 재료'), gift(9722, '팩 전용', '합성 재료'),
    gift(9724, '팩 전용', '합성 재료'), gift(9725, '팩 전용', '합성 재료')
  ], '편성 후보', '회중시계는 타입별 재료와 조건이 다릅니다. 11월 19일 수정 이후 일부 효과는 수비 스킬로 발동한 3스킬과 강화 반격에도 적용됩니다.');
  const wedge = route(1129, '새벽·쐐기 전용 이벤트를 우선합니다. 5층 고정 출현은 발푸르기스의 밤 행사 기간에만 적용됩니다.', [
    gift(9293, '새벽 이벤트 · 분노 판정 성공', '핵심'),
    gift(9297, '방문 이벤트 · 선택지 1', '택 1'), gift(9298, '방문 이벤트 · 선택지 2', '택 1'),
    gift(9299, '보험 이벤트 · 보험사 편', '택 1'), gift(9300, '보험 이벤트 · 해결사 편', '택 1'),
    gift(9292, '해결사의 본보기 · 판정 성공')
  ], '전용 우선', '하얀색 크라바트는 대기 중인 쐐기 사무소 인격도 셉니다. 팩을 놓쳤다면 이후 이상진역과 시간살인시간 BokGak에서 진동을 보강합니다.');
  const heishou = route(1023, '흑수 편성에 맞는 전용 기프트를 확인합니다.', [], '편성 후보');
  const archive = route(1128, '민무늬 코등이가 없으면 여기에서 노립니다.', [gift(9279, '팩 전용', '핵심 재료')], '전용 우선');
  const sword = route(1116, '본국검보에 들어갈 붉은 색술을 확보합니다.', [
    gift(9716, '팩 전용', '핵심 재료')
  ], '전용 우선', '붉은 색술을 관측에서 이미 받았다면 이 목적의 팩 선택은 건너뛸 수 있습니다.');
  const manor = route(1016, '워더링 축이면 오르골부터 확보합니다. 관측에서 이미 받았다면 다른 초반 팩도 괜찮습니다.', [
    gift(9432, '팩 전용', '핵심 재료')
  ]);
  const glass = route(1018, '굴절 유리관을 찾아 폭풍이 치는 언덕을 완성합니다.', [
    gift(9436, '팩 전용', '핵심 재료')
  ], '전용 우선');
  const purple = route(1511, '침잠·타격 편성의 후반 기록에 자주 등장하는 장기 전투 후보입니다.', [], '후반 후보');
  const dream = route(1520, '실제 후반 루트에서 택한 사례가 있는 팩입니다. 장기 전투를 버틸 수 있는지 먼저 확인합니다.', [
    gift(9830, '클리어 보상')
  ], '후반 후보');
  const bloodLate = route(1507, '혈찬을 사용하는 인격이 있고 장기 전투를 감당할 수 있을 때 고려합니다.', [
    gift(9205, '팩 전용 · 적 처치 시 혈찬')
  ], '후반 후보');
  const railway = route(1110, '장기 전투 후보입니다. 보스 패턴에 익숙하고 E.G.O 자원이 충분할 때 검토합니다.', [], '후반 후보');
  const late = [dream, railway];

  const burnRecipe = recipe(9088, [[9003, 9053, 9157]], '화상 부여 공격 스킬을 가진 출전 인격 5명 이상이 발동 기준입니다.');
  const cookbook = recipe(9157, [[9101, 9155]], '진혼의 재료입니다.');
  const bleedRecipe = recipe(9090, [[9089, 9042, 9161], [9089, 9042, 9106, 9159]], '출혈 부여 공격 스킬을 가진 출전 인격 5명 이상. E.G.O 스킬과 대기 인원은 제외합니다.');
  const devotion = recipe(9161, [[9106, 9159]], '피안개의 재료입니다.');
  const tremorRecipe = recipe(9092, [[9031, 9091, 9165]], '진동 부여 공격 스킬을 가진 출전 인격 5명 이상. 혼합 덱은 두 키워드의 인원 조건을 각각 확인합니다.');
  const originRecipe = recipe(9166, [[9163, 9164]], '연성진동과 별도의 진동 합성입니다.');
  const watches = [
    recipe(9728, [[9721, 9724]], '진동 편성의 3스킬 보강 후보입니다.'),
    recipe(9729, [[9721, 9725]], '은빛 케이스 조합의 다른 선택입니다.'),
    recipe(9730, [[9722, 9724]], '유로지비 인격이 있는 편성에서도 확인합니다.'),
    recipe(9731, [[9722, 9725]], '빛바랜 케이스 조합의 다른 선택입니다.')
  ];
  const ruptureRecipe = recipe(9094, [[9013, 9033, 9169]], '파열 부여 공격 스킬을 가진 출전 인격 5명 이상. E.G.O 스킬과 대기 인원은 제외합니다.');
  const ruptureHard = recipe(9171, [[9064, 9023, 9170]], '하드 합성 기프트. 황홀경과 별도의 재료를 사용합니다.');
  const sinkingRecipe = recipe(9096, [[9059, 9074, 9174]], '침잠 부여 공격 스킬을 가진 출전 인격 5명 이상. E.G.O 스킬과 대기 인원은 제외합니다.');
  const snowRecipe = recipe(9410, [[9408, 9409]], '보강 합성. 워더링을 쓰는 덱은 전용 합성의 재료도 챙깁니다.');
  const manorRecipe = recipe(9301, [[9432, 9436]], '워더링·에드가가 편성에 있을 때 효과와 강화 조건을 확인합니다.');
  const poiseRecipe = recipe(9098, [[9056, 9097, 9179]], '호흡을 얻거나 부여하는 공격 스킬을 가진 출전 인격 5명 이상. E.G.O 스킬과 대기 인원은 제외합니다.');
  const memoryRecipe = recipe(9179, [[9063, 9177]], '복주머니의 재료입니다.');
  const bladeRecipe = recipe(9280, [[9193, 9716, 9279]], '검계 편성의 전용 보강. 참격과 검계 관련 발동 조건을 확인합니다.');
  const chargeRecipe = recipe(9100, [[9069, 9099, 9182]], '충전 횟수를 자주 수급하고 소비하는 편성에서 보강합니다.');
  const servoRecipe = recipe(9742, [[9737, 9738]], '워프특급 살인사건의 전용 재료로 만드는 합성입니다.');

  const firePool = [...pool([9003, 9053, 9155]), ...pool([9045, 9071, 9001], '있으면 좋음')];
  const redPool = [...pool([9089, 9042, 9106, 9159]), ...pool([9050], '있으면 좋음')];
  const tremorPool = [...pool([9031, 9091, 9165]), ...pool([9163, 9164], '추가 합성 재료'), ...pool([9044], '있으면 좋음')];
  const rupturePool = [...pool([9013, 9033, 9169]), ...pool([9064, 9023], '추가 합성 재료'), ...pool([9060], '있으면 좋음')];
  const sinkingPool = [...pool([9059, 9074, 9174]), ...pool([9124], '있으면 좋음')];
  const breathPool = [...pool([9056, 9097, 9063, 9177]), ...pool([9070, 9066], '있으면 좋음')];
  const chargePool = [...pool([9069, 9099, 9182]), ...pool([9075, 9043, 9052], '있으면 좋음')];

  const firePacks = [
    route(1401, '진혼 재료와 요리 비법 전서의 재료를 먼저 모읍니다.', [...firePool, ...pool([9101])]),
    route(1402, '진혼 재료를 보충하고 화상 횟수를 유지할 기프트를 챙깁니다.', firePool)
  ];
  const fireCheckup = route(1125, '요리 비법 전서 재료가 부족하면 융해된 파라핀과 만 년 동안 끓는 솥을 확인합니다.', [
    ...pool([9101, 9155]), ...pool([9001], '있으면 좋음')
  ], '대체');
  const redPacks = [
    route(1006, '초반 상점에서 보이는 피안개 공통 재료를 확보합니다.', pool([9089, 9042]), '초반 후보'),
    route(1403, '3층부터 피안개 재료를 모읍니다.', redPool),
    route(1404, '피안개 재료 네 가지를 노립니다. 연기와 철조망은 연기전쟁 제4전선 이벤트에서도 얻을 수 있습니다.', redPool),
    route(1106, '녹슨 입마개나 연기와 철조망이 부족하면 이 팩을 확인합니다.', pool([9089, 9042]), '대체'),
    route(1019, '억류된 찬송이나 밀라르카가 부족하면 이 팩을 확인합니다.', [
      ...pool([9106, 9159]), gift(9205, '팩 전용 · 혈찬 편성')
    ], '대체')
  ];
  const tremorPacks = [
    route(1405, '연성진동 재료를 먼저 모읍니다.', tremorPool),
    route(1406, '연성진동을 마무리합니다. 보석 진동자와 흔들리는 술통이 모이면 진원점도 만듭니다.', tremorPool)
  ];
  const rupturePacks = [
    route(1407, '황홀경을 먼저 노리고 파탄 재료는 모이는 만큼 챙깁니다.', rupturePool),
    route(1408, '이미 모은 쪽을 먼저 완성합니다. 파탄의 기괴한 석상은 합성식에서 별도로 확인합니다.', rupturePool)
  ];
  const sinkingPacks = [
    route(1409, '검은 악보의 지정 재료를 모읍니다.', sinkingPool),
    route(1410, '검은 악보의 빈 재료를 보충합니다. 장엄은 침잠 운용을 보강합니다.', sinkingPool)
  ];
  const poisePacks = [
    route(1411, '복주머니 재료를 먼저 모읍니다.', breathPool),
    route(1412, '복주머니 재료를 보충하고 치명타를 유지할 기프트를 확인합니다.', breathPool)
  ];
  const warpCharge = route(1106, '서보모터 두 재료가 필요하면 워프특급을 확인합니다.', [
    gift(9737, '팩 전용', '핵심 재료'), gift(9738, '팩 전용', '핵심 재료')
  ], '대체');
  const warpEncore = route(1123, '일반 워프특급 대신 두 재료를 노릴 수 있는 복각 팩입니다.', warpCharge.gifts, '대체');
  const chargePacks = [
    route(1413, '충전 수급 기프트와 영구기관 재료를 모읍니다.', chargePool),
    route(1414, '충전식 장갑을 찾고 영구기관의 빈 재료를 보충합니다.', chargePool)
  ];

  const decks = [
    deck('bleed', '출혈', '출혈', [9090], '피안개를 쓰려면 출혈 부여 공격 스킬을 가진 인격 5명 이상을 출전시킵니다.', [...redPacks, chickenBleed, factory, ...late], [bleedRecipe, devotion], 'https://limbus.haneuk.com/gifts/9090'),
    deck('burn', '화상', '화상', [9088, 9045], '진혼 재료와 화상 횟수 유지 수단부터 준비합니다.', [...firePacks, fireCheckup, factory, chicken, ...late], [burnRecipe, cookbook], ing + 'd7b9d36dd4c'),
    deck('tremor', '진동', '진동', [9092, 9166], '진동 폭발을 꾸준히 일으킬 인격을 편성합니다.', [...tremorPacks, clock, factory, chicken, ...late], [tremorRecipe, originRecipe, ...watches], ing + 'd6d13f89cb7'),
    deck('rupture', '파열', '파열', [9094, 9171], '파열 횟수를 유지할 인격을 넣고 합성 하나를 먼저 완성합니다.', [...rupturePacks, factory, chicken, ...late], [ruptureRecipe, ruptureHard], navi + '24'),
    deck('sinking', '침잠', '침잠', [9096, 9410], '검은 악보의 출전 조건과 침잠 횟수 수급을 확인합니다.', [...sinkingPacks, factory, chicken, purple, ...late], [sinkingRecipe, snowRecipe], ing + 'df22bb18aa0'),
    deck('poise', '호흡', '호흡', [9098, 9070], '호흡을 얻거나 부여하는 공격 스킬을 가진 인격을 출전시킵니다.', [...poisePacks, factory, chicken, ...late], [poiseRecipe, memoryRecipe], navi + '20'),
    deck('charge', '충전', '충전', [9075, 9100], '충전 횟수 수급부터 맞춘 뒤 메인 딜러의 소모 스킬을 보강합니다.', [...chargePacks, warpCharge, warpEncore, factory, chicken, ...late], [chargeRecipe, servoRecipe], ing + 'db007ef0165')
  ];

  const variants = [
    deck('wedge', '새벽·쐐기', '진동', [9293, 9297, 9092], '새벽·쐐기 인격을 중심으로 편성하고 사무소 전용 이벤트를 찾습니다.', [wedge, gun, clock, ...tremorPacks, factory, chicken, ...late], [tremorRecipe, poiseRecipe, memoryRecipe, ...watches], navi + '33'),
    deck('thumb', '엄지 화상·진동', '화상', [9088, 9092, 9728], '엄지 인격을 중심으로 화상과 진동의 출전 및 스킬 조건을 각각 확인합니다.', [fireCheckup, clock, gun, ...firePacks, ...tremorPacks, factory, chicken, ...late], [burnRecipe, cookbook, tremorRecipe, ...watches], ing + 'd7b9d36dd4c'),
    deck('bloodfiend', '혈귀 출혈', '출혈', [9090, 9205], '혈찬을 실제로 사용하는 혈귀 인격을 넣습니다.', [...redPacks, chickenBleed, factory, bloodLate, ...late], [bleedRecipe], 'https://limbus.haneuk.com/cardpacks/1507'),
    deck('sisyphe', '시지프 진동·출혈', '진동', [9092, 9090], '두 키워드 합성이 모두 발동하도록 진동·출혈 인격을 함께 편성합니다.', [gun, route(1029, '시지프 진출 플랜에서 전용 보강을 위해 고른 팩입니다.', [], '편성 후보'), ...tremorPacks, ...redPacks, chickenBleed, factory, ...late], [tremorRecipe, bleedRecipe], saigo + 'ca18e3d3-5235-4f91-aedf-167e9ca09826'),
    deck('heishou', '흑수 호흡·파열', '파열', [9094, 9098], '파열 횟수 유지와 호흡 발동 조건을 함께 확인합니다.', [gun, heishou, route(1121, '흑수 호파 공유 루트에 포함된 팩입니다.', [], '편성 후보'), ...rupturePacks, ...poisePacks, factory, chicken, ...late], [ruptureRecipe, poiseRecipe, memoryRecipe], navi + '15'),
    deck('rupture-gun', '파열·탄환', '파열', [9094, 9770], '탄환 인격이 있는 편성에서 마침표 팩의 가치를 확인합니다.', [gun, ...rupturePacks, route(1109, '공유 루트에서 선택한 장기 전투입니다. 필요 재료가 남았을 때만 검토합니다.', [], '편성 후보'), factory, chicken, purple, ...late], [ruptureRecipe, ruptureHard], navi + '24'),
    deck('wuthering', '검지·워더링', '침잠', [9301, 9096], '오르골과 유리관을 확보하고, 워더링·에드가 인격 조건을 확인합니다.', [manor, glass, ...sinkingPacks, factory, chicken, purple, ...late], [manorRecipe, sinkingRecipe, snowRecipe], community + '582996'),
    deck('blade', '검지·검계', '호흡', [9098, 9280], '검계 인격과 참격·호흡 관련 효과를 확인합니다.', [sword, archive, ...poisePacks, ...sinkingPacks, gun, factory, chicken, ...late], [poiseRecipe, memoryRecipe, bladeRecipe, sinkingRecipe], navi + '20'),
    deck('ring', '약지 충전·출혈', '충전', [9075, 9100, 9090], '약지의 충전 수급과 출혈 부여를 동시에 맞추는 편성입니다.', [chickenBleed, gun, route(1029, '바느질의 왕의 시침핀을 확인하고 필요한 경우 선택합니다.', [gift(9288, '팩 전용')], '편성 후보'), ...chargePacks, ...redPacks, warpCharge, factory, ...late], [chargeRecipe, bleedRecipe, servoRecipe], community + '577322'),
    deck('rouge', '르루주 충전·출혈', '충전', [9075, 9100, 9090], '르루주 인격의 충전·출혈 수급을 보고 필요한 전용 팩을 고릅니다.', [route(1031, '르루주 관련 보강을 얻는 팩입니다.', [gift(9284, '팩 전용')], '편성 후보'), chickenBleed, gun, ...chargePacks, ...redPacks, factory, ...late], [chargeRecipe, bleedRecipe], ing + 'db007ef0165'),
    deck('noir', '르누아르 진동·충전', '진동', [9092, 9075, 9100], '진동·충전 양쪽의 발동에 필요한 인원을 각각 확인합니다.', [gun, clock, ...tremorPacks, ...chargePacks, warpCharge, warpEncore, factory, chicken, ...late], [tremorRecipe, chargeRecipe, servoRecipe, ...watches], ing + 'd100ddd8524')
  ];

  window.mirrorDungeonRoutes = { decks, variants };
})();
