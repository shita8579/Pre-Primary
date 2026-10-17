export interface CarPart {
  id: string;
  name: string;
  nameId: string;
  emoji: string;
  functionEn: string;
  functionId: string;
  clayMethodEn: string;
  clayMethodId: string;
  paperMethodEn: string;
  paperMethodId: string;
  soundType: 'honk' | 'engine' | 'click';
}

export const CAR_PARTS: CarPart[] = [
  {
    id: 'wheels',
    name: 'Wheels & Tires (4 Roda)',
    nameId: 'Roda & Ban Karet',
    emoji: '🛞',
    functionEn: 'Round rubber wheels that roll smoothly on paved roads and turn to steer the car forward!',
    functionId: 'Roda karet bundar yang berputar di atas jalan darat untuk membuat mobil meluncur maju!',
    clayMethodEn: 'Roll 4 equal black or dark clay balls between your palms, then gently press them flat into round coin shapes!',
    clayMethodId: 'Gulung 4 bola plastisin hitam sama besar dengan telapak tangan, lalu tekan perlahan hingga berbentuk koin bundar pipih!',
    paperMethodEn: 'Collect 4 plastic bottle caps (tutup botol) or cut 4 round black paper circles, then attach them to the sides with glue or toothpicks!',
    paperMethodId: 'Gunakan 4 tutup botol plastik bekas atau gunting 4 lingkaran kertas hitam, lalu rekatkan di samping bodi dengan lem atau tusuk gigi!',
    soundType: 'engine',
  },
  {
    id: 'body',
    name: 'Car Body & Chassis (Bodi Mobil)',
    nameId: 'Bodi Utama & Rangka Mobil',
    emoji: '🚗',
    functionEn: 'The strong outer frame that protects the passengers and holds the seats, engine, and roof together!',
    functionId: 'Bodi utama yang kokoh untuk melindungi penumpang, memuat kursi duduk, serta menopang atap dan mesin!',
    clayMethodEn: 'Knead a large piece of red, blue, or yellow clay into an oval loaf, then gently flatten the sides and bottom into a sturdy car body!',
    clayMethodId: 'Remas segumpal plastisin warna cerah (merah/biru/kuning), bentuk lonjong seperti roti, lalu ratakan bawahnya agar berdiri tegak!',
    paperMethodEn: 'Use a clean small milk or juice carton box (kotak jus/susu), or fold a sheet of thick origami paper into a rectangular prism!',
    paperMethodId: 'Gunakan kotak bekas susu/jus kecil atau lipat kertas origami tebal menjadi balok persegi panjang untuk bodi mobil!',
    soundType: 'honk',
  },
  {
    id: 'windshield',
    name: 'Windshield & Windows (Kaca Jendela)',
    nameId: 'Kaca Depan & Jendela Samping',
    emoji: '🪟',
    functionEn: 'Clear safety glass so the driver can clearly see the road ahead, traffic lights, and other vehicles!',
    functionId: 'Kaca bening agar pengemudi bisa melihat jalanan di depan, lampu lalu lintas, dan terlindung dari angin serta hujan!',
    clayMethodEn: 'Flatten thin white or sky-blue clay strips, cut tiny square shapes, and press them onto the front and sides of your car body!',
    clayMethodId: 'Pipihkan plastisin tipis warna biru muda atau putih, potong kotak kecil, lalu tempelkan di bagian depan dan samping bodi!',
    paperMethodEn: 'Cut small squares of light blue or white paper, draw friendly driver eyes or smiley faces, and paste them onto the box!',
    paperMethodId: 'Gunting kertas origami biru muda berbentuk kotak atau trapesium, gambar pengemudi tersenyum, lalu tempelkan di sisi bodi!',
    soundType: 'click',
  },
  {
    id: 'headlights',
    name: 'Bright Headlights (Lampu Depan)',
    nameId: 'Lampu Depan & Belakang',
    emoji: '💡',
    functionEn: 'Powerful lights in the front that illuminate the dark road at night and flash warnings for safety!',
    functionId: 'Lampu terang di bagian depan untuk menerangi jalanan gelap di malam hari dan memberi tanda aman ke kendaraan lain!',
    clayMethodEn: 'Pinch 2 tiny yellow clay beads, roll them into small spheres, and press them onto the front corners of your car bumper!',
    clayMethodId: 'Ambil 2 butir kecil plastisin kuning terang, bulatkan menjadi kelereng mini, lalu tempelkan di sudut depan bodi mobil!',
    paperMethodEn: 'Draw or punch out 2 bright yellow paper dots, or use shiny yellow stickers/sequins and stick them on the front bumper!',
    paperMethodId: 'Gunting 2 lingkaran kecil kertas kuning atau gunakan stiker bintang kuning, lalu rekatkan di bagian depan sebagai lampu sorot!',
    soundType: 'click',
  },
  {
    id: 'steering',
    name: 'Steering Wheel (Setir Pengemudi)',
    nameId: 'Setir Pengemudi & Dashboard',
    emoji: '🎛️',
    functionEn: 'The round control wheel that the driver grips with two hands to turn the front tires left and right!',
    functionId: 'Lingkaran kemudi yang dipegang pengemudi untuk mengarahkan roda mobil belok ke kiri atau ke kanan!',
    clayMethodEn: 'Roll a thin clay noodle, curve it into an open ring circle with a center cross, and place it behind the front windshield!',
    clayMethodId: 'Gulung plastisin kecil memanjang seperti cacing, lengkungkan menjadi cincin bulat, lalu pasang di dekat kaca depan!',
    paperMethodEn: 'Cut a small circular ring from sturdy cardboard or use a small plastic ring/bottle cap, and paste it inside the cockpit!',
    paperMethodId: 'Gunting lingkaran kecil dari kardus atau gunakan tutup botol kecil, lalu rekatkan di dalam ruang kemudi!',
    soundType: 'honk',
  },
  {
    id: 'exhaust',
    name: 'Exhaust & Bumper (Knalpot & Bumper)',
    nameId: 'Knalpot & Bumper Pengaman',
    emoji: '💨',
    functionEn: 'The front bumper protects from gentle bumps, and the rear exhaust pipe releases engine exhaust safely behind!',
    functionId: 'Bumper depan melindungi bodi dari benturan, dan pipa knalpot di belakang mengeluarkan gas buang mesin dengan aman!',
    clayMethodEn: 'Roll a tiny gray cylinder tube and attach it low at the very back of the car for the exhaust pipe!',
    clayMethodId: 'Gulung silinder mini abu-abu dan tempelkan di bagian paling belakang bawah mobil sebagai pipa knalpot!',
    paperMethodEn: 'Cut a short 2 cm piece of a drinking straw, color it gray with a marker, and tape it under the back of the cardboard box!',
    paperMethodId: 'Gunting potongan sedotan minuman sepanjang 2 cm, warnai dengan spidol abu-abu, lalu tempelkan di belakang bawah kardus!',
    soundType: 'engine',
  },
];

export interface CraftStep {
  step: number;
  stepType: 'clay-1' | 'clay-2' | 'clay-3' | 'clay-4' | 'paper-1' | 'paper-2' | 'paper-3' | 'paper-4';
  titleEn: string;
  titleId: string;
  instructionEn: string;
  instructionId: string;
  emoji: string;
  tipId: string;
  imageAltId: string;
}

export const CLAY_CRAFT_STEPS: CraftStep[] = [
  {
    step: 1,
    stepType: 'clay-1',
    titleEn: 'Prepare 3 Colorful Clay Balls',
    titleId: 'Siapkan 3 Warna Plastisin (Clay)',
    instructionEn: 'Take 1 large lump of clay for the body (red/blue), 1 black lump for the wheels, and small yellow/white bits for lights and windows.',
    instructionId: 'Bagi plastisin: 1 gumpalan besar warna favorit untuk bodi, 1 gumpalan hitam untuk roda, dan sedikit warna kuning/putih untuk lampu & kaca.',
    emoji: '🟢',
    tipId: 'Remas-remas plastisin agar empuk dan mudah dibentuk oleh jari mungil anak.',
    imageAltId: 'Gambar 3 gumpalan plastisin di atas alas meja: merah untuk bodi, hitam untuk 4 roda, dan kuning untuk lampu depan.',
  },
  {
    step: 2,
    stepType: 'clay-2',
    titleEn: 'Shape the Car Body Chassis',
    titleId: 'Bentuk Bodi Utama Mobil',
    instructionEn: 'Roll the main clay into a rectangular loaf. Gently press the roof and make the front hood slope down smoothly.',
    instructionId: 'Bentuk plastisin utama menjadi balok lonjong. Tekan bagian depan sedikit miring untuk kap mesin dan biarkan atapnya lebih tinggi.',
    emoji: '🍞',
    tipId: 'Ketuk bagian dasar mobil di atas meja agar permukaannya rata dan bisa berdiri tegak.',
    imageAltId: 'Gambar tangan meremas dan membentuk balok bodi mobil dengan kap mesin miring dan bagian bawah yang rata kokoh.',
  },
  {
    step: 3,
    stepType: 'clay-3',
    titleEn: 'Roll & Attach 4 Round Wheels',
    titleId: 'Bentuk & Pasang 4 Roda Bundar',
    instructionEn: 'Roll 4 equal black clay spheres, flatten them with your thumb into wheel disks, and press 2 on each side of the body.',
    instructionId: 'Bagi plastisin hitam menjadi 4 bola kecil sama besar, pipihkan dengan jempol menjadi roda, lalu tempelkan 2 di kiri dan 2 di kanan.',
    emoji: '🛞',
    tipId: 'Bisa gunakan ujung tusuk gigi untuk memberi motif garis velg pada roda!',
    imageAltId: 'Gambar 4 roda plastisin hitam bundar dipasang di kedua sisi bodi mobil lengkap dengan ukiran velg tusuk gigi.',
  },
  {
    step: 4,
    stepType: 'clay-4',
    titleEn: 'Add Windows, Headlights & Smile',
    titleId: 'Hias Kaca, Lampu & Wajah Ceria',
    instructionEn: 'Press thin light-blue squares for windows, attach 2 yellow beads for headlights in front, and carve a happy smile with a toothpick!',
    instructionId: 'Tempelkan lempeng tipis biru muda untuk kaca jendela, 2 butir kuning untuk lampu depan, dan ukir senyum ceria di bumper!',
    emoji: '✨',
    tipId: 'Mobil buatanmu sekarang sudah siap dipamerkan di galeri karya kelas!',
    imageAltId: 'Gambar mobil plastisin yang sudah selesai dengan kaca biru, lampu kuning bersinar, dan senyum manis di bumper.',
  },
];

export const PAPER_CRAFT_STEPS: CraftStep[] = [
  {
    step: 1,
    stepType: 'paper-1',
    titleEn: 'Gather Recycled Box & Bottle Caps',
    titleId: 'Siapkan Kotak Bekas & 4 Tutup Botol',
    instructionEn: 'Use an empty small juice or milk box, 4 plastic bottle caps, colorful origami paper, kid safety scissors, and glue.',
    instructionId: 'Siapkan kotak bekas susu/jus kecil yang bersih, 4 tutup botol plastik (untuk roda), kertas lipat warna-warni, gunting anak, dan lem.',
    emoji: '🧃',
    tipId: 'Pastikan kotak bekas sudah dicuci bersih dan dikeringkan sebelum dipakai.',
    imageAltId: 'Gambar alat & bahan di meja: kotak jus bekas, 4 tutup botol warna-warni, kertas lipat, gunting anak tumpul, dan lem.',
  },
  {
    step: 2,
    stepType: 'paper-2',
    titleEn: 'Wrap the Box with Colorful Paper',
    titleId: 'Bungkus Kotak dengan Kertas Warna',
    instructionEn: 'Apply glue around the juice box and wrap it neatly in bright red, yellow, or green origami paper as the car chassis.',
    instructionId: 'Oleskan lem di sekeliling kotak, lalu bungkus rapi dengan kertas lipat warna merah atau kuning sebagai warna bodi mobil.',
    emoji: '🎨',
    tipId: 'Anak bisa menempelkan stiker hiasan atau menggambar corak api/bintang di bodi!',
    imageAltId: 'Gambar kotak jus yang dibungkus rapi dengan kertas lipat warna cerah seperti kado mobil impian.',
  },
  {
    step: 3,
    stepType: 'paper-3',
    titleEn: 'Attach 4 Bottle Cap Wheels',
    titleId: 'Pasang 4 Tutup Botol Sebagai Roda',
    instructionEn: 'Glue 2 bottle caps onto each side of the lower box, or poke wooden skewers through straws taped under the box for rolling wheels!',
    instructionId: 'Tempelkan 2 tutup botol di sisi kiri dan 2 di kanan bawah. Guru bisa membantu memasang tusuk gigi agar roda bisa benar-benar berputar!',
    emoji: '⚙️',
    tipId: 'Jika ingin roda berputar, rekatkan potongan sedotan di bawah kotak, lalu masukkan tusuk gigi dan tutup botol.',
    imageAltId: 'Gambar 4 tutup botol plastik terpasang kuat di bawah kotak dengan poros sedotan agar roda bisa berputar lancar.',
  },
  {
    step: 4,
    stepType: 'paper-4',
    titleEn: 'Cut & Glue Windows, Roof & Lights',
    titleId: 'Gunting & Tempel Jendela serta Lampu',
    instructionEn: 'Cut white paper squares for windows, draw passengers waving inside, and stick yellow paper circles for front headlights.',
    instructionId: 'Gunting kotak putih/biru untuk kaca jendela, gambar anak yang sedang melambaikan tangan di dalam jendela, dan tempel lingkaran kuning sebagai lampu!',
    emoji: '✂️',
    tipId: 'Mobil kertas daur ulang siap meluncur di jalur karpet kelas!',
    imageAltId: 'Gambar mobil kotak susu daur ulang yang sudah selesai dengan jendela anak melambaikan tangan dan nomor balap 1.',
  },
];
