import React, { useEffect, useRef, useState } from "react";

const AVATAR_OPTIONS = [
  {
    name: "Thalindra",
    hp: 970,
    type: "Mítico",
    weakness: "Multiversal",
    typeIcon: "/types/mitico.png",
    image: "/avatars/Thalindra.jpg",
    bgFit: "cover",
    bgPosition: "center top",
    attacks: [
      {
        name: "Santuario de las Criaturas",
        damage: 190,
        description: "",
        effect: null,
      },
      {
        name: "Esporas Esmeralda",
        damage: 50,
        description: "Cada vez que se use, el avatar recupera +20 PV.",
        effect: {
          type: "self_heal",
          heal: 20,
        },
      },
    ],
  },
  {
    name: "Sarah Ardent",
    hp: 965,
    type: "Guerrero",
    weakness: "Mágico",
    typeIcon: "/types/guerrero.png",
    image: "/avatars/Sarah-Ardent.jpg",
    bgFit: "cover",
    bgPosition: "center top",
    attacks: [
      {
        name: "Aliento de Dragón",
        damage: 180,
        description:
          "Si este avatar usó su ataque secundario el turno anterior, este ataque inflige +20 PD. Además, tu oponente deberá descartar 1 carta al azar de su mano.",
        effect: {
          type: "bonus_if_previous_turn_attack_was",
          attackName: "Flecha Flamígera",
          bonusDamage: 20,
        },
      },
      {
        name: "Flecha Flamígera",
        damage: 90,
        description:
          "Cada ataque que reciba este avatar (sea de un avatar principal o de uno secundario), durante 2 turnos, se minimizará en -10 PD.",
        effect: {
          type: "grant_self_damage_reduction",
          amount: 10,
          durationTurns: 2,
        },
      },
    ],
  },
  {
    name: "Aethera Hex",
    hp: 980,
    type: "Multiversal",
    weakness: "Mítico",
    typeIcon: "/types/multiversal.png",
    image: "/avatars/Aethera-Hex.jpg",
    bgFit: "cover",
    bgPosition: "center top",
    attacks: [
      {
        name: "Supernova de Antimateria",
        damage: 210,
        description:
          "En este turno, ninguna carta de Objeto o Azar afectarán a este avatar principal.",
        effect: null,
      },
      {
        name: "Fractura de la Realidad",
        damage: 90,
        description:
          "Si este ataque se realiza cuando tengas al menos 1 objeto activo, deberás escoger entre: recuperar 2 EM de tu pila de descarte, o reducir 2 EM ligadas al avatar principal de tu rival.",
        effect: null,
      },
    ],
  },
  {
    name: "Citlali Teyah",
    hp: 940,
    type: "Guerrero",
    weakness: "Mágico",
    typeIcon: "/types/guerrero.png",
    image: "/avatars/Citlali-Teyah.jpg",
    bgFit: "cover",
    bgPosition: "center top",
    attacks: [
      {
        name: "Ritual de Quetzalcóatl",
        damage: 160,
        description:
          "Si este ataque derrota a un avatar secundario, recupera +50 PV. Además, coloca 1 EM adicional a este avatar en este turno.",
        effect: {
          type: "if_attack_defeats_secondary_self_heal",
          heal: 50,
        },
      },
      {
        name: "Embestida Jaguar",
        damage: 80,
        description:
          "Si tu oponente no tiene ninguna EM ligada a su avatar principal en este turno, este ataque inflige +20 PD.",
        effect: {
          type: "if_enemy_has_no_em_bonus",
          bonusDamage: 20,
        },
      },
    ],
  },
  {
    name: "Hal'Lethrra",
    hp: 945,
    type: "Mágico",
    weakness: "Guerrero",
    typeIcon: "/types/magico.png",
    image: "/avatars/Hal-Lethrra.jpg",
    bgFit: "cover",
    bgPosition: "center top",
    attacks: [
      {
        name: "Hechizo de Sangre y Hielo",
        damage: 170,
        description:
          "Si el avatar principal del oponente tiene más EM que tu avatar principal, este ataque inflige +20 PD y no podrá ligar EM en su próximo turno.",
        effect: {
          type: "enemy_has_more_em_than_self_bonus",
          bonusDamage: 20,
        },
      },
      {
        name: "Maldición y Sacrificio",
        damage: 80,
        description: "Cada vez que se active, este avatar sufre 40 PD.",
        effect: {
          type: "self_damage",
          selfDamage: 40,
        },
      },
    ],
  },
  {
    name: "Nefereth Ra",
    hp: 950,
    type: "Mítico",
    weakness: "Multiversal",
    typeIcon: "/types/mitico.png",
    image: "/avatars/Nefereth-Ra.jpg",
    bgFit: "cover",
    bgPosition: "center top",
    attacks: [
      {
        name: "Maldición de Sol Egipcio",
        damage: 180,
        description:
          "El oponente no puede usar cartas de azar o cartas de objeto/habilidad durante el próximo turno. Si el avatar enemigo tiene 600 PV o menos, inflige +30 PD.",
        effect: {
          type: "enemy_hp_below_or_equal",
          threshold: 600,
          bonusDamage: 30,
        },
      },
      {
        name: "Purgatorio de Anubis",
        damage: 100,
        description:
          "Al invocarse el ataque, el oponente deberá escoger entre: en el próximo turno roba 1 carta revelándola, o eliminar 1 EM ligada a su avatar principal.",
        effect: null,
      },
    ],
  },
  {
  name: "Aurhiel",
  hp: 970,
  type: "Luz / Celestial",
  weakness: "Oscuro / Demoniaco",
  typeIcon: "/types/luz-celestial.png",
  image: "/avatars/Aurhiel.jpg",
  bgFit: "cover",
  bgPosition: "center top",
  attacks: [
    {
      name: "Castigo Celestial",
      damage: 170,
      description:
          "Si este ataque baja los PV del Avatar Principal del oponente a 700 PV o menos, el oponente no podrá colocar EM en su siguiente turno.",
      effect: {
        type: "if_attack_leaves_enemy_main_at_or_below_block_em",
        threshold: 700,
      },
    },
    {
      name: "Espada de Gracia Divina",
      damage: 75,
      description:
          "Si este ataque se ejecuta antes que 'Castigo Celestial' como 1er ataque en partida, inflige +10 PD. Además, si el Avatar Principal del oponente es de tipo Oscuro / Demoniaco, inflige +10 PD extra.",
      effect: {
        type: "compound",
        effects: [
          {
            type: "first_before_named_attack_bonus",
            attackName: "Castigo Celestial",
            bonusDamage: 10,
          },
          {
            type: "enemy_type_bonus",
            enemyType: "Oscuro / Demoniaco",
            bonusDamage: 10,
          },
        ],
      },
    },
  ],
},
{
  name: "Elariss",
  hp: 940,
  type: "Guerrero",
  weakness: "Mágico",
  typeIcon: "/types/guerrero.png",
  image: "/avatars/Elariss.jpg",
  bgFit: "cover",
  bgPosition: "center top",
  attacks: [
    {
      name: "Pacto de Honor y Gloria",
      damage: 160,
      description:
        "Si el Avatar Principal del oponente es de tipo Mágico: no podrá jugar Cartas de Azar en su siguiente turno y este ataque inflige +20 PD.",
      effect: {
        type: "enemy_main_type_bonus",
        enemyType: "Mágico",
        bonusDamage: 20,
      },
    },
    {
      name: "Sigilo Perfecto de Halcón",
      damage: 80,
      description:
        "Si este ataque se activa antes de 'Pacto de Honor y Gloria' por primera vez en la partida, roba 1 carta extra de tu mazo y tu oponente deberá descartar 1 carta de su mano aleatoriamente.",
      effect: null,
    },
  ],
},
  {
  name: "Artemia",
  hp: 950,
  type: "Guerrero",
  weakness: "Mágico",
  typeIcon: "/types/guerrero.png",
  image: "/avatars/Artemia.jpg",
  bgFit: "cover",
  bgPosition: "center top",
  attacks: [
    {
      name: "Coliseo de Arena y Sangre",
      damage: 185,
      description:
        "Si el oponente tiene 4 o más cartas en su pila de descarte, podrás unir 1 carta de EM extra en este turno. Si no tienes EM en tu mano, roba 1 carta extra de tu mazo.",
      effect: null,
    },
    {
      name: "Doble Filo Romano",
      damage: 100,
      description:
        "El próximo ataque del oponente inflige -20 PD. Si el Avatar del oponente es de tipo Mágico, el daño de su siguiente ataque se reduce a -30 PD.",
      effect: {
        type: "reduce_enemy_next_attack",
        baseReduction: 20,
        enemyType: "Mágico",
        typeReduction: 30,
      },
    },
  ],
},

  {
  name: "Zahriel",
  hp: 970,
  type: "Oscuro / Demoniaco",
  weakness: "Luz / Celestial",
  typeIcon: "/types/oscuro-demoniaco.png",
  image: "/avatars/Zahriel.jpg",
  bgFit: "cover",
  bgPosition: "center top",
  attacks: [
    {
      name: "Profanación Prohibida",
      damage: 165,
      description:
        "Si el Avatar Principal del oponente es de tipo Luz / Celestial, roba la carta superior de su mazo durante el resto de la partida. Hazlo revelándola y luego colocándola en tu mano.",
      effect: {
        type: "enemy_main_type_steal_top_deck_each_turn",
        enemyType: "Luz / Celestial",
      },
    },
    {
      name: "Cacería de Almas",
      damage: 80,
      description:
        "Si tu oponente tiene 1 o más EM ligadas en sus Avatares o Cartas de Azar, este ataque inflige +10 PD y Zahriel recupera +5 PV.",
      effect: {
        type: "if_enemy_has_energy_or_chance_bonus_and_heal",
        bonusDamage: 10,
        heal: 5,
      },
    },
  ],
},
 {
    name: "Kohana Saionji",
    hp: 950,
    type: "Mágico",
    weakness: "Multiversal",
    typeIcon: "/types/magico.png",
    image: "/avatars/Kohana.jpg",
    bgFit: "cover",
    bgPosition: "center top",
    attacks: [
    {
      name: "Conjuro Prohibido Saionji",
      damage: 175,
      description:
        "Inflige +3 PD extra por cada carta en la mano del oponente (máx. +60 PD). Si el enemigo es tipo Guerrero, inflige +20 PD.",
      effect: {
        type: "enemy_main_type_bonus",
        enemyType: "Guerrero",
        bonusDamage: 20,
      },
    },
    {
      name: "Katana Kuro-mahō",
      damage: 120,
      description:
        "Si el oponente ligó EM en su turno anterior, inflige +25 PD. Si no, deberá descartar aleatoriamente una carta de Objeto o Azar de su mano.",
      effect: {
        type: "conditional_previous_turn_em",
        bonusDamage: 25,
        elseEffect: "random_discard_object_or_chance",
      },
    },
  ],
},
  {
    name: "Solaria",
    hp: 985,
    type: "Luz / Celestial",
    weakness: "Oscuro / Demoniaco",
    typeIcon: "/types/luz-celestial.png",
    image: "/avatars/Solaria.jpg",
    bgFit: "cover",
    bgPosition: "center top",
    attacks: [
      {
        name: "Castigo de los Seis Dioses",
        damage: 210,
        description:
          "El oponente descarta 1 EM ligada de su Avatar Principal. Además, no podrá usar cartas de Invocación o Azar en su próximo turno. Si el Avatar Principal enemigo tiene 750 PV o menos, inflige +10 PD.",
        effect: {
          type: "compound",
          effects: [
            {
              type: "remove_enemy_em",
              amount: 1,
            },
            {
              type: "enemy_hp_below_or_equal",
              threshold: 750,
              bonusDamage: 10,
            },
          ],
        },
      },
      {
        name: "Emboscada de Serafines",
        damage: 100,
        description:
          "Si tu avatar secundario es de tipo Luz / Celestial, al usar este ataque inflige +30 PD. Además, recupera 1 EM de tu pila de descarte y +10 PV.",
        effect: {
          type: "compound",
          effects: [
            {
              type: "bonus_if_own_secondary_type_is",
              secondaryType: "Luz / Celestial",
              bonusDamage: 30,
            },
            {
              type: "self_heal",
              heal: 10,
            },
          ],
        },
      },
    ],
  },
  {
  name: "Noxaria",
  hp: 985,
  type: "Oscuro / Demoniaco",
  weakness: "Luz / Celestial",
  typeIcon: "/types/oscuro-demoniaco.png",
  image: "/avatars/Noxaria.jpg",
  bgFit: "cover",
  bgPosition: "center top",
  attacks: [
    {
      name: "Eterna Condena Blasfema",
      damage: 210,
      description:
        "El oponente no puede usar Cartas de Objetos o Habilidades de Curación durante 2 turnos. Si el avatar enemigo tiene 600 PV o menos, inflige +10 PD.",
      effect: {
        type: "enemy_hp_below_or_equal",
        threshold: 600,
        bonusDamage: 10,
      },
    },
    {
      name: "Horda Dévora-Almas",
      damage: 120,
      description:
        "Si tu avatar Secundario es de tipo Oscuro / Demoniaco, al usar este ataque inflige +30 PD. Además, el oponente revela su mano y descarta 1 carta al azar.",
      effect: {
        type: "bonus_if_own_secondary_type_is",
        secondaryType: "Oscuro / Demoniaco",
        bonusDamage: 30,
      },
    },
  ],
},
];

const SECONDARY_AVATARS = [
  {
    id: "hella",
    name: "Hella Mogarth",
    hp: 820,
    summonCardName: "Báculo de las Almas Caídas",
    image: "/secondary/Hella.jpg",
    summonImage: "/secondary/INV - Báculo de las Almas Caídas.png",
    type: "Oscuro / Demoniaco",
    typeIcon: "/types/oscuro-demoniaco.png",
    weakness: "Luz / Celestial",
    turnsDuration: 10,
    attacks: [
      {
        name: "Despertar de Ultratumba",
        damage: 100,
        description:
          "Durante el próximo turno del oponente, su ataque inflige -30 PD. Luego toma 2 cartas de tu pila de descarte y regrésalas a tu mano.",
        effect: {
          type: "grant_enemy_next_turn_bonus_damage",
          amount: -30,
        },
      },
      {
        name: "Maldición del Cetro",
        damage: 90,
        description:
          "Si atacas a un avatar de tipo Luz / Celestial, inflige +20 PD. Cada vez que este ataque se invoque, este avatar secundario obtendrá -20 PV.",
        effect: {
          type: "compound",
          effects: [
            {
              type: "enemy_type_bonus",
              enemyType: "Luz / Celestial",
              bonusDamage: 20,
            },
            {
              type: "self_damage",
              selfDamage: 20,
            },
          ],
        },
      },
    ],
  },
  {
    id: "medusa",
    name: "Medusa",
    hp: 800,
    summonCardName: "Mirada de Medusa",
    image: "/secondary/Medusa.jpg",
    summonImage: "/secondary/INV - Mirada de Medusa.png",
    type: "Mítico",
    typeIcon: "/types/mitico.png",
    weakness: "Multiversal",
    turnsDuration: 10,
    attacks: [
      {
        name: "Encanto Petrificante",
        damage: 130,
        description:
          "Si es su primer ataque y se activa antes de TIRO ENVENENADO: Medusa recupera su 50% de PV que perdió al ser invocada. Si no es así, el oponente en su próximo turno no podrá ligar EM ni a su avatar principal, ni a su avatar secundario.",
        effect: {
          type: "medusa_first_attack_or_block_em",
        },
      },
      {
        name: "Tiro Envenenado",
        damage: 40,
        description:
          "Cuando actives por primera vez este ataque, el oponente perderá 5 PV cada turno hasta que Medusa salga de juego.",
        effect: {
          type: "poison_until_secondary_leaves",
          amount: 5,
        },
      },
    ],
  },
  {
    id: "prismara",
    name: "Prismara",
    hp: 830,
    summonCardName: "Llamado de Guerra Celestial",
    image: "/secondary/Prismara.jpg",
    summonImage: "/secondary/INV - Llamado de Guerra Celestial.png",
    type: "Luz / Celestial",
    typeIcon: "/types/luz-celestial.png",
    weakness: "Oscuro / Demoniaco",
    turnsDuration: 10,
    attacks: [
      {
        name: "Alba de Justicia Inmediata",
        damage: 110,
        description:
          "Si este es el primer ataque que realiza este avatar, recupera 150 PV y mantiene ligada 1 EM. Si no es el primer ataque de este avatar, roba 1 carta cada vez que este ataque se active.",
        effect: {
          type: "prismara_first_attack_or_draw",
          heal: 150,
        },
      },
      {
        name: "Defensa Divina",
        damage: 70,
        description:
          "Si este ataque va dirigido a un avatar tipo Oscuro / Demoniaco, reduce en -30 PD el próximo ataque que reciba tu avatar principal.",
        effect: {
          type: "grant_main_damage_reduction_if_enemy_type",
          enemyType: "Oscuro / Demoniaco",
          amount: 30,
        },
      },
    ],
  },
  {
    id: "valdrea",
    name: "Valdrea Noir",
    hp: 800,
    summonCardName: "Sangre y Alas Liberadas",
    image: "/secondary/Valdrea.jpg",
    summonImage: "/secondary/INV - Sangre y Alas Liberadas.png",
    type: "Mítico",
    typeIcon: "/types/mitico.png",
    weakness: "Multiversal",
    turnsDuration: 10,
    attacks: [
      {
        name: "Alas de Condena y Justicia",
        damage: 120,
        description:
          "Si este ataque golpea a un avatar principal de tipo Multiversal, este ataque inflige +20 PD la próxima vez que se active.",
        effect: {
          type: "bonus_next_time_if_hits_main_multiversal",
          bonusDamage: 20,
        },
      },
      {
        name: "Pacto de Sangre",
        damage: 80,
        description:
          "Si este avatar tiene menos de 200 PV, este ataque inflige +40 PD.",
        effect: {
          type: "self_hp_below_bonus",
          threshold: 200,
          bonusDamage: 40,
        },
      },
    ],
  },
  {
    id: "karessa",
    name: "Karessa Dránn",
    hp: 850,
    summonCardName: "Furia de Yelmo Dránnico",
    image: "/secondary/Karessa.jpg",
    summonImage: "/secondary/INV - Furia de Yelmo Dránnico.png",
    type: "Multiversal",
    typeIcon: "/types/multiversal.png",
    weakness: "Mítico",
    turnsDuration: 10,
    attacks: [
      {
        name: "Cortadura Hiriente Neón",
        damage: 100,
        description:
          "Si el oponente es de tipo Mítico, este ataque inflige +10 PD. Además, ambos jugadores roban 1 carta de su mazo al mismo tiempo.",
        effect: {
          type: "any_enemy_type_bonus",
          enemyType: "Mítico",
          bonusDamage: 10,
        },
      },
      {
        name: "Runa Victoriosa",
        damage: 70,
        description:
          "Si al activar este ataque, Karessa está a 3 turnos o menos de salir de juego, la EM usada para activarlo regresa a tu mano.",
        effect: null,
      },
    ],
  },
  {
    id: "necrondra",
    name: "Necrondra",
    hp: 850,
    summonCardName: "Ritual de la Biblioteca Negra",
    image: "/secondary/Necrondra.jpg",
    summonImage: "/secondary/INV - Ritual de la Biblioteca Negra.png",
    type: "Mágico",
    typeIcon: "/types/magico.png",
    weakness: "Multiversal",
    turnsDuration: 10,
    attacks: [
      {
        name: "Hechizo de Ceguera Mental",
        damage: 120,
        description:
          "Toma 2 cartas de tu mazo y revélalas a tu oponente. Luego, añádelas a tu mano, baraja y haz que tu oponente escoja 1 carta al azar. Esa carta se descarta.",
        effect: null,
      },
      {
        name: "Castigo del Carnero",
        damage: 100,
        description:
          "Si alguno de los avatares de tu contrincante es de tipo Multiversal, este ataque inflige +10 PD. Cada vez que actives este ataque, este avatar pierde -20 PV.",
        effect: {
          type: "compound",
          effects: [
            {
              type: "any_enemy_type_bonus",
              enemyType: "Multiversal",
              bonusDamage: 10,
            },
            {
              type: "self_damage",
              selfDamage: 20,
            },
          ],
        },
      },
    ],
  },
];

const LIBRARY_FILE_NAMES = [
  "AZ - Abismo Desesperante.png",
  "AZ - Alquimista Tacaña.png",
  "AZ - Cardinales del Mago.png",
  "AZ - Cazadora del Inframundo.png",
  "AZ - Guardián de los 6 Pilares.png",
  "AZ - Invocadora Ultra Celestial.png",
  "AZ - Juicio de los Diez Netjeru.png",
  "AZ - Ley del Vidente Ciego.png",
  "AZ - Paradoja Atemporal.png",
  "AZ - Valentía Felina.png",
  "C - Eco del Turno Perdido.png",
  "C - Elixir de Lucidez Forzada.png",
  "C - Espejo Decisivo.png",
  "C - Juramento Suspendido.png",
  "C - Mirada Inquietante.png",
  "C - Poción de Resguardo.png",
  "C - Poción de Vida Carmesí.png",
  "C - Pulso Tardío.png",
  "C - Sello del Silencio.png",
  "C - Suerte Líquida.png",
  "E - Acción Rebote.png",
  "E - Cápsula de Energía Total.png",
  "E - Desición Instantánea.png",
  "E - Fenix Multiversal.png",
  "E - Juramento Sacrificado.png",
  "E - Rayo de Zeus.png",
  "E - Reloj de Energía Suspendida.png",
  "E - Sentencia Despiadada.png",
  "E - Vínculo del Alma.png",
  "E - Yelmo de Salvación.png",
  "EM - Gran Dominio Energético.png",
  "EM - Cataclismo Energético.png",
  "EM - Doble Energía Maldita.png",
  "EM - Energía Anclaversal.png",
  "EM - Energía de Azar Multiversal.png",
  "EM - Energía de Multiplicación.png",
  "EM - Energía Gigaversal.png",
  "EM - Energía Multiversal Alpha.png",
  "EM - Energía Multiversal Dual.png",
  "EM - Energía Neo-Multiversal.png",
  "EM - Triple Energía Sagrada.png",
  "Energía Multiversal.png",
  "INV - Báculo de las Almas Caídas.png",
  "INV - Llamado de Guerra Celestial.png",
  "INV - Mirada de Medusa.png",
  "INV - Sangre y Alas Liberadas.png",
  "INV - Furia de Yelmo Dránnico.png",
  "INV - Ritual de la Biblioteca Negra.png",
  "L - Códice Absoluto.png",
  "L - Despojo Hiriente.png",
  "L - Escudo del Último Aliento.png",
  "L - Gracia del Destino.png",
  "L - Regalo Divino CELTA.png",
  "L - Regalo Divino EGIP.png",
  "L - Regalo Divino GRIEGO.png",
  "L - Regalo Divino JAP.png",
  "L - Regalo Divino ROMANO.png",
  "L - Sed de Justicia.png",
  "R - Anulación Absoluta.png",
  "R - Destino Blasfemo.png",
  "R - Equilibrio Multiversal.png",
  "R - Juicio del Oráculo.png",
  "R - Marca del Juicio Final.png",
  "R - Ojo de Retorno Carmesí.png",
  "R - Ojo del Oráculo.png",
  "R - Relicario Divino.png",
  "R - Reloj del Juicio.png",
  "R Fisura Multiversal.png",
];

const LIBRARY_PREFIX_META = {
  C: {
    category: "Objeto",
    rarity: "Común",
    tone: "common",
    summary: "Carta común de objeto dentro del catálogo general del juego.",
  },
  E: {
    category: "Objeto",
    rarity: "Épica",
    tone: "epic",
    summary: "Carta épica de objeto pensada para jugadas de alto impacto.",
  },
  R: {
    category: "Objeto",
    rarity: "Rara",
    tone: "rare",
    summary: "Carta rara de objeto con presencia ofensiva o táctica destacada.",
  },
  L: {
    category: "Objeto",
    rarity: "Legendaria",
    tone: "legendary",
    summary: "Carta legendaria de objeto reservada para efectos decisivos.",
  },
  EM: {
    category: "Energía",
    rarity: "Energía",
    tone: "energy",
    summary: "Carta de energía enfocada en acelerar o potenciar estrategias.",
  },
  INV: {
    category: "Invocación",
    rarity: "Invocación",
    tone: "summon",
    summary: "Carta de invocación vinculada a apariciones y apoyo de campo.",
  },
  AZ: {
    category: "Azar",
    rarity: "Azar",
    tone: "chance",
    summary: "Carta de azar con resultados impredecibles y giros sorpresivos.",
  },
};

const LIBRARY_CARD_OVERRIDES = {
  "eco-del-turno-perdido": {
    effect: "El contrincante no roba carta en su próximo turno.",
    summary: "Controla el ritmo del rival y castiga el siguiente ciclo de robo.",
  },
  "elixir-de-lucidez-forzada": {
    effect: "Lanza un efecto aleatorio que puede beneficiar o perjudicar.",
    summary: "Una carta impredecible que puede inclinar la partida en cualquier dirección.",
  },
  "espejo-decisivo": {
    effect: "Reduce en 30 PD el siguiente ataque recibido.",
    summary: "Mitiga el próximo golpe y compra tiempo para reorganizar el turno.",
  },
  "desicion-instantanea": {
    name: "Decisión Instantánea",
  },
  "fenix-multiversal": {
    name: "Fénix Multiversal",
  },
  "abismo-desesperante": {
    chanceStars: 0,
    frameAccent: "#19d35f",
  },
  "alquimista-tacana": {
    chanceStars: 1,
    frameAccent: "#c79d42",
  },
  "cardinales-del-mago": {
    chanceStars: 1,
    frameAccent: "#d4b45d",
  },
  "cazadora-del-inframundo": {
    chanceStars: 3,
    frameAccent: "#ff5247",
  },
  "guardian-de-los-6-pilares": {
    chanceStars: 1,
    frameAccent: "#5fce7f",
  },
  "invocadora-ultra-celestial": {
    chanceStars: 3,
    frameAccent: "#a86dff",
  },
  "juicio-de-los-diez-netjeru": {
    chanceStars: 1,
    frameAccent: "#f3a24a",
  },
  "ley-del-vidente-ciego": {
    chanceStars: 0,
    frameAccent: "#8fd36a",
  },
  "paradoja-atemporal": {
    chanceStars: 1,
    frameAccent: "#b78b45",
  },
  "valentia-felina": {
    chanceStars: 1,
    frameAccent: "#ff7aa6",
  },
  "energia-multiversal": {
    energyRarity: "Común",
  },
  "energia-multiversal-alpha": {
    energyRarity: "Rara",
  },
  "energia-multiversal-dual": {
    energyRarity: "Rara",
  },
  "triple-energia-sagrada": {
    energyRarity: "Épica",
  },
  "energia-neo-multiversal": {
    energyRarity: "Rara",
  },
  "energia-gigaversal": {
    energyRarity: "Rara",
  },
  "gran-dominio-energetico": {
    energyRarity: "Legendaria",
    frameAccent: "#e24a4a",
    panelAccentEnd: "#3f87ff",
  },
  "energia-anclaversal": {
    energyRarity: "Rara",
  },
  "cataclismo-energetico": {
    energyRarity: "Legendaria",
    frameAccent: "#f1bf58",
    panelAccentEnd: "#3f87ff",
  },
  "doble-energia-maldita": {
    energyRarity: "Épica",
  },
  "energia-de-azar-multiversal": {
    energyRarity: "Rara",
  },
  "energia-de-multiplicacion": {
    energyRarity: "Rara",
  },
  "codice-absoluto": {
    frameAccent: "#f2cf86",
    panelAccentEnd: "#090909",
  },
  "despojo-hiriente": {
    frameAccent: "#7e91a3",
    panelAccentEnd: "#090909",
  },
  "escudo-del-ultimo-aliento": {
    frameAccent: "#dce7f5",
    panelAccentEnd: "#090909",
  },
  "gracia-del-destino": {
    frameAccent: "#f0dfb6",
    panelAccentEnd: "#090909",
  },
  "regalo-divino-celta": {
    frameAccent: "#9a62ff",
    panelAccentEnd: "#090909",
  },
  "regalo-divino-egip": {
    frameAccent: "#e8bb58",
    panelAccentEnd: "#090909",
  },
  "regalo-divino-griego": {
    frameAccent: "#87b4ff",
    panelAccentEnd: "#090909",
  },
  "regalo-divino-jap": {
    frameAccent: "#dd6a6a",
    panelAccentEnd: "#090909",
  },
  "regalo-divino-romano": {
    frameAccent: "#78d7ff",
    panelAccentEnd: "#090909",
  },
  "sed-de-justicia": {
    frameAccent: "#ff995f",
    panelAccentEnd: "#090909",
  },
};

const parseLibraryCardFileName = (fileName) => {
  const baseName = fileName.replace(/\.png$/i, "");

  if (!/^Energ(?:i|í)a\b/i.test(baseName)) {
    const match = baseName.match(/^(AZ|EM|INV|C|E|L|R)\s*-?\s*(.+)$/);

    if (match) {
      return {
        prefix: match[1],
        rawName: match[2],
      };
    }
  }

  return {
    prefix: "EM",
    rawName: baseName,
  };
};

const slugifyLibraryName = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const LIBRARY_ASSET_FILES = [
  "C - Eco del Turno Perdido.png",
  "C - Elixir de Lucidez Forzada.png",
  "C - Espejo Decisivo.png",
  "C - Juramento Suspendido.png",
  "C - Mirada Inquietante.png",
  "C - Poción de Resguardo.png",
  "C - Poción de Vida Carmesí.png",
  "C - Pulso Tardío.png",
  "C - Sello del Silencio.png",
  "C - Suerte Líquida.png",
  "E - Acción Rebote.png",
  "E - Cápsula de Energía Total.png",
  "E - Desición Instantánea.png",
  "E - Fenix Multiversal.png",
  "E - Juramento Sacrificado.png",
  "E - Rayo de Zeus.png",
  "E - Reloj de Energía Suspendida.png",
  "E - Sentencia Despiadada.png",
  "E - Vínculo del Alma.png",
  "E - Yelmo de Salvación.png",
  "EM - Cataclismo Energético.png",
  "EM - Doble Energía Maldita.png",
  "EM - Energía Anclaversal.png",
  "EM - Energía de Azar Multiversal.png",
  "EM - Energía de Multiplicación.png",
  "EM - Energía Gigaversal.png",
  "EM - Energía Multiversal Alpha.png",
  "EM - Energía Multiversal Dual.png",
  "EM - Energía Neo-Multiversal.png",
  "EM - Gran Dominio Energético.png",
  "EM - Triple Energía Sagrada.png",
  "Energía Multiversal.png",
  "INV - Báculo de las Almas Caídas.png",
  "INV - Furia de Yelmo Dránnico.png",
  "INV - Llamado de Guerra Celestial.png",
  "INV - Mirada de Medusa.png",
  "INV - Ritual de la Biblioteca Negra.png",
  "INV - Sangre y Alas Liberadas.png",
  "L - Códice Absoluto.png",
  "L - Despojo Hiriente.png",
  "L - Escudo del Último Aliento.png",
  "L - Gracia del Destino.png",
  "L - Regalo Divino CELTA.png",
  "L - Regalo Divino EGIP.png",
  "L - Regalo Divino GRIEGO.png",
  "L - Regalo Divino JAP.png",
  "L - Regalo Divino ROMANO.png",
  "L - Sed de Justicia.png",
  "R - Anulación Absoluta.png",
  "R - Destino Blasfemo.png",
  "R - Equilibrio Multiversal.png",
  "R - Juicio del Oráculo.png",
  "R - Marca del Juicio Final.png",
  "R - Ojo de Retorno Carmesí.png",
  "R - Ojo del Oráculo.png",
  "R - Relicario Divino.png",
  "R - Reloj del Juicio.png",
  "R Fisura Multiversal.png",
  "AZ - Abismo Desesperante.png",
  "AZ - Alquimista Tacaña.png",
  "AZ - Cardinales del Mago.png",
  "AZ - Cazadora del Inframundo.png",
  "AZ - Guardián de los 6 Pilares.png",
  "AZ - Invocadora Ultra Celestial.png",
  "AZ - Juicio de los Diez Netjeru.png",
  "AZ - Ley del Vidente Ciego.png",
  "AZ - Paradoja Atemporal.png",
  "AZ - Valentía Felina.png",
];

const normalizeLibraryAssetName = (value) => {
  let normalized = value;

  if (typeof normalized === "string" && /[\u00C3\u00C2\u00E2]/.test(normalized)) {
    try {
      normalized = new TextDecoder("utf-8").decode(
        Uint8Array.from(normalized, (char) => char.charCodeAt(0))
      );
    } catch {
      normalized = value;
    }
  }

  return normalized
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9.]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
};

const toLibraryImagePath = (fileName) => {
  const target = normalizeLibraryAssetName(fileName);
  const matchedFile = LIBRARY_ASSET_FILES.find(
    (assetFile) => normalizeLibraryAssetName(assetFile) === target
  );
  return `/library/${encodeURIComponent(matchedFile ?? fileName)}`;
};

const LIBRARY_OBJECT_ORDER = {
  common: 0,
  epic: 1,
  rare: 2,
  legendary: 3,
};

const LIBRARY_ENERGY_ORDER = {
  "Común": 0,
  "Épica": 1,
  Rara: 2,
  Legendaria: 3,
};

const LIBRARY_CHANCE_ORDER = {
  "Común": 0,
  Rara: 1,
  "Épica": 2,
  Legendaria: 3,
};

const getLibraryCardSortKey = (card) => {
  if (["common", "epic", "rare", "legendary"].includes(card.tone)) {
    return [0, LIBRARY_OBJECT_ORDER[card.tone] ?? 99];
  }

  if (card.tone === "energy") {
    return [1, LIBRARY_ENERGY_ORDER[card.energyRarity ?? card.rarity] ?? 99];
  }

  if (card.tone === "summon") {
    return [2, 0];
  }

  if (card.tone === "chance") {
    const chanceRarity =
      card.chanceStars >= 3
        ? "Legendaria"
        : card.chanceStars === 2
        ? "Épica"
        : card.chanceStars === 1
        ? "Rara"
        : "Común";

    return [3, LIBRARY_CHANCE_ORDER[chanceRarity] ?? 99];
  }

  return [99, 99];
};

const LIBRARY_CARDS = LIBRARY_FILE_NAMES.map((fileName, index) => {
  const { prefix, rawName } = parseLibraryCardFileName(fileName);
  const meta = LIBRARY_PREFIX_META[prefix] ?? LIBRARY_PREFIX_META.C;
  const slug = slugifyLibraryName(rawName);
  const overrides = LIBRARY_CARD_OVERRIDES[slug] ?? {};

  return {
    id: index + 1,
    slug,
    fileName,
    name: overrides.name ?? rawName,
    category: meta.category,
    rarity: meta.rarity,
    tone: meta.tone,
    chanceStars: overrides.chanceStars ?? null,
    energyRarity: overrides.energyRarity ?? null,
    frameAccent: overrides.frameAccent ?? null,
    panelAccentEnd: overrides.panelAccentEnd ?? null,
    effect: overrides.effect ?? "Texto de efecto pendiente de catalogar en la librería.",
    summary: overrides.summary ?? meta.summary,
    image: toLibraryImagePath(fileName),
  };
}).sort((a, b) => {
  const [groupA, rarityA] = getLibraryCardSortKey(a);
  const [groupB, rarityB] = getLibraryCardSortKey(b);

  if (groupA !== groupB) return groupA - groupB;
  if (rarityA !== rarityB) return rarityA - rarityB;

  return a.name.localeCompare(b.name, "es", { sensitivity: "base" });
});

const getChanceRarityLabel = (chanceStars = 0) => {
  if (chanceStars >= 3) return "Legendaria";
  if (chanceStars === 2) return "Épica";
  if (chanceStars === 1) return "Rara";
  return "Común";
};

const getEnergyRarityLabel = (card) => card.energyRarity ?? card.rarity;

const getLibraryCardRarityLabel = (card) => {
  if (card.tone === "chance") {
    return getChanceRarityLabel(card.chanceStars);
  }

  if (card.tone === "energy") {
    return getEnergyRarityLabel(card);
  }

  if (card.tone === "summon") {
    return card.rarity;
  }

  if (["common", "epic", "rare", "legendary"].includes(card.tone)) {
    return card.rarity;
  }

  return "";
};

const getLibrarySelectorMetaLabel = (card) => {
  const rarityLabel = getLibraryCardRarityLabel(card);
  const compactRarityLabel =
    rarityLabel === "Legendaria" ? "LEGEND." : rarityLabel.toUpperCase();

  if (card.tone === "summon") {
    return "INVOCACIÓN";
  }

  if (card.tone === "energy") {
    return rarityLabel ? `E. MULTIV . ${compactRarityLabel}` : "E. MULTIV";
  }

  if (card.tone === "chance") {
    return rarityLabel ? `AZAR . ${compactRarityLabel}` : "AZAR";
  }

  if (["common", "epic", "rare", "legendary"].includes(card.tone)) {
    return rarityLabel ? `OBJETO . ${compactRarityLabel}` : "OBJETO";
  }

  return "";
};

const normalizeDisplayText = (value) => {
  if (typeof value !== "string" || !/[\u00C3\u00C2\u00E2]/.test(value)) return value;

  try {
    return new TextDecoder("utf-8").decode(
      Uint8Array.from(value, (char) => char.charCodeAt(0))
    );
  } catch {
    return value;
  }
};

const getAvatarData = (avatarName) => {
  return (
    AVATAR_OPTIONS.find((a) => a.name === avatarName) || AVATAR_OPTIONS[0]
  );
};

const getSecondaryAvatarData = (secondaryId) => {
  return SECONDARY_AVATARS.find((a) => a.id === secondaryId) || null;
};

const ATTACK_COST_MAP = {
  Thalindra: {
    "Santuario de las Criaturas": 4,
    "Esporas Esmeralda": 2,
  },
  "Sarah Ardent": {
    "Aliento de Dragón": 5,
    "Flecha Flamígera": 3,
  },
  "Aethera Hex": {
    "Supernova de Antimateria": 6,
    "Fractura de la Realidad": 3,
  },
  Aurhiel: {
    "Castigo Celestial": 4,
    "Espada de Gracia Divina": 3,
  },
  Elariss: {
    "Pacto de Honor y Gloria": 3,
    "Sigilo Perfecto de Halcón": 2,
  },
  Solaria: {
    "Castigo de los Seis Dioses": 6,
    "Emboscada de Serafines": 4,
  },
  Noxaria: {
    "Eterna Condena Blasfema": 6,
    "Horda Dévora-Almas": 3,
  },
  Zahriel: {
    "Profanación Prohibida": 4,
    "Cacería de Almas": 3,
  },
  Artemia: {
    "Coliseo de Arena y Sangre": 4,
    "Doble Filo Romano": 2,
  },
  "Hal'Lethrra": {
    "Hechizo de Sangre y Hielo": 4,
    "Maldición y Sacrificio": 1,
  },
  "Nefereth Ra": {
    "Maldición de Sol Egipcio": 5,
    "Purgatorio de Anubis": 3,
  },
  "Citlali Teyah": {
    "Ritual de Quetzalcóatl": 4,
    "Embestida Jaguar": 2,
  },
  "Kohana Saionji": {
    "Conjuro Prohibido Saionji": 5,
    "Katana Kuro-mahō": 3,
  },
  "Hella Mogarth": {
    "Despertar de Ultratumba": 3,
    "Maldición del Cetro": 2,
  },
  Medusa: {
    "Encanto Petrificante": 2,
    "Tiro Envenenado": 1,
  },
  Prismara: {
    "Alba de Justicia Inmediata": 3,
    "Defensa Divina": 2,
  },
  "Valdrea Noir": {
    "Alas de Condena y Justicia": 3,
    "Pacto de Sangre": 2,
  },
  "Karessa Dránn": {
    "Cortadura Hiriente Neón": 2,
    "Runa Victoriosa": 1,
  },
  Necrondra: {
    "Hechizo de Ceguera Mental": 2,
    "Castigo del Carnero": 1,
  },
};

const getAttackCost = (avatarName, attack) => {
  if (!attack) return 0;
  return ATTACK_COST_MAP[avatarName]?.[attack.name] ?? attack.cost ?? 0;
};

const getAttackModifierKey = (playerId, slot, avatarName, attackName) =>
  `${playerId}:${slot}:${avatarName}:${attackName}`;

const createCombatState = () => ({
  previousTurnAttack: null,
  currentTurnAttack: null,
  previousTurnEmPlaced: false,
  currentTurnEmPlaced: false,
  attackBlockedTurns: 0,
  consecutiveAttackName: null,
  consecutiveCount: 0,
  nextAttackBonus: {
    amount: 0,
  },
  nextAttackReduction: {
    amount: 0,
  },
  pendingAttackBonuses: {},
  emPlacementBlockedTurns: 0,
  poisonPerTurn: {
    amount: 0,
    sourceSecondaryId: null,
  },
  damageReduction: {
    amount: 0,
    turnsLeft: 0,
  },
  extraDamageTaken: {
    amount: 0,
    turnsLeft: 0,
  },
});

const CHRONICLES_STORAGE_KEY = "jhoyce-chronicles-v1";
const MAX_CHRONICLE_SLOTS = 10;

const createPlayerBattleStats = (mainAvatarName = "") => ({
  mainAvatarName,
  secondarySummonedName: null,
  secondarySummonTurn: null,
  secondaryTurnsSurvived: 0,
  damageDealt: 0,
  damageReceived: 0,
  healingTotal: 0,
  emPlacedTotal: 0,
  attacksPerformed: 0,
  strongestHit: 0,
  manualHpAdjustments: 0,
  manualPdAdjustments: 0,
  switchesBetweenMainSecondary: 0,
  effectsActivated: 0,
  attackBlockedCount: 0,
  emBlockedCount: 0,
});

const createBattleStatsState = (player1Name = "", player2Name = "") => ({
  player1: createPlayerBattleStats(player1Name),
  player2: createPlayerBattleStats(player2Name),
});

const createEmptyChronicleSlots = () => Array(MAX_CHRONICLE_SLOTS).fill(null);

const formatChronicleDuration = (elapsedSeconds = 0) => {
  const hours = Math.floor(elapsedSeconds / 3600);
  const minutes = Math.floor((elapsedSeconds % 3600) / 60);
  const seconds = elapsedSeconds % 60;

  return hours > 0
    ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    : `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const formatChronicleSavedAt = (savedAt) => {
  if (!savedAt) return "";

  try {
    return new Date(savedAt).toLocaleString("es-EC", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
};

function PlayerPanel({
  panelPlayerId,
  playerLabel,
  name,
  setName,
  hp,
  setHp,
  defaultHp,
  setDefaultHp,
  history,
  setHistory,
  ownCombatState,
  setOwnCombatState,
  mainHpFlash,
  secondaryHpFlash,
  turn,
  isConfirmed,
  onReady,
  onChooseOtherAvatar,
  onRequestResetHp,
  onRequestAdjustHp,
  secondaryAvatar,
  secondaryPanelVisible,
  secondaryTurnDisplay,
  onSecondaryButtonClick,
  activeSlot,
  onSetActiveSlot,
  isRouletteActive,
  rouletteIndex,
  rouletteRevealActive,
  battleIntroStaging,
  battleIntroVisible,
  battleEndSequenceActive,
  battleEndSequenceStage,
  showVictoryContent,
  onAttackRequest,
  onHealRequest,
  ownEm,
  onIncreaseEm,
  onDecreaseEm,
  gameStarted,
  gameOver,
  winner,
  chronicleEntry,
  isTurnActive,
  canPassTurn,
  onPassTurn,
  onRequestAdjustAttack,
  getAdjustedAttackDamage,
  bgClass,
  hpSyncRequest,
  mainHpPopup,
  secondaryHpPopup,
}) {
  
  const avatarData = getAvatarData(name);
  const healOptions = [5, 10, 20, 50, 80];
  const isLeftSide = bgClass === "left-side";

  const [showTypeInfo, setShowTypeInfo] = useState(false);
  const [showInactiveTypeIconColor, setShowInactiveTypeIconColor] = useState(false);
  const [activationEffect, setActivationEffect] = useState(false);
  const [isSecondaryPanelSwitching, setIsSecondaryPanelSwitching] = useState(false);
  const [showAvatarCardModal, setShowAvatarCardModal] = useState(false);
  const [isBattleAvatarCardFlipped, setIsBattleAvatarCardFlipped] = useState(false);
  const [displayedMainHp, setDisplayedMainHp] = useState(hp);
  const [displayedSecondaryHp, setDisplayedSecondaryHp] = useState(
    secondaryAvatar?.currentHp ?? 0
  );
  const switchSlotTimeoutRef = useRef(null);
  const switchPanelTimeoutRef = useRef(null);
  const mainHpAnimationRef = useRef(null);
  const secondaryHpAnimationRef = useRef(null);
  const displayedMainHpRef = useRef(hp);
  const displayedSecondaryHpRef = useRef(secondaryAvatar?.currentHp ?? 0);
  const previousMainNameRef = useRef(name);
  const previousSecondaryIdRef = useRef(secondaryAvatar?.id ?? null);
  const previousConfirmedRef = useRef(isConfirmed);

  const addHistory = (text) => {
    setHistory((prev) => [text, ...prev.slice(0, 5)]);
  };

const mainAvatarView = {
  name: avatarData.name,
  currentHp: hp,
  maxHp: defaultHp,
  attacks: avatarData.attacks,
  image: avatarData.image,
  type: avatarData.type,
  weakness: avatarData.weakness,
  bgFit: avatarData.bgFit,
  bgPosition: avatarData.bgPosition,
};

const activeAvatar =
  activeSlot === "secondary" && secondaryAvatar
    ? {
        ...secondaryAvatar,
        attacks: secondaryAvatar.attacks || [],
        image: secondaryAvatar.image,
        type: secondaryAvatar.type,
        weakness: secondaryAvatar.weakness,
        bgFit: "cover",
        bgPosition: "center top",
      }
    : mainAvatarView;
const backdropAvatar = gameOver ? mainAvatarView : activeAvatar;
  const activeAvatarCardImage = getAvatarCardImage(activeAvatar.name) ?? activeAvatar.image;
  const displayedHeaderName =
    isRouletteActive && !gameStarted
      ? AVATAR_OPTIONS[rouletteIndex]?.name ?? name
      : name;

const isSecondaryActive = activeSlot === "secondary" && !!secondaryAvatar;
const activeAttacks = activeAvatar.attacks || [];
const maxAttackCost = activeAttacks.reduce(
  (max, currentAttack) => Math.max(max, getAttackCost(activeAvatar.name, currentAttack)),
  0
);
const activeHpFlash = isSecondaryActive ? secondaryHpFlash : mainHpFlash;
const secondaryPanelHpFlash = isSecondaryActive ? mainHpFlash : secondaryHpFlash;
const activeEm = isSecondaryActive ? secondaryAvatar?.currentEm ?? 0 : ownEm;
const shouldShowTypeIconInColor = isTurnActive || showInactiveTypeIconColor;
const activeDisplayedHp = isSecondaryActive ? displayedSecondaryHp : displayedMainHp;
const secondaryPanelDisplayedHp = isSecondaryActive ? displayedMainHp : displayedSecondaryHp;
const activeHpPopupData = isSecondaryActive ? secondaryHpPopup : mainHpPopup;
const secondaryPanelHpPopupData = isSecondaryActive ? mainHpPopup : secondaryHpPopup;
const secondaryTurnToneClass =
  secondaryTurnDisplay === null
    ? ""
    : secondaryTurnDisplay <= 2
    ? "turn-low"
    : secondaryTurnDisplay <= 5
    ? "turn-mid"
    : "turn-high";
const hasHealableTarget =
  hp < defaultHp ||
  (secondaryAvatar && secondaryAvatar.currentHp < secondaryAvatar.maxHp);
const canUseHealButtons =
  gameStarted && !gameOver && isTurnActive && hasHealableTarget;
const hasSecondarySummoned = !!secondaryAvatar;
const canSummonSecondary =
  gameStarted &&
  !gameOver &&
  isTurnActive &&
  turn > 1 &&
  !hasSecondarySummoned &&
  secondaryTurnDisplay !== 0;
const canToggleSecondaryPanel = gameStarted && !gameOver && hasSecondarySummoned;
const isSecondaryButtonDisabled = !canSummonSecondary && !canToggleSecondaryPanel;
const secondaryButtonTitle = hasSecondarySummoned
  ? secondaryPanelVisible
    ? "Ocultar Avatar Secundario"
    : "Mostrar Avatar Secundario"
  : turn <= 1
  ? "No puedes invocar Avatar Secundario en el turno 1"
  : "Invocar Avatar Secundario";
const shouldAnimateSecondaryButtonDamage =
  hasSecondarySummoned &&
  !secondaryPanelVisible &&
  (mainHpFlash === "damage" || secondaryHpFlash === "damage");
const secondaryButtonDamageClass = shouldAnimateSecondaryButtonDamage
  ? "secondary-avatar-btn-damage-impact secondary-avatar-btn-hit-dark"
  : "";
const canPlaceEm =
  gameStarted &&
  !gameOver &&
  isTurnActive &&
  (ownCombatState?.emPlacementBlockedTurns || 0) <= 0;
const isAttackBlocked =
  gameStarted &&
  !gameOver &&
  isTurnActive &&
  (ownCombatState?.attackBlockedTurns || 0) > 0;
const isWinnerSide = gameOver && winner === name;
const isLoserSide = gameOver && winner !== "Empate" && winner !== name;
const isWinnerPanel = showVictoryContent && isWinnerSide;
const isLoserPanel = showVictoryContent && isLoserSide;

const renderEnergyControl = () => (
  <div
    className={`em-control-stack ${isLeftSide ? "em-control-red" : "em-control-cyan"} ${
      !gameStarted || gameOver || !isTurnActive ? "em-control-inactive" : ""
    }`}
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: "8px",
    }}
  >
    <button
      type="button"
      className="em-control-btn"
      onClick={onIncreaseEm}
      disabled={!canPlaceEm}
      style={{
        width: "90px",
        height: "44px",
        border: "none",
        borderRadius: "14px",
        background: "rgba(255, 255, 255, 0.16)",
        color: "white",
        fontSize: "1.9rem",
        fontWeight: 800,
        cursor: "pointer",
      }}
      title={!canPlaceEm && gameStarted && !gameOver && isTurnActive ? "No puedes ligar EM este turno" : undefined}
    >
      +
    </button>

    <button
      type="button"
      className="em-control-display"
      disabled
      style={{
        width: "90px",
        minHeight: "54px",
        border: "none",
        borderRadius: "14px",
        background: "rgba(0, 0, 0, 0.45)",
        color: "white",
        fontSize: "1rem",
        fontWeight: 800,
        cursor: "default",
      }}
      title="Energía Multiversal actual"
    >
      <span className="em-control-value">{activeEm}</span>{" "}
      <span className="em-control-label">EM</span>
    </button>

    <button
      type="button"
      className="em-control-btn"
      onClick={onDecreaseEm}
      disabled={!gameStarted || gameOver || !isTurnActive || activeEm <= 0}
      style={{
        width: "90px",
        height: "44px",
        border: "none",
        borderRadius: "14px",
        background: "rgba(255, 255, 255, 0.16)",
        color: "white",
        fontSize: "1.9rem",
        fontWeight: 800,
        cursor: "pointer",
      }}
    >
      -
    </button>
  </div>
);

const updateDisplayedMainHp = (value) => {
  displayedMainHpRef.current = value;
  setDisplayedMainHp(value);
};

const updateDisplayedSecondaryHp = (value) => {
  displayedSecondaryHpRef.current = value;
  setDisplayedSecondaryHp(value);
};

const animateHpCounter = (targetValue, currentValueRef, setValue, animationRef) => {
  if (animationRef.current) {
    cancelAnimationFrame(animationRef.current);
    animationRef.current = null;
  }

  const startValue = currentValueRef.current;

  if (startValue === targetValue) {
    setValue(targetValue);
    return;
  }

  const duration = Math.min(520, Math.max(180, 180 + Math.abs(targetValue - startValue) * 1.6));
  const startTime = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const nextValue = Math.round(startValue + (targetValue - startValue) * easedProgress);

    setValue(nextValue);

    if (progress < 1) {
      animationRef.current = requestAnimationFrame(tick);
    } else {
      animationRef.current = null;
      setValue(targetValue);
    }
  };

  animationRef.current = requestAnimationFrame(tick);
};

useEffect(() => {
  const justConfirmed = isConfirmed && !previousConfirmedRef.current;
  previousConfirmedRef.current = isConfirmed;

  if (!justConfirmed) return;

  const activationFrame = requestAnimationFrame(() => {
    setActivationEffect(true);
  });
  const activationTimer = setTimeout(() => {
    setActivationEffect(false);
  }, 700);

  return () => {
    cancelAnimationFrame(activationFrame);
    clearTimeout(activationTimer);
  };
}, [isConfirmed]);

useEffect(() => {
  if (isTurnActive) return;

  const resetInactiveColorTimer = setTimeout(() => {
    setShowInactiveTypeIconColor(false);
  }, 0);

  return () => clearTimeout(resetInactiveColorTimer);
}, [isTurnActive, activeAvatar.name]);

useEffect(() => {
  setIsBattleAvatarCardFlipped(false);
}, [showAvatarCardModal, activeAvatar.name]);

useEffect(() => {
  if (showAvatarCardModal) {
    document.body.classList.add("battle-modal-open");
    return () => {
      document.body.classList.remove("battle-modal-open");
    };
  }

  return undefined;
}, [showAvatarCardModal]);

useEffect(() => {
  return () => {
    if (switchSlotTimeoutRef.current) clearTimeout(switchSlotTimeoutRef.current);
    if (switchPanelTimeoutRef.current) clearTimeout(switchPanelTimeoutRef.current);
  };
}, []);

useEffect(() => {
  return () => {
    if (mainHpAnimationRef.current) cancelAnimationFrame(mainHpAnimationRef.current);
    if (secondaryHpAnimationRef.current) cancelAnimationFrame(secondaryHpAnimationRef.current);
  };
}, []);

useEffect(() => {
  if (previousMainNameRef.current !== name) {
    previousMainNameRef.current = name;
    if (mainHpAnimationRef.current) cancelAnimationFrame(mainHpAnimationRef.current);
    const resetMainHpFrame = requestAnimationFrame(() => {
      updateDisplayedMainHp(hp);
    });
    return () => cancelAnimationFrame(resetMainHpFrame);
  }

  animateHpCounter(hp, displayedMainHpRef, updateDisplayedMainHp, mainHpAnimationRef);
}, [hp, name]);

useEffect(() => {
  const secondaryId = secondaryAvatar?.id ?? null;
  const secondaryCurrentHp = secondaryAvatar?.currentHp ?? 0;

  if (previousSecondaryIdRef.current !== secondaryId) {
    previousSecondaryIdRef.current = secondaryId;
    if (secondaryHpAnimationRef.current) cancelAnimationFrame(secondaryHpAnimationRef.current);
    const resetSecondaryHpFrame = requestAnimationFrame(() => {
      updateDisplayedSecondaryHp(secondaryCurrentHp);
    });
    return () => cancelAnimationFrame(resetSecondaryHpFrame);
  }

  if (!secondaryId) {
    const clearSecondaryHpFrame = requestAnimationFrame(() => {
      updateDisplayedSecondaryHp(0);
    });
    return () => cancelAnimationFrame(clearSecondaryHpFrame);
  }

  animateHpCounter(
    secondaryCurrentHp,
    displayedSecondaryHpRef,
    updateDisplayedSecondaryHp,
    secondaryHpAnimationRef
  );
}, [secondaryAvatar?.id, secondaryAvatar?.currentHp]);

useEffect(() => {
  if (!hpSyncRequest || hpSyncRequest.playerId !== panelPlayerId) return;

  if (hpSyncRequest.slot === "secondary") {
    if (secondaryHpAnimationRef.current) cancelAnimationFrame(secondaryHpAnimationRef.current);
    updateDisplayedSecondaryHp(secondaryAvatar?.currentHp ?? 0);
    return;
  }

  if (mainHpAnimationRef.current) cancelAnimationFrame(mainHpAnimationRef.current);
  updateDisplayedMainHp(hp);
}, [hpSyncRequest, panelPlayerId, hp, secondaryAvatar?.currentHp]);

  const handleAvatarChange = (selectedName) => {
  const selectedAvatar = getAvatarData(selectedName);

  setName(selectedName);
  setDefaultHp(selectedAvatar.hp);
  setHp(selectedAvatar.hp);
  setOwnCombatState(createCombatState());
  setShowTypeInfo(false);
  setShowInactiveTypeIconColor(false);
  addHistory(`${selectedName} seleccionado (${selectedAvatar.hp} PV)`);
};

const handleToggleActiveAvatar = () => {
  if (!secondaryAvatar || isSecondaryPanelSwitching) return;

  const nextSlot = isSecondaryActive ? "main" : "secondary";

  setIsSecondaryPanelSwitching(true);

  if (switchSlotTimeoutRef.current) clearTimeout(switchSlotTimeoutRef.current);
  if (switchPanelTimeoutRef.current) clearTimeout(switchPanelTimeoutRef.current);

  switchSlotTimeoutRef.current = setTimeout(() => {
    onSetActiveSlot(nextSlot);
    switchSlotTimeoutRef.current = null;
  }, 120);

  switchPanelTimeoutRef.current = setTimeout(() => {
    setIsSecondaryPanelSwitching(false);
    switchPanelTimeoutRef.current = null;
  }, 420);
};

return (
<>
<div
  className={`player-panel ${bgClass} ${gameStarted && isTurnActive ? "turn-active" : ""} ${
    isWinnerPanel ? "gameover-winner-panel" : ""
  } ${isLoserPanel ? "gameover-loser-panel" : ""}`}
>
  <div className={`panel-bg ${activeHpFlash === "damage" ? "panel-bg-hit-dark" : ""}`}>
    <img
  key={backdropAvatar.image}
  src={backdropAvatar.image}
  alt={backdropAvatar.name}
  className={`panel-bg-image ${
    battleEndSequenceActive
      ? battleEndSequenceStage === "duel"
        ? "avatar-end-sequence-duel"
        : "avatar-end-sequence-monochrome"
      : gameOver
      ? isWinnerSide
        ? "avatar-gameover-winner"
        : "avatar-gameover-loser"
      : !gameStarted
      ? isConfirmed
        ? "avatar-ready"
        : "avatar-not-ready"
      : isTurnActive
      ? "avatar-turn-active"
      : "avatar-turn-inactive"
  } ${activationEffect ? "avatar-activation" : ""} ${
    rouletteRevealActive ? "panel-bg-image-roulette-reveal" : ""
  } ${
    isSecondaryPanelSwitching ? "panel-bg-image-switching" : ""
  } ${
    activeHpFlash === "damage" ? "panel-bg-image-damage-impact" : ""
  }`}
  style={{
  objectFit: backdropAvatar.bgFit || "cover",
  objectPosition: backdropAvatar.bgPosition || "center top",
  }}
/>
    <div
      className={`panel-bg-transition-overlay ${
        isSecondaryPanelSwitching || rouletteRevealActive ? "active" : ""
      }`}
    />
    <div
      className={`panel-bg-overlay ${
        bgClass === "left-side" ? "panel-bg-overlay-red" : "panel-bg-overlay-blue"
      }`}
    />
  </div>

  {isLoserPanel && chronicleEntry ? (
    <div className="panel-content battle-end-panel-content battle-end-panel-content-loser">
      <BattleEndStatsCard entry={chronicleEntry} />
    </div>
  ) : isWinnerPanel ? (
    <div className="panel-content battle-end-panel-content battle-end-panel-content-winner">
      <div className="battle-end-winner-badge">
        <span className="battle-end-winner-kicker">Victoria</span>
        <span className="battle-end-winner-name">{name}</span>
        {chronicleEntry && (
          <span className="battle-end-winner-meta">
            {chronicleEntry.duration} · {chronicleEntry.turnsPlayed} turnos
          </span>
        )}
      </div>
    </div>
  ) : (
  <div
    className={`panel-content ${
      battleIntroStaging
        ? battleIntroVisible
          ? "battle-intro-reveal"
          : "battle-intro-hidden"
        : ""
    }`}
  >
      <div className={`panel-top ${bgClass === "left-side" ? "panel-top-left" : ""}`}>
<div className="avatar-header">
  <div className={`avatar-name-area ${isSecondaryActive ? "secondary-active" : ""}`}>
    <select
      className={`name-select ${gameStarted ? "battle-card-icon-active" : ""}`}
      value={displayedHeaderName}
      disabled={gameStarted || isConfirmed}
      onChange={(e) => handleAvatarChange(e.target.value)}
    >
      {AVATAR_OPTIONS.map((avatar) => (
        <option key={avatar.name} value={avatar.name}>
          {avatar.name}
        </option>
      ))}
    </select>

    {isSecondaryActive && (
      <div className="active-secondary-name">
        {activeAvatar.name}
      </div>
    )}

    {gameStarted && (
      <button
        type="button"
        className="avatar-card-preview-btn"
        onClick={() => setShowAvatarCardModal(true)}
        aria-label={`Ver carta de ${activeAvatar.name}`}
        title={`Ver carta de ${activeAvatar.name}`}
      >
        <img
          src="/ui/summon-card-icon.png"
          alt=""
          className="avatar-card-preview-icon"
        />
      </button>
    )}
  </div>

  <div className={`avatar-type-row ${bgClass === "left-side" ? "avatar-type-row-left" : ""}`}>
    <button
      type="button"
      className="avatar-type-toggle"
      onClick={() => {
        setShowTypeInfo((prev) => !prev);
        if (!isTurnActive) {
          setShowInactiveTypeIconColor((prev) => !prev);
        }
      }}
      aria-label={`Mostrar tipo de ${activeAvatar.name}`}
    >
      <img
        src={isSecondaryActive ? secondaryAvatar.typeIcon : avatarData.typeIcon}
        alt={activeAvatar.type}
        className={`avatar-type-icon ${
          shouldShowTypeIconInColor ? "avatar-type-icon-color" : "avatar-type-icon-muted"
        }`}
      />
    </button>

    {showTypeInfo && (
      <div className={`avatar-type-info ${bgClass === "left-side" ? "avatar-type-info-left" : ""}`}>
        <span className="avatar-type-text">{activeAvatar.type}</span>
        <span className="avatar-weakness-text">
          Debilidad: {activeAvatar.weakness}
        </span>
      </div>
    )}
  </div>
</div>

  {gameStarted && !gameOver && (
    <div className="header-pass-slot">
      <button
        className={`pass-turn-btn header-pass-btn ${
          bgClass === "right-side" ? "header-pass-btn-right" : "header-pass-btn-left"
        }`}
        onClick={onPassTurn}
        disabled={!canPassTurn}
        aria-label="Pasar turno"
      >
        <img
          src="/ui/pass-turn-icon.png"
          alt=""
          className={`pass-turn-icon ${
            bgClass === "right-side" ? "pass-turn-icon-rotated" : ""
          }`}
        />
      </button>
    </div>
  )}
</div>

<div className="turn-action-row">
  {!gameStarted && !isConfirmed && (
    <button
      className="ready-btn"
      onClick={onReady}
      disabled={isRouletteActive}
    >
      {name} LISTA!
    </button>
  )}

  {!gameStarted && isConfirmed && (
    <button
      className="choose-other-btn"
      onClick={onChooseOtherAvatar}
      disabled={isRouletteActive}
    >
      ESCOGER OTRO
    </button>
  )}
</div>

{gameStarted && secondaryAvatar && (
  <div
    className={`secondary-active-wrapper ${
      secondaryPanelVisible ? "is-visible" : "is-hidden"
    }`}
  >
    <div className="secondary-active-wrapper-inner">
      <button
        type="button"
        className={`secondary-large-panel ${
          isSecondaryActive ? "active" : ""
        } ${bgClass === "left-side" ? "secondary-large-panel-red" : "secondary-large-panel-blue"} ${
          !isTurnActive ? "turn-inactive-visual" : ""
        }`}
        onClick={handleToggleActiveAvatar}
      >
        <div
          className={`secondary-large-panel-image-wrap ${
            secondaryPanelHpFlash === "damage" ? "secondary-large-panel-hit-dark" : ""
          }`}
        >
          <img
            src={isSecondaryActive ? avatarData.image : secondaryAvatar.image}
            alt={isSecondaryActive ? avatarData.name : secondaryAvatar.name}
            className={`secondary-large-panel-image ${
              secondaryPanelHpFlash === "damage" ? "secondary-large-panel-image-damage-impact" : ""
            }`}
          />
          <div className="secondary-large-panel-image-overlay" />
        </div>

        <div className="secondary-large-panel-info">
          <span className="secondary-large-panel-label">
           {isSecondaryActive ? "Volver a Principal" : "Cambiar a Secundario"}
          </span>

          <span
            className={`secondary-large-panel-hp ${
              secondaryPanelHpFlash ? `hp-flash-${secondaryPanelHpFlash}` : ""
            }`}
          >
            <span className="secondary-large-panel-hp-value">
              {secondaryPanelDisplayedHp}
            </span>
            <span className="secondary-large-panel-hp-unit">PV</span>
          </span>

          <span className="secondary-large-panel-name">
            {isSecondaryActive ? avatarData.name : secondaryAvatar.name}
          </span>
          {secondaryPanelHpPopupData && (
            <div
              key={secondaryPanelHpPopupData.tick}
              className={`hp-float-popup hp-float-popup-secondary hp-float-${secondaryPanelHpPopupData.kind}`}
            >
              {secondaryPanelHpPopupData.text}
            </div>
          )}
        </div>
      </button>
    </div>
  </div>
)}

<div className={`hp-box ${gameStarted ? "hp-action-layout" : "hp-center-only"}`}>
  {gameStarted && (
    <div className="hp-side-action left-action">
      {isLeftSide ? (
        <>
          <button
            className={`secondary-avatar-btn icon-secondary-btn ${secondaryButtonDamageClass}`}
            title={secondaryButtonTitle}
            aria-label={secondaryButtonTitle}
            disabled={isSecondaryButtonDisabled}
            onClick={onSecondaryButtonClick}
          >
            <img
              src="/ui/secondary-avatar-icon.png"
              alt="Avatar Secundario"
              className="secondary-avatar-icon"
            />
          </button>

          {secondaryTurnDisplay !== null && (
            <div className={`secondary-turn-indicator ${secondaryTurnToneClass}`}>
              {`T${secondaryTurnDisplay}`}
            </div>
          )}
        </>
      ) : (
        renderEnergyControl()
      )}
    </div>
  )}

  <div className="hp-center-display single-line-hp">
    {activeHpPopupData && (
      <div
        key={activeHpPopupData.tick}
        className={`hp-float-popup hp-float-popup-main hp-float-${activeHpPopupData.kind}`}
      >
        {activeHpPopupData.text}
      </div>
    )}
    <span className={`hp-number ${activeHpFlash ? `hp-flash-${activeHpFlash}` : ""}`}>
    {activeDisplayedHp}
    </span>
    <span className="hp-inline-label">{playerLabel}</span>
  </div>

{gameStarted && (
  <div className="hp-side-action right-action">
    {isLeftSide ? (
      renderEnergyControl()
    ) : (
      <button
        className={`secondary-avatar-btn icon-secondary-btn ${secondaryButtonDamageClass}`}
        title={secondaryButtonTitle}
        aria-label={secondaryButtonTitle}
        disabled={isSecondaryButtonDisabled}
        onClick={onSecondaryButtonClick}
      >
        <img
          src="/ui/secondary-avatar-icon.png"
          alt="Avatar Secundario"
          className="secondary-avatar-icon"
        />
      </button>
    )}

    {!isLeftSide && secondaryTurnDisplay !== null && (
      <div className={`secondary-turn-indicator ${secondaryTurnToneClass}`}>
        {`T${secondaryTurnDisplay}`}
      </div>
    )}
  </div>
)}

</div>

      <div className="attacks-box">
        {activeAttacks.map((attack) => {
          const attackCost = getAttackCost(activeAvatar.name, attack);
          const adjustedDamage = getAdjustedAttackDamage
            ? getAdjustedAttackDamage(activeSlot, activeAvatar.name, attack)
            : attack.damage;
          const hasEnoughEm = activeEm >= attackCost;
          const attackIsReady =
            gameStarted && !gameOver && isTurnActive && !isAttackBlocked && hasEnoughEm;
          const attackHasPulse = attackIsReady && attackCost === maxAttackCost && maxAttackCost > 0;

          return (
            <div
              key={attack.name}
              className={`attack-card ${isLeftSide ? "attack-card-red" : "attack-card-blue"}`}
            >
              <button
                type="button"
                className="attack-adjust-btn"
                aria-label={`Ajustar daño de ${attack.name}`}
                title={`Ajustar daño de ${attack.name}`}
                disabled={!gameStarted || gameOver || !isTurnActive || !hasEnoughEm}
                onClick={(event) => {
                  event.stopPropagation();
                  onRequestAdjustAttack?.(attack, activeSlot, activeAvatar.name);
                }}
              >
                +
              </button>
              <button
                className={`attack-btn attack-card-main ${
                  attackIsReady ? `attack-ready ${isLeftSide ? "attack-ready-red" : "attack-ready-blue"}` : ""
                } ${
                  attackHasPulse
                    ? isLeftSide
                      ? "attack-ready-pulse-red"
                      : "attack-ready-pulse-blue"
                    : ""
                }`}
                onClick={() => onAttackRequest(attack, activeSlot)}
                title={attack.description || attack.name}
                disabled={!attackIsReady}
              >
                <span className="attack-name">{attack.name}</span>
                <span className="attack-damage">
                  <span className="attack-damage-value">-{adjustedDamage} PD</span>
                  <span
                    className={`attack-cost ${
                      attackIsReady
                        ? isLeftSide
                          ? "attack-cost-red"
                          : "attack-cost-blue"
                        : "attack-cost-disabled"
                    }`}
                  >
                    • {attackCost} EM
                  </span>
                </span>
              </button>
            </div>
          );
        })}
      </div>

      <div className={`buttons-salud ${!isLeftSide ? "buttons-salud-right" : ""}`}>
        {healOptions.map((amount) => (
          <button
            key={amount}
            className={`heal-btn ${amount === 80 ? "heal-btn-violet" : ""}`}
            onClick={() => onHealRequest(amount)}
            disabled={!canUseHealButtons}
          >
            +{amount} PV
          </button>
        ))}
      </div>

      <div className="manual-adjust-row">
        <button
          className="adjust-btn"
          onClick={() => onRequestAdjustHp(activeSlot)}
          disabled={!gameStarted || gameOver || !isTurnActive}
>
  Ajustar PV de {activeAvatar.name}
</button>
      </div>

      <div className="history-box">
        <h3>Historial</h3>
        {history.length === 0 ? (
          <p className="history-empty">Sin movimientos</p>
        ) : (
          <ul>
            {history.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
  </div>
  )}
</div>
{showAvatarCardModal && (
  <div
    className="battle-avatar-card-overlay"
    onClick={() => setShowAvatarCardModal(false)}
  >
    <div
      className="battle-avatar-card-modal"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        className="battle-avatar-card-flip-scene"
        onClick={() => setIsBattleAvatarCardFlipped((prev) => !prev)}
        aria-label={`Girar carta de ${activeAvatar.name}`}
      >
        <div
          className={`battle-avatar-card-flip-inner ${
            isBattleAvatarCardFlipped ? "flipped" : ""
          }`}
        >
          <div className="battle-avatar-card-flip-face battle-avatar-card-flip-front">
            <img
              src={activeAvatarCardImage}
              alt={activeAvatar.name}
              className="battle-avatar-card-image"
            />
          </div>
            <div className="battle-avatar-card-flip-face battle-avatar-card-flip-back">
              <img
                src="/ui/Dorso.jpg"
                alt="Dorso de carta"
                className="battle-avatar-card-image"
              />
            </div>
        </div>
      </button>
    </div>
  </div>
)}
</>
);
}

function OrnateFrameDecoration() {
  return (
    <span className="ornate-frame" aria-hidden="true">
      <span className="ornate-frame-edge ornate-frame-edge-top" />
      <span className="ornate-frame-edge ornate-frame-edge-right" />
      <span className="ornate-frame-edge ornate-frame-edge-bottom" />
      <span className="ornate-frame-edge ornate-frame-edge-left" />
      <span className="ornate-frame-corner ornate-frame-corner-top-left" />
      <span className="ornate-frame-corner ornate-frame-corner-top-right" />
      <span className="ornate-frame-corner ornate-frame-corner-bottom-right" />
      <span className="ornate-frame-corner ornate-frame-corner-bottom-left" />
    </span>
  );
}

function HomeScreen({
  onStartBattle,
  onGoLibrary,
  onGoAvatars,
  onGoChronicles,
  onLoadSavedBattle,
  onDeleteSavedBattle,
  savedBattleSlots,
  chronicleSlots,
}) {
  const [selectedHomeAction, setSelectedHomeAction] = useState(null);
  const [isLaunchingBattle, setIsLaunchingBattle] = useState(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [showLoadBattleModal, setShowLoadBattleModal] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedDeleteSlot, setSelectedDeleteSlot] = useState(null);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const battleLaunchTimeoutRef = useRef(null);
  const bgIntervalRef = useRef(null);

  const homeActions = [
    {
      id: "battle",
      label: "Iniciar Partida",
      onActivate: onStartBattle,
    },
    {
      id: "library",
      label: "Biblioteca",
      onActivate: onGoLibrary,
    },
    {
      id: "avatars",
      label: "Avatares",
      onActivate: onGoAvatars,
    },
  ];
  const homeBattleAction = homeActions.find((action) => action.id === "battle");
  const homeSideActions = homeActions.filter((action) => action.id !== "battle");

  const backgroundImages = [
    "/ui/home-bg-1.png",
    "/ui/home-bg-2.png",
    "/ui/home-bg-3.png",
    "/ui/home-bg-4.png",
  ];

  useEffect(() => {
    // Start background rotation
    bgIntervalRef.current = setInterval(() => {
      setCurrentBgIndex(prev => (prev + 1) % backgroundImages.length);
    }, 8000); // Change every 8 seconds

    return () => {
      if (bgIntervalRef.current) {
        clearInterval(bgIntervalRef.current);
      }
      if (battleLaunchTimeoutRef.current) {
        clearTimeout(battleLaunchTimeoutRef.current);
      }
    };
  }, []);

  const handleHomeActionClick = (action) => {
    if (isLaunchingBattle) return;

    if (selectedHomeAction === action.id) {
      if (action.id === "battle") {
        setIsLaunchingBattle(true);
        battleLaunchTimeoutRef.current = setTimeout(() => {
          onStartBattle();
        }, 720);
        return;
      }

      action.onActivate();
      return;
    }

    setSelectedHomeAction(action.id);
  };

  const hasSavedBattles = savedBattleSlots.some(Boolean);
  const hasChronicles = chronicleSlots.some(Boolean);

  const formatSlotSavedAt = (savedAt) => {
    if (!savedAt) return "";

    try {
      return new Date(savedAt).toLocaleString("es-EC", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  };

  const closeLoadBattleModal = () => {
    setShowLoadBattleModal(false);
    setIsDeleteMode(false);
    setSelectedDeleteSlot(null);
    setShowDeleteConfirmModal(false);
  };

  return (
    <div className={`home-screen ${isLaunchingBattle ? "home-screen-launching" : ""}`}>
      {/* Background images carousel */}
      {backgroundImages.map((bgImage, index) => (
        <div
          key={index}
          className={`home-bg-image ${index === currentBgIndex ? "active" : ""}`}
          style={{
            backgroundImage: `url(${bgImage})`,
          }}
        />
      ))}

      <div className="home-topbar">
        <img src="/logo jhoyce.png" alt="Logo del juego" className="home-logo" />
      </div>

      <div className="home-main">
        <div className="home-buttons">
          {homeSideActions
            .filter((action) => action.id === "library")
            .map((action) => {
              const isSelected = selectedHomeAction === action.id;

              return (
                <button
                  key={action.id}
                  type="button"
                  className={`home-menu-card ${action.id} ${isSelected ? "active" : ""}`}
                  onClick={() => handleHomeActionClick(action)}
                >
                  <OrnateFrameDecoration />
                  <span className="home-menu-card-label">{action.label}</span>
                </button>
              );
            })}

          <div className="home-action-stack">
            {homeBattleAction && (
              <button
                type="button"
                className={`home-menu-card ${homeBattleAction.id} home-menu-card-featured ${
                  selectedHomeAction === homeBattleAction.id ? "active" : ""
                }`}
                onClick={() => handleHomeActionClick(homeBattleAction)}
              >
                <OrnateFrameDecoration />
                <span className="home-menu-card-label">{homeBattleAction.label}</span>
              </button>
            )}

            <button
              type="button"
              className={`home-load-card ${hasSavedBattles ? "has-saves" : ""}`}
              onClick={() => {
                closeLoadBattleModal();
                setShowLoadBattleModal(true);
              }}
            >
              <span className="home-load-card-label">Cargar Partida</span>
              <span className="home-load-card-subtitle">
                {hasSavedBattles
                  ? `${savedBattleSlots.filter(Boolean).length} slot(s) disponible(s)`
                  : "No hay partidas guardadas"}
              </span>
            </button>

            <button
              type="button"
              className={`home-load-card home-chronicles-card ${hasChronicles ? "has-saves" : ""}`}
              onClick={onGoChronicles}
            >
              <span className="home-load-card-label">Crónicas</span>
              <span className="home-load-card-subtitle">
                {hasChronicles
                  ? `${chronicleSlots.filter(Boolean).length} registro(s) disponible(s)`
                  : "Aún no hay registros guardados"}
              </span>
            </button>
          </div>

          {homeSideActions
            .filter((action) => action.id === "avatars")
            .map((action) => {
            const isSelected = selectedHomeAction === action.id;

            return (
              <button
                key={action.id}
                type="button"
                className={`home-menu-card ${action.id} ${isSelected ? "active" : ""}`}
                onClick={() => handleHomeActionClick(action)}
              >
                <OrnateFrameDecoration />
                <span className="home-menu-card-label">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="home-version">Jhoyce TCG Beta Ver. 1.0</p>

      <div className={`home-battle-transition ${isLaunchingBattle ? "active" : ""}`}>
        <img
          src="/logo jhoyce.png"
          alt="Jhoyce Multiversal Legends"
          className="home-battle-transition-logo"
        />
      </div>

      {showLoadBattleModal && (
        <>
          <div
            className="home-load-overlay"
            onClick={closeLoadBattleModal}
          >
            <div
              className="home-load-modal"
              onClick={(event) => event.stopPropagation()}
            >
              <OrnateFrameDecoration />
              <button
                type="button"
                className={`home-load-trash-toggle ${isDeleteMode ? "active" : ""}`}
                disabled={!hasSavedBattles}
                onClick={() => {
                  setIsDeleteMode((prev) => !prev);
                  setSelectedDeleteSlot(null);
                  setShowDeleteConfirmModal(false);
                }}
                aria-label={isDeleteMode ? "Salir del modo eliminar" : "Entrar al modo eliminar"}
                title={isDeleteMode ? "Salir del modo eliminar" : "Eliminar partida guardada"}
              >
                <img
                  src={isDeleteMode ? "/ui/trash-open-icon.png" : "/ui/trash-closed-icon.png"}
                  alt=""
                />
              </button>

              <h3>Cargar Partida</h3>
              <p>Selecciona uno de los 3 slots disponibles.</p>

              <div className="home-load-slots">
                {[0, 1, 2].map((slotIndex) => {
                  const slot = savedBattleSlots[slotIndex];

                  return (
                    <div
                      key={slotIndex}
                      className={`home-load-slot ${slot ? "filled" : "empty"} ${
                        isDeleteMode && slot ? "delete-mode" : ""
                      } ${
                        selectedDeleteSlot === slotIndex ? "delete-selected" : ""
                      }`}
                      role={slot ? "button" : undefined}
                      tabIndex={slot ? 0 : -1}
                      aria-disabled={!slot}
                      onClick={() => {
                        if (!slot) return;

                        if (isDeleteMode) {
                          setSelectedDeleteSlot(slotIndex);
                          return;
                        }

                        closeLoadBattleModal();
                        onLoadSavedBattle(slotIndex);
                      }}
                      onKeyDown={(event) => {
                        if (!slot) return;
                        if (event.key !== "Enter" && event.key !== " ") return;
                        event.preventDefault();

                        if (isDeleteMode) {
                          setSelectedDeleteSlot(slotIndex);
                          return;
                        }

                        closeLoadBattleModal();
                        onLoadSavedBattle(slotIndex);
                      }}
                    >
                      <span className="home-load-slot-kicker">{`SLOT #${slotIndex + 1}`}</span>
                      {slot ? (
                        <>
                          <span className="home-load-slot-title">
                            {slot.player1Name} vs {slot.player2Name}
                          </span>
                          <span className="home-load-slot-meta">
                            Turno {slot.turn} · {slot.formattedTime}
                          </span>
                          <span className="home-load-slot-meta">
                            Guardada: {formatSlotSavedAt(slot.savedAt)}
                          </span>
                          {isDeleteMode && selectedDeleteSlot === slotIndex && (
                            <button
                              type="button"
                              className="home-load-delete-action"
                              onClick={(event) => {
                                event.stopPropagation();
                                setShowDeleteConfirmModal(true);
                              }}
                            >
                              ELIMINAR PARTIDA GUARDADA
                            </button>
                          )}
                        </>
                      ) : (
                        <span className="home-load-slot-empty">Vacío</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {showDeleteConfirmModal && selectedDeleteSlot !== null && (
            <div
              className="home-load-delete-confirm-overlay"
              onClick={() => setShowDeleteConfirmModal(false)}
            >
              <div
                className="home-load-delete-confirm-modal"
                onClick={(event) => event.stopPropagation()}
              >
                <h4>¿DESEA ELIMINAR ESTA PARTIDA GUARDADA?</h4>
                <div className="home-load-delete-confirm-actions">
                  <button
                    type="button"
                    className="home-load-delete-confirm-accept"
                    onClick={() => {
                      onDeleteSavedBattle(selectedDeleteSlot);
                      setShowDeleteConfirmModal(false);
                      setSelectedDeleteSlot(null);
                      setIsDeleteMode(false);
                    }}
                  >
                    ACEPTAR
                  </button>
                  <button
                    type="button"
                    className="home-load-delete-confirm-cancel"
                    onClick={() => setShowDeleteConfirmModal(false)}
                  >
                    CANCELAR
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function ChronicleDetail({ entry }) {
  if (!entry) {
    return (
      <div className="chronicles-detail chronicles-detail-empty">
        <h2>Crónicas</h2>
        <p>No hay registros disponibles todavía.</p>
      </div>
    );
  }

  const renderPlayerBlock = (title, playerData) => {
    const stats = playerData.stats;

    return (
      <div className="chronicles-player-block">
        <h3>{title}</h3>
        <div className="chronicles-stat-list">
          <span><strong>Avatar principal:</strong> {stats.mainAvatarName}</span>
          <span>
            <strong>Secundario:</strong> {stats.secondarySummonedName || "No invocado"} ·{" "}
            {stats.secondaryTurnsSurvived} turnos
          </span>
          <span><strong>Turno de invocación:</strong> {stats.secondarySummonTurn ?? "-"}</span>
          <span><strong>Daño infligido:</strong> {stats.damageDealt}</span>
          <span><strong>Daño recibido:</strong> {stats.damageReceived}</span>
          <span><strong>Curación total:</strong> {stats.healingTotal}</span>
          <span><strong>EM colocada:</strong> {stats.emPlacedTotal}</span>
          <span><strong>Ataques realizados:</strong> {stats.attacksPerformed}</span>
          <span><strong>Ataque más fuerte:</strong> {stats.strongestHit}</span>
          <span><strong>Ajustes manuales PV:</strong> {stats.manualHpAdjustments}</span>
          <span><strong>Ajustes manuales PD:</strong> {stats.manualPdAdjustments}</span>
          <span><strong>Cambios principal/secundario:</strong> {stats.switchesBetweenMainSecondary}</span>
          <span><strong>Efectos activados:</strong> {stats.effectsActivated}</span>
          <span><strong>Bloqueos de ataque:</strong> {stats.attackBlockedCount}</span>
          <span><strong>Bloqueos de EM:</strong> {stats.emBlockedCount}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="chronicles-detail">
      <div className="chronicles-summary">
        <h2>{entry.winner === "Empate" ? "Empate" : `Victoria de ${entry.winner}`}</h2>
        <span><strong>Duración:</strong> {entry.duration}</span>
        <span><strong>Turnos jugados:</strong> {entry.turnsPlayed}</span>
        <span><strong>Avatar ganador:</strong> {entry.winnerMainAvatar}</span>
        <span><strong>Avatar derrotado:</strong> {entry.loserMainAvatar}</span>
        <span><strong>Registro:</strong> {formatChronicleSavedAt(entry.savedAt)}</span>
      </div>

      <div className="chronicles-players-grid">
        {renderPlayerBlock(entry.player1.label, entry.player1)}
        {renderPlayerBlock(entry.player2.label, entry.player2)}
      </div>
    </div>
  );
}

function ChroniclesScreen({
  onGoHome,
  chronicleSlots,
  selectedSlot,
  onSelectSlot,
  onDeleteChronicle,
}) {
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedDeleteSlot, setSelectedDeleteSlot] = useState(null);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const selectedEntry = chronicleSlots[selectedSlot] || null;

  return (
    <div className="chronicles-screen">
      <div className="library-topbar chronicles-topbar">
        <button
          className="back-home-btn icon-home-btn"
          onClick={onGoHome}
          type="button"
        >
          <img src="/ui/home-icon.png" alt="Inicio" className="home-icon" />
        </button>
        <h1>CRÓNICAS</h1>
        <div className="library-topbar-right chronicles-topbar-right">
          <button
            type="button"
            className={`chronicles-trash-toggle ${isDeleteMode ? "active" : ""}`}
            aria-label={isDeleteMode ? "Salir del modo eliminar" : "Activar modo eliminar"}
            title={isDeleteMode ? "Salir del modo eliminar" : "Activar modo eliminar"}
            onClick={() => {
              setIsDeleteMode((prev) => {
                const nextValue = !prev;
                if (!nextValue) {
                  setSelectedDeleteSlot(null);
                  setShowDeleteConfirmModal(false);
                }
                return nextValue;
              });
            }}
          >
            <img
              src={isDeleteMode ? "/ui/trash-open-icon.png" : "/ui/trash-closed-icon.png"}
              alt=""
            />
          </button>
        </div>
      </div>

      <div className="chronicles-layout">
        <div className="chronicles-slot-column">
          {chronicleSlots.map((entry, index) => (
            <div
              key={`chronicle-slot-${index}`}
              className={`chronicles-slot ${selectedSlot === index ? "active" : ""} ${
                entry ? "filled" : "empty"
              }`}
              role="button"
              tabIndex={0}
              onClick={() => {
                onSelectSlot(index);

                if (!entry) return;
                if (isDeleteMode) {
                  setSelectedDeleteSlot(index);
                }
              }}
              onKeyDown={(event) => {
                if (event.key !== "Enter" && event.key !== " ") return;
                event.preventDefault();
                onSelectSlot(index);

                if (!entry) return;
                if (isDeleteMode) {
                  setSelectedDeleteSlot(index);
                }
              }}
            >
              <span className="chronicles-slot-kicker">{`SLOT #${index + 1}`}</span>
              {entry ? (
                <>
                  <span className="chronicles-slot-title">
                    {entry.winner === "Empate" ? "Empate" : entry.winner}
                  </span>
                  <span className="chronicles-slot-meta">{entry.duration} · {entry.turnsPlayed}T</span>
                  {isDeleteMode && selectedDeleteSlot === index && (
                    <button
                      type="button"
                      className="home-load-delete-action"
                      onClick={(event) => {
                        event.stopPropagation();
                        setShowDeleteConfirmModal(true);
                      }}
                    >
                      ELIMINAR CRÓNICA
                    </button>
                  )}
                </>
              ) : (
                <span className="chronicles-slot-empty">Vacío</span>
              )}
            </div>
          ))}
        </div>

        <ChronicleDetail entry={selectedEntry} />
      </div>

      {showDeleteConfirmModal && selectedDeleteSlot !== null && (
        <div
          className="home-load-delete-confirm-overlay"
          onClick={() => setShowDeleteConfirmModal(false)}
        >
          <div
            className="home-load-delete-confirm-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <h4>¿DESEA ELIMINAR ESTA CRÓNICA?</h4>
            <div className="home-load-delete-confirm-actions">
              <button
                type="button"
                className="home-load-delete-confirm-accept"
                onClick={() => {
                  onDeleteChronicle(selectedDeleteSlot);
                  setShowDeleteConfirmModal(false);
                  setSelectedDeleteSlot(null);
                  setIsDeleteMode(false);
                }}
              >
                ACEPTAR
              </button>
              <button
                type="button"
                className="home-load-delete-confirm-cancel"
                onClick={() => setShowDeleteConfirmModal(false)}
              >
                CANCELAR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BattleEndStatsCard({ entry }) {
  if (!entry) return null;

  const winnerPlayerData =
    entry.winner === entry.player1.label ? entry.player1 : entry.player2;
  const loserPlayerData =
    entry.winner === entry.player1.label ? entry.player2 : entry.player1;
  const winnerIsPlayer1 = entry.winner === entry.player1.label;
  const winnerToneClass =
    winnerIsPlayer1
      ? "battle-end-theme-red"
      : entry.winner === entry.player2.label
      ? "battle-end-theme-blue"
      : "battle-end-theme-neutral";
  const winnerSideClass = winnerIsPlayer1 ? "battle-end-player-card-red" : "battle-end-player-card-blue";
  const loserSideClass = winnerIsPlayer1 ? "battle-end-player-card-blue" : "battle-end-player-card-red";
  const winnerPillClass = winnerIsPlayer1 ? "battle-end-name-pill-red" : "battle-end-name-pill-blue";
  const loserPillClass = winnerIsPlayer1 ? "battle-end-name-pill-blue" : "battle-end-name-pill-red";
  const winnerCompareValueClass = winnerIsPlayer1
    ? "battle-end-compare-value-red"
    : "battle-end-compare-value-blue";
  const loserCompareValueClass = winnerIsPlayer1
    ? "battle-end-compare-value-blue"
    : "battle-end-compare-value-red";
  const winnerTrackLabelClass = winnerIsPlayer1
    ? "battle-end-compare-track-label-red"
    : "battle-end-compare-track-label-blue";
  const loserTrackLabelClass = winnerIsPlayer1
    ? "battle-end-compare-track-label-blue"
    : "battle-end-compare-track-label-red";
  const winnerFillClass = winnerIsPlayer1
    ? "battle-end-compare-fill-red"
    : "battle-end-compare-fill-blue";
  const loserFillClass = winnerIsPlayer1
    ? "battle-end-compare-fill-blue"
    : "battle-end-compare-fill-red";
  const winnerStats = winnerPlayerData.stats;
  const loserStats = loserPlayerData.stats;

  const compareMetrics = [
    { label: "Daño", winnerValue: winnerStats.damageDealt, loserValue: loserStats.damageDealt },
    {
      label: "Recibido",
      winnerValue: winnerStats.damageReceived,
      loserValue: loserStats.damageReceived,
    },
    { label: "Curación", winnerValue: winnerStats.healingTotal, loserValue: loserStats.healingTotal },
    { label: "EM", winnerValue: winnerStats.emPlacedTotal, loserValue: loserStats.emPlacedTotal },
    {
      label: "Ataques",
      winnerValue: winnerStats.attacksPerformed,
      loserValue: loserStats.attacksPerformed,
    },
    {
      label: "Golpe Máx.",
      winnerValue: winnerStats.strongestHit,
      loserValue: loserStats.strongestHit,
    },
  ];

  const renderPlayerDetails = (title, playerData, toneClass, sideClass) => {
    const stats = playerData.stats;
    const detailItems = [
      { label: "Secundario", value: stats.secondarySummonedName || "No invocado", long: true },
      { label: "Supervivencia", value: `${stats.secondaryTurnsSurvived}T` },
      { label: "Invocación", value: stats.secondarySummonTurn ? `T${stats.secondarySummonTurn}` : "-" },
      { label: "Ajustes PV/PD", value: stats.manualAdjustments },
      { label: "Cambios", value: stats.secondarySwitches },
      { label: "Efectos", value: stats.effectsActivated },
      { label: "Bloq. ataque", value: stats.attackBlockedCount },
      { label: "Bloq. EM", value: stats.emBlockedCount },
    ];

    return (
      <div className={`battle-end-player-card ${toneClass} ${sideClass}`}>
        <div className="battle-end-player-card-head">
          <span className="battle-end-player-kicker">{title}</span>
          <h4>{playerData.label}</h4>
        </div>
        <div className="battle-end-detail-badges">
          {detailItems.map((item) => (
            <div
              key={`${title}-${item.label}`}
              className={`battle-end-detail-badge ${item.long ? "battle-end-detail-badge-wide" : ""}`}
            >
              <span className="battle-end-detail-label">{item.label}</span>
              <span className="battle-end-detail-value">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
      <div className={`battle-end-stats-card ${winnerToneClass}`}>
      <OrnateFrameDecoration />
      <div className="battle-end-stats-card-header">
        <h3>{entry.winner === "Empate" ? "Empate" : `${entry.winner} GANA!`}</h3>
      </div>

      <div className="battle-end-stats-scroll">
        <div className="battle-end-stats-summary">
          <div className="battle-end-summary-chip">
            <span className="battle-end-summary-label">Duración</span>
            <strong>{entry.duration}</strong>
          </div>
          <div className="battle-end-summary-chip">
            <span className="battle-end-summary-label">Turnos</span>
            <strong>{entry.turnsPlayed}</strong>
          </div>
          <div className="battle-end-summary-chip">
            <span className="battle-end-summary-label">Avatar ganador</span>
            <strong>{entry.winnerMainAvatar}</strong>
          </div>
          <div className="battle-end-summary-chip">
            <span className="battle-end-summary-label">Avatar derrotado</span>
            <strong>{entry.loserMainAvatar}</strong>
          </div>
        </div>

        <div className="battle-end-compare-section">
          <div className="battle-end-section-head">
            <span className="battle-end-section-kicker">Comparativa</span>
            <div className="battle-end-section-note">
              <span className={`battle-end-name-pill ${winnerPillClass}`}>
                {winnerPlayerData.label}
              </span>
              <span className={`battle-end-name-pill ${loserPillClass}`}>
                {loserPlayerData.label}
              </span>
            </div>
          </div>
          <div className="battle-end-compare-list">
            {compareMetrics.map((metric) => {
              const maxValue = Math.max(metric.winnerValue, metric.loserValue, 1);
              const winnerWidth = `${(metric.winnerValue / maxValue) * 100}%`;
              const loserWidth = `${(metric.loserValue / maxValue) * 100}%`;

              return (
                <div key={metric.label} className="battle-end-compare-row">
                  <div className="battle-end-compare-topline">
                    <span>{metric.label}</span>
                    <div className="battle-end-compare-values">
                      <span className={`battle-end-compare-value ${winnerCompareValueClass}`}>
                        {metric.winnerValue}
                      </span>
                      <span className="battle-end-compare-divider">/</span>
                      <span className={`battle-end-compare-value ${loserCompareValueClass}`}>
                        {metric.loserValue}
                      </span>
                    </div>
                  </div>
                  <div className="battle-end-compare-bars">
                    <div className="battle-end-compare-track-row">
                      <span className={`battle-end-compare-track-label ${winnerTrackLabelClass}`}>
                        Ganador
                      </span>
                      <div className="battle-end-compare-track">
                        <div
                          className={`battle-end-compare-fill ${winnerFillClass}`}
                          style={{ width: winnerWidth }}
                        />
                      </div>
                    </div>
                    <div className="battle-end-compare-track-row">
                      <span className={`battle-end-compare-track-label ${loserTrackLabelClass}`}>
                        Perdedor
                      </span>
                      <div className="battle-end-compare-track">
                        <div
                          className={`battle-end-compare-fill ${loserFillClass}`}
                          style={{ width: loserWidth }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="battle-end-stats-grid">
          {renderPlayerDetails("Ganador", winnerPlayerData, "battle-end-player-card-winner", winnerSideClass)}
          {renderPlayerDetails("Derrotado", loserPlayerData, "battle-end-player-card-loser", loserSideClass)}
        </div>
      </div>
    </div>
  );
}

function LibraryScreen({ onGoHome }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [touchStartY, setTouchStartY] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showRarityGuideModal, setShowRarityGuideModal] = useState(false);
  const [guideSelections, setGuideSelections] = useState({
    object: "Común",
    energy: "Común",
    chance: "Común",
    summon: "Invocación",
  });
  const [activeGuideSelection, setActiveGuideSelection] = useState({
    section: null,
    rarity: null,
  });
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const selectedCard = LIBRARY_CARDS[selectedIndex] ?? LIBRARY_CARDS[0];
  const selectedCardRarityLabel = getLibraryCardRarityLabel(selectedCard);
  const hasSpecialLibraryAccents = Boolean(selectedCard.frameAccent);
  const libraryDetailStyle =
    hasSpecialLibraryAccents
      ? {
          "--library-detail-soft": `${selectedCard.frameAccent}24`,
          "--library-detail-glow": `${selectedCard.frameAccent}55`,
          "--library-detail-edge": `${selectedCard.frameAccent}cc`,
          "--library-panel-accent-start": selectedCard.frameAccent,
          "--library-panel-accent-end":
            selectedCard.panelAccentEnd ??
            (selectedCard.tone === "chance" ? "#10c768" : selectedCard.frameAccent),
        }
      : undefined;

  const changeLibraryCard = (direction) => {
    setSelectedIndex((prev) => {
      const totalCards = LIBRARY_CARDS.length;
      return (prev + direction + totalCards) % totalCards;
    });
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.trim() === '') return;
    const index = LIBRARY_CARDS.findIndex(card => card.name.toLowerCase().includes(term.toLowerCase()));
    if (index !== -1) {
      setSelectedIndex(index);
    }
  };

  const startRepeating = (direction) => {
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => changeLibraryCard(direction), 150);
    }, 1000);
  };

  const stopRepeating = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const getWheelOffset = (index) => {
    const totalCards = LIBRARY_CARDS.length;
    let offset = index - selectedIndex;

    if (offset > totalCards / 2) offset -= totalCards;
    if (offset < -totalCards / 2) offset += totalCards;

    return offset;
  };

  const handleWheelTouchStart = (event) => {
    setTouchStartY(event.touches[0].clientY);
  };

  const handleWheelTouchEnd = (event) => {
    if (touchStartY === null) return;

    const touchEndY = event.changedTouches[0].clientY;
    const deltaY = touchStartY - touchEndY;

    if (Math.abs(deltaY) > 40) {
      changeLibraryCard(deltaY > 0 ? 1 : -1);
    }

    setTouchStartY(null);
  };

  const getGuidePreviewCard = (section, rarity) => {
    if (section === "object") {
      const toneMap = {
        "Común": "common",
        "Épica": "epic",
        Rara: "rare",
        Legendaria: "legendary",
      };

      return LIBRARY_CARDS.find((card) => card.tone === toneMap[rarity]) ?? null;
    }

    if (section === "energy") {
      return (
        LIBRARY_CARDS.find(
          (card) =>
            card.tone === "energy" &&
            getLibraryCardRarityLabel(card) === rarity
        ) ?? null
      );
    }

    if (section === "chance") {
      return (
        LIBRARY_CARDS.find(
          (card) =>
            card.tone === "chance" &&
            getLibraryCardRarityLabel(card) === rarity
        ) ?? null
      );
    }

    if (section === "summon") {
      return LIBRARY_CARDS.find((card) => card.tone === "summon") ?? null;
    }

    return null;
  };

  const handleGuideRarityClick = (section, rarity) => {
    const targetCard = getGuidePreviewCard(section, rarity);
    if (!targetCard) return;

    if (
      activeGuideSelection.section === section &&
      activeGuideSelection.rarity === rarity
    ) {
      const targetIndex = LIBRARY_CARDS.findIndex((card) => card.id === targetCard.id);
      if (targetIndex !== -1) {
        setSelectedIndex(targetIndex);
      }
      setShowRarityGuideModal(false);
      return;
    }

    setGuideSelections((prev) => ({
      ...prev,
      [section]: rarity,
    }));
    setActiveGuideSelection({
      section,
      rarity,
    });
  };

  return (
    <div className={`library-screen library-tone-${selectedCard.tone}`}>
      <div className="library-topbar">
        <h1>Biblioteca</h1>
        <div className="library-topbar-right">
          <input
            type="text"
            placeholder="Buscar carta..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="library-search"
          />
          <button
            className="back-home-btn icon-home-btn"
            onClick={onGoHome}
            title="Volver al inicio"
            aria-label="Volver al inicio"
          >
            <img src="/ui/home-icon.png" alt="Inicio" className="home-icon" />
          </button>
        </div>
      </div>

      <div className="library-layout">
        <div className="library-showcase">
          <div className="library-detail" style={libraryDetailStyle}>
            <div className="library-detail-frame">
              <img
                src={selectedCard.image}
                alt={selectedCard.name}
                className="library-detail-image"
              />
            </div>

            <div className="library-detail-copy">
              <div className="library-detail-heading">
                <div className="library-detail-tags">
                  {selectedCard.tone !== "summon" && (
                    <p className="library-category">{selectedCard.category}</p>
                  )}
                  <button
                    type="button"
                    className="library-rarity-pill"
                    onClick={() => setShowRarityGuideModal(true)}
                  >
                    {selectedCardRarityLabel}
                  </button>
                </div>
                <h2>{selectedCard.name}</h2>
                <p className="library-summary">{selectedCard.summary}</p>
              </div>

              <div className="library-meta-grid">
                <div className="library-meta-card library-meta-card-wide library-effect-card">
                  <span className="library-meta-label">Efecto</span>
                  <p className="library-effect">{selectedCard.effect}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="library-wheel-panel">
          <button
            className="library-wheel-arrow"
            onClick={() => changeLibraryCard(-1)}
            onMouseDown={() => startRepeating(-1)}
            onMouseUp={stopRepeating}
            onMouseLeave={stopRepeating}
            onTouchStart={() => startRepeating(-1)}
            onTouchEnd={stopRepeating}
            type="button"
            aria-label="Carta anterior"
          >
            ^
          </button>

          <div
            className="library-wheel-shell"
            onTouchStart={handleWheelTouchStart}
            onTouchEnd={handleWheelTouchEnd}
          >
            <div className="library-wheel-focus" />

            <div className="library-wheel">
              {LIBRARY_CARDS.map((card, index) => {
                const offset = getWheelOffset(index);
                const isActive = offset === 0;
                const isVisible = Math.abs(offset) <= 1;
                const selectorMetaLabel = getLibrarySelectorMetaLabel(card);

                return (
                  <button
                    key={card.id}
                    type="button"
                    className={`library-wheel-item ${isActive ? "active" : ""}`}
                    style={{
                      transform: `translateY(${offset * 74}px) scale(${isActive ? 1 : 0.84})`,
                      opacity: !isVisible ? 0 : isActive ? 1 : 0.58,
                      pointerEvents: !isVisible ? "none" : "auto",
                    }}
                    onClick={() => setSelectedIndex(index)}
                  >
                    <span className="library-wheel-item-name">{card.name}</span>
                    {selectorMetaLabel && (
                      <span className="library-wheel-item-meta">{selectorMetaLabel}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            className="library-wheel-arrow"
            onClick={() => changeLibraryCard(1)}
            onMouseDown={() => startRepeating(1)}
            onMouseUp={stopRepeating}
            onMouseLeave={stopRepeating}
            onTouchStart={() => startRepeating(1)}
            onTouchEnd={stopRepeating}
            type="button"
            aria-label="Carta siguiente"
          >
            v
          </button>
        </aside>
      </div>

      {showRarityGuideModal && (
        <div
          className="library-guide-overlay"
          onClick={() => setShowRarityGuideModal(false)}
        >
          <div
            className="library-guide-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="library-guide-close"
              onClick={() => setShowRarityGuideModal(false)}
              aria-label="Cerrar"
              type="button"
            >
              {"\u00D7"}
            </button>

            <h3>Guía de Categorías y Rarezas</h3>

            <div className="library-guide-sections">
              <section className="library-guide-section">
                <h4>Cartas de Objeto</h4>
                <div className="library-guide-preview">
                  {getGuidePreviewCard("object", guideSelections.object) && (
                    <img
                      src={getGuidePreviewCard("object", guideSelections.object).image}
                      alt={getGuidePreviewCard("object", guideSelections.object).name}
                      className={`library-guide-preview-image ${
                        activeGuideSelection.section === "object" &&
                        activeGuideSelection.rarity === guideSelections.object
                          ? "is-active"
                          : ""
                      }`}
                    />
                  )}
                </div>
                <div className="library-guide-text-list">
                  <button
                    type="button"
                    className={`library-guide-text object-common ${
                      activeGuideSelection.section === "object" &&
                      activeGuideSelection.rarity === "Común"
                        ? "active"
                        : ""
                    }`}
                    onClick={() => handleGuideRarityClick("object", "Común")}
                  >
                    Común
                  </button>
                  <button
                    type="button"
                    className={`library-guide-text object-epic ${
                      activeGuideSelection.section === "object" &&
                      activeGuideSelection.rarity === "Épica"
                        ? "active"
                        : ""
                    }`}
                    onClick={() => handleGuideRarityClick("object", "Épica")}
                  >
                    Épica
                  </button>
                  <button
                    type="button"
                    className={`library-guide-text object-rare ${
                      activeGuideSelection.section === "object" &&
                      activeGuideSelection.rarity === "Rara"
                        ? "active"
                        : ""
                    }`}
                    onClick={() => handleGuideRarityClick("object", "Rara")}
                  >
                    Rara
                  </button>
                  <button
                    type="button"
                    className={`library-guide-text object-legendary ${
                      activeGuideSelection.section === "object" &&
                      activeGuideSelection.rarity === "Legendaria"
                        ? "active"
                        : ""
                    }`}
                    onClick={() => handleGuideRarityClick("object", "Legendaria")}
                  >
                    Legendaria
                  </button>
                </div>
              </section>

              <section className="library-guide-section">
                <h4>Cartas de Energía</h4>
                <div className="library-guide-preview">
                  {getGuidePreviewCard("energy", guideSelections.energy) && (
                    <img
                      src={getGuidePreviewCard("energy", guideSelections.energy).image}
                      alt={getGuidePreviewCard("energy", guideSelections.energy).name}
                      className={`library-guide-preview-image ${
                        activeGuideSelection.section === "energy" &&
                        activeGuideSelection.rarity === guideSelections.energy
                          ? "is-active"
                          : ""
                      }`}
                    />
                  )}
                </div>
                <div className="library-guide-text-list">
                  {["Común", "Épica", "Rara", "Legendaria"].map((rarity) => (
                    <button
                      key={rarity}
                      type="button"
                      className={`library-guide-text energy ${
                        activeGuideSelection.section === "energy" &&
                        activeGuideSelection.rarity === rarity
                          ? "active"
                          : ""
                      }`}
                      onClick={() => handleGuideRarityClick("energy", rarity)}
                    >
                      {rarity}
                    </button>
                  ))}
                </div>
              </section>

              <section className="library-guide-section">
                <h4>Cartas de Azar</h4>
                <div className="library-guide-preview">
                  {getGuidePreviewCard("chance", guideSelections.chance) && (
                    <img
                      src={getGuidePreviewCard("chance", guideSelections.chance).image}
                      alt={getGuidePreviewCard("chance", guideSelections.chance).name}
                      className={`library-guide-preview-image ${
                        activeGuideSelection.section === "chance" &&
                        activeGuideSelection.rarity === guideSelections.chance
                          ? "is-active"
                          : ""
                      }`}
                    />
                  )}
                </div>
                <div className="library-guide-text-list">
                  {["Común", "Rara", "Épica", "Legendaria"].map((rarity) => (
                    <button
                      key={rarity}
                      type="button"
                      className={`library-guide-text chance ${
                        activeGuideSelection.section === "chance" &&
                        activeGuideSelection.rarity === rarity
                          ? "active"
                          : ""
                      }`}
                      onClick={() => handleGuideRarityClick("chance", rarity)}
                    >
                      {rarity}
                    </button>
                  ))}
                </div>
              </section>

              <section className="library-guide-section">
                <h4>Cartas de Invocación</h4>
                <div className="library-guide-preview">
                  {getGuidePreviewCard("summon", guideSelections.summon) && (
                    <img
                      src={getGuidePreviewCard("summon", guideSelections.summon).image}
                      alt={getGuidePreviewCard("summon", guideSelections.summon).name}
                      className={`library-guide-preview-image ${
                        activeGuideSelection.section === "summon" &&
                        activeGuideSelection.rarity === guideSelections.summon
                          ? "is-active"
                          : ""
                      }`}
                    />
                  )}
                </div>
                <div className="library-guide-text-list">
                  <button
                    type="button"
                    className={`library-guide-text summon ${
                      activeGuideSelection.section === "summon" &&
                      activeGuideSelection.rarity === "Invocación"
                        ? "active"
                        : ""
                    }`}
                    onClick={() => handleGuideRarityClick("summon", "Invocación")}
                  >
                    Invocación
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const AVATAR_CARD_FILES = [
  "Aethera-Hex.png",
  "Artemia.png",
  "Aurhiel.png",
  "Citlali-Teyah.png",
  "Elariss.png",
  "Hal'Lethrra.png",
  "Hella-Mogarth.png",
  "Karessa-Drann.png",
  "Kohana.png",
  "Medusa.png",
  "Necrondra.png",
  "Nefereth-Ra.png",
  "Noxaria.png",
  "Prismara.png",
  "Sarah Ardent.png",
  "Solaria.png",
  "Thalindra.png",
  "Valdrea-Noir.png",
  "Zahriel.png",
];

const normalizeAvatarAssetName = (value) =>
  normalizeDisplayText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

const getAvatarCardImage = (avatarName) => {
  const target = normalizeAvatarAssetName(avatarName);
  const matchedFile = AVATAR_CARD_FILES.find((fileName) => {
    const baseName = fileName.replace(/\.png$/i, "");
    const normalizedBaseName = normalizeAvatarAssetName(baseName);
    return (
      normalizedBaseName === target ||
      target.startsWith(`${normalizedBaseName}-`) ||
      normalizedBaseName.startsWith(`${target}-`)
    );
  });

  return matchedFile ? `/avatars/cards/${matchedFile}` : null;
};

const AVATAR_LORE_SUMMARIES = {
  thalindra:
    "Thalindra custodia el Vivarium, uno de los santuarios más sagrados del universo mítico. Su presencia mantiene el bosque vivo, feroz y en equilibrio con la Energía Multiversal.",
};

const getAvatarLoreSummary = (avatarName) => {
  const key = normalizeAvatarAssetName(avatarName);
  return (
    AVATAR_LORE_SUMMARIES[key] ??
    `${normalizeDisplayText(avatarName)} es uno de los avatares clave del multiverso JHOYCE. Esta vista será la ficha de presentación definitiva para su historia, estilo de combate y atributos visuales.`
  );
};

const PRIMARY_AVATAR_TITLES = {
  Thalindra: "GUARDIANA DEL VIVARIUM",
  Noxaria: "LA AUTORIDAD DESPIADADA",
  Solaria: "GRAN LIDER ARCANGEL",
  Aurhiel: "SERAFIN DEL REINO DE LUZ",
  Zahriel: "RECOLECTORA DE ALMAS",
  Artemia: "CENTURIONA ROMANA",
  "Nefereth Ra": "HIJA DEL SOL DORADO",
  "Hal'Lethrra": "LA HECHICERA ROJA",
  "Citlali Teyah": "GUERRERA DEL SOL",
  "Aethera Hex": "PRINCESA MULTIVERSAL",
  "Elariss": "CENTINELA CELTA DE HALX",
  "Kohana Saionji": "MAESTRA DEL JARDÍN DEL OESTE",
  "Sarah Ardent": "SANGRE DE DRAGÓN",
};

const getAvatarTitle = (avatar, mode) => {
  if (mode === "secondary") {
    return normalizeDisplayText(
      avatar.summonCardName ?? "Avatar Secundario"
    ).toUpperCase();
  }

  if (PRIMARY_AVATAR_TITLES[avatar.name]) {
    return PRIMARY_AVATAR_TITLES[avatar.name];
  }

  const typeLabel = normalizeDisplayText(avatar.type).toUpperCase();
  return typeLabel;
};

const PRIMARY_AVATAR_ACCENTS = {
  Thalindra: { accent: "#49e048", darkStart: "#042408", darkEnd: "#0e5016" },
  "Sarah Ardent": { accent: "#ff8a3d", darkStart: "#4a1707", darkEnd: "#8a3113" },
  "Aethera Hex": { accent: "#5fd4ff", darkStart: "#08263d", darkEnd: "#114d79" },
  "Citlali Teyah": { accent: "#f3c95e", darkStart: "#47330a", darkEnd: "#8a6216" },
  "Hal'Lethrra": { accent: "#7fd7ff", darkStart: "#0a2236", darkEnd: "#184b71" },
  "Nefereth Ra": { accent: "#f4c24c", darkStart: "#4a3206", darkEnd: "#8b5c12" },
  Aurhiel: { accent: "#efe7c8", darkStart: "#3f3820", darkEnd: "#74663a" },
  Elariss: { accent: "#c79a67", darkStart: "#3d2411", darkEnd: "#6f4422" },
  Artemia: { accent: "#d46b44", darkStart: "#43190b", darkEnd: "#7b2f18" },
  Zahriel: { accent: "#ff4747", darkStart: "#4f1010", darkEnd: "#8d1f1f" },
  "Kohana Saionji": { accent: "#ff9b33", darkStart: "#4d2708", darkEnd: "#8b4710" },
  Solaria: {
    accent: "#ffd95a",
    darkStart: "#4d3906",
    darkEnd: "#967011",
    subtitleGradient: "linear-gradient(90deg, #5bc9ff 0%, #ffd95a 100%)",
  },
  Noxaria: {
    accent: "#ff4f5e",
    darkStart: "#4b0f18",
    darkEnd: "#8b1e2b",
    subtitleGradient: "linear-gradient(90deg, #ff4040 0%, #ff9a2e 100%)",
  },
};

const hexToRgb = (hex) => {
  const normalized = hex.replace("#", "");
  const value =
    normalized.length === 3
      ? normalized.split("").map((char) => char + char).join("")
      : normalized;

  const int = Number.parseInt(value, 16);
  if (Number.isNaN(int)) return null;

  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
};

const getPrimaryAvatarThemeStyle = (avatarName) => {
  const palette = PRIMARY_AVATAR_ACCENTS[normalizeDisplayText(avatarName)];
  if (!palette) return {};

  const rgb = hexToRgb(palette.accent);
  if (!rgb) return {};

  return {
    "--avatars-accent": palette.accent,
    "--avatars-accent-soft": `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.12)`,
    "--avatars-accent-mid": `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.24)`,
    "--avatars-accent-strong": `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.38)`,
    "--avatars-accent-border": `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.9)`,
    "--avatars-accent-dark-start": palette.darkStart,
    "--avatars-accent-dark-end": palette.darkEnd,
    "--avatars-accent-gradient": palette.subtitleGradient ?? "",
  };
};

function AvatarsScreen({ onGoHome }) {
  const [avatarMode, setAvatarMode] = useState("primary");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [touchStartY, setTouchStartY] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [isAvatarCardFlipped, setIsAvatarCardFlipped] = useState(false);
  const [isAvatarCardAnimating, setIsAvatarCardAnimating] = useState(false);
  const [isAvatarCardResetting, setIsAvatarCardResetting] = useState(false);
  const [isAvatarInfoTransitioning, setIsAvatarInfoTransitioning] = useState(false);
  const [rememberedAvatarByMode, setRememberedAvatarByMode] = useState({
    primary: AVATAR_OPTIONS[0]?.name ?? "",
    secondary: SECONDARY_AVATARS[0]?.name ?? "",
  });
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const flipUpdateTimeoutRef = useRef(null);
  const flipResetTimeoutRef = useRef(null);
  const flipCleanupTimeoutRef = useRef(null);
  const infoTransitionTimeoutRef = useRef(null);

  const avatarCollection =
    avatarMode === "secondary" ? SECONDARY_AVATARS : AVATAR_OPTIONS;

  const filteredAvatars = avatarCollection.filter((avatar) =>
    normalizeDisplayText(avatar.name)
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase())
  );

  const safeSelectedIndex = Math.min(
    selectedIndex,
    Math.max(filteredAvatars.length - 1, 0)
  );
  const selectedAvatar =
    filteredAvatars[safeSelectedIndex] ??
    avatarCollection[0] ??
    AVATAR_OPTIONS[0];
  const selectedAvatarName = normalizeDisplayText(selectedAvatar.name);
  const selectedAvatarType = normalizeDisplayText(selectedAvatar.type);
  const selectedAvatarWeakness = normalizeDisplayText(selectedAvatar.weakness);
  const selectedAvatarCardImage =
    getAvatarCardImage(selectedAvatar.name) ?? selectedAvatar.image;
  const previewAvatarCardImage = previewAvatar
    ? getAvatarCardImage(previewAvatar.name) ?? previewAvatar.image
    : selectedAvatarCardImage;
  const selectedAvatarSummary =
    avatarMode === "secondary"
      ? `Invocación: ${normalizeDisplayText(selectedAvatar.summonCardName)}.`
      : getAvatarLoreSummary(selectedAvatar.name);
  const avatarThemeStyle =
    avatarMode === "primary"
      ? getPrimaryAvatarThemeStyle(selectedAvatar.name)
      : undefined;
  const hasGradientAccent =
    avatarMode === "primary" &&
    Boolean(avatarThemeStyle?.["--avatars-accent-gradient"]);

  useEffect(() => {
    setRememberedAvatarByMode((prev) => ({
      ...prev,
      [avatarMode]: selectedAvatar.name,
    }));
  }, [selectedAvatar.name, avatarMode]);

  useEffect(() => {
    if (safeSelectedIndex !== selectedIndex) {
      setSelectedIndex(safeSelectedIndex);
    }
  }, [safeSelectedIndex, selectedIndex]);

  const changeAvatar = (direction) => {
    const totalAvatars = filteredAvatars.length || 1;
    if (totalAvatars <= 1 || isAvatarCardAnimating) return;

    const nextIndex =
      (safeSelectedIndex + direction + totalAvatars) % totalAvatars;
    const nextAvatar = filteredAvatars[nextIndex];
    if (!nextAvatar) return;

    if (flipUpdateTimeoutRef.current) clearTimeout(flipUpdateTimeoutRef.current);
    if (flipResetTimeoutRef.current) clearTimeout(flipResetTimeoutRef.current);
    if (flipCleanupTimeoutRef.current) clearTimeout(flipCleanupTimeoutRef.current);
    if (infoTransitionTimeoutRef.current) clearTimeout(infoTransitionTimeoutRef.current);

    setPreviewAvatar(nextAvatar);
    setIsAvatarCardAnimating(true);
    setIsAvatarCardFlipped(true);
    setIsAvatarInfoTransitioning(true);

    flipUpdateTimeoutRef.current = setTimeout(() => {
      setSelectedIndex(nextIndex);
    }, 360);

    infoTransitionTimeoutRef.current = setTimeout(() => {
      setIsAvatarInfoTransitioning(false);
    }, 520);

    flipResetTimeoutRef.current = setTimeout(() => {
      setIsAvatarCardResetting(true);
      setIsAvatarCardFlipped(false);
      setPreviewAvatar(null);
      setIsAvatarCardAnimating(false);

      flipCleanupTimeoutRef.current = setTimeout(() => {
        setIsAvatarCardResetting(false);
      }, 30);
    }, 790);
  };

  const startRepeating = (direction) => {
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => changeAvatar(direction), 850);
    }, 1000);
  };

  const stopRepeating = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (flipUpdateTimeoutRef.current) clearTimeout(flipUpdateTimeoutRef.current);
      if (flipResetTimeoutRef.current) clearTimeout(flipResetTimeoutRef.current);
      if (flipCleanupTimeoutRef.current) clearTimeout(flipCleanupTimeoutRef.current);
      if (infoTransitionTimeoutRef.current) clearTimeout(infoTransitionTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    setPreviewAvatar(null);
    setIsAvatarCardFlipped(false);
    setIsAvatarCardAnimating(false);
    setIsAvatarCardResetting(false);
    setIsAvatarInfoTransitioning(false);

    if (flipUpdateTimeoutRef.current) clearTimeout(flipUpdateTimeoutRef.current);
    if (flipResetTimeoutRef.current) clearTimeout(flipResetTimeoutRef.current);
    if (flipCleanupTimeoutRef.current) clearTimeout(flipCleanupTimeoutRef.current);
    if (infoTransitionTimeoutRef.current) clearTimeout(infoTransitionTimeoutRef.current);
  }, [avatarMode, searchTerm]);

  const getWheelOffset = (index) => {
    const totalAvatars = filteredAvatars.length || 1;
    let offset = index - safeSelectedIndex;

    if (offset > totalAvatars / 2) offset -= totalAvatars;
    if (offset < -totalAvatars / 2) offset += totalAvatars;

    return offset;
  };

  const handleWheelTouchStart = (event) => {
    setTouchStartY(event.touches[0].clientY);
  };

  const handleWheelTouchEnd = (event) => {
    if (touchStartY === null) return;

    const touchEndY = event.changedTouches[0].clientY;
    const deltaY = touchStartY - touchEndY;

    if (Math.abs(deltaY) > 40) {
      changeAvatar(deltaY > 0 ? 1 : -1);
    }

    setTouchStartY(null);
  };

  const handleAvatarSearch = (value) => {
    setSearchTerm(value);
    setSelectedIndex(0);
  };

  const handleAvatarModeChange = (nextMode) => {
    if (nextMode === avatarMode) return;

    const nextCollection =
      nextMode === "secondary" ? SECONDARY_AVATARS : AVATAR_OPTIONS;
    const rememberedNextName = rememberedAvatarByMode[nextMode];
    const nextIndex = nextCollection.findIndex(
      (avatar) => avatar.name === rememberedNextName
    );

    setRememberedAvatarByMode((prev) => ({
      ...prev,
      [avatarMode]: selectedAvatar.name,
    }));
    setSearchTerm("");
    setSelectedIndex(nextIndex >= 0 ? nextIndex : 0);
    setAvatarMode(nextMode);
  };

  return (
    <div
      className={`avatars-screen avatars-prototype-screen ${avatarMode === "secondary" ? "avatars-secondary-theme" : "avatars-primary-theme"} ${hasGradientAccent ? "avatars-gradient-accent" : ""}`}
      style={avatarThemeStyle}
    >
      <div className="library-topbar avatars-topbar">
        <h1>Avatares</h1>
        <div className="library-topbar-right avatars-topbar-right">
          <input
            type="text"
            placeholder="Buscar avatar..."
            value={searchTerm}
            onChange={(event) => handleAvatarSearch(event.target.value)}
            className="library-search avatars-search"
          />
          <button
            className="back-home-btn icon-home-btn"
            onClick={onGoHome}
            title="Volver al inicio"
            aria-label="Volver al inicio"
          >
            <img src="/ui/home-icon.png" alt="Inicio" className="home-icon" />
          </button>
        </div>
      </div>

      <div className="avatars-prototype-layout">
        <section className="avatars-prototype-main">
          <div className="avatars-main-stack">
            <div className="avatars-stage-panel">
              <div
                className="avatars-stage-photo"
                style={{
                  "--avatars-stage-image": `url(${selectedAvatar.image})`,
                }}
              />
            </div>

            <div className="avatars-mode-switch avatars-mode-switch-overlay" role="tablist" aria-label="Tipo de avatar">
              <button
                type="button"
                className={`avatars-mode-btn ${avatarMode === "primary" ? "active" : ""}`}
                onClick={() => handleAvatarModeChange("primary")}
              >
                Principales
              </button>
              <button
                type="button"
                className={`avatars-mode-btn ${avatarMode === "secondary" ? "active" : ""}`}
                onClick={() => handleAvatarModeChange("secondary")}
              >
                Secundarios
              </button>
            </div>

            <div className="avatars-card-column">
              <div className="avatars-card-rail">
                <span className="avatars-card-rail-pill">{selectedAvatarType}</span>
                <span className="avatars-card-rail-label">Avatar</span>
              </div>

              <div className="avatars-prototype-card-shell">
                <div className="avatars-card-flip-scene">
                  <div
                    className={`avatars-card-flip-inner ${
                      isAvatarCardFlipped ? "flipped" : ""
                    } ${isAvatarCardResetting ? "instant-reset" : ""}`}
                  >
                    <div className="avatars-card-flip-face avatars-card-flip-front">
                      <img
                        src={selectedAvatarCardImage}
                        alt={selectedAvatarName}
                        className="avatars-prototype-card-image"
                      />
                    </div>
                    <div className="avatars-card-flip-face avatars-card-flip-back">
                      <img
                        src={previewAvatarCardImage}
                        alt={normalizeDisplayText(previewAvatar?.name ?? selectedAvatarName)}
                        className="avatars-prototype-card-image"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="avatars-card-copyright">2026 Jhoyce TCG ®</div>
            </div>

            <div
              className={`avatars-prototype-detail-inner ${
                isAvatarInfoTransitioning ? "is-transitioning" : ""
              }`}
            >
              <div className="avatars-prototype-heading">
                <div>
                  <h2>{selectedAvatarName}</h2>
                  <p className="avatars-prototype-subtitle">
                    {getAvatarTitle(selectedAvatar, avatarMode)}
                  </p>
                </div>
              </div>

              <div className="avatars-prototype-hpbox">
                <span className="avatars-prototype-hpicon">❤</span>
                <strong>{selectedAvatar.hp}</strong>
                <span>Pv</span>
              </div>

              <div className="avatars-prototype-divider" />

              <div className="avatars-prototype-copy">
                <p>{selectedAvatarSummary}</p>
              </div>

              <div className="avatars-prototype-actions">
                <button type="button">Anadir a Favoritos</button>
                <button type="button">Vista 3D</button>
              </div>
            </div>
          </div>
        </section>

        <aside className="avatars-prototype-sidebar">
          <div className="avatars-selector-column">
            <button
              className="avatars-selector-arrow"
              onClick={() => changeAvatar(-1)}
              onMouseDown={() => startRepeating(-1)}
              onMouseUp={stopRepeating}
              onMouseLeave={stopRepeating}
              onTouchStart={() => startRepeating(-1)}
              onTouchEnd={stopRepeating}
              type="button"
              aria-label="Avatar anterior"
            >
              ˄
            </button>

            <button
              className="avatars-selector-arrow"
              onClick={() => changeAvatar(1)}
              onMouseDown={() => startRepeating(1)}
              onMouseUp={stopRepeating}
              onMouseLeave={stopRepeating}
              onTouchStart={() => startRepeating(1)}
              onTouchEnd={stopRepeating}
              type="button"
              aria-label="Avatar siguiente"
            >
              ˅
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
export default function App() {
  const BATTLE_SAVE_STORAGE_KEY = "jhoyce-battle-save-slots-v1";
  const MAX_BATTLE_SAVE_SLOTS = 3;
  const menuMusicRef = useRef(null);
  const battleMusicRef = useRef(null);
  const buttonClickSoundRef = useRef(null);
  const rouletteIntervalRef = useRef(null);
  const saveToastTimeoutRef = useRef(null);
  const [turn, setTurn] = useState(1);
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  const [player1Name, setPlayer1Name] = useState(AVATAR_OPTIONS[0].name);
  const [player2Name, setPlayer2Name] = useState(AVATAR_OPTIONS[1].name);

  const [player1BaseHp, setPlayer1BaseHp] = useState(AVATAR_OPTIONS[0].hp);
  const [player2BaseHp, setPlayer2BaseHp] = useState(AVATAR_OPTIONS[1].hp);

  const [player1Hp, setPlayer1Hp] = useState(AVATAR_OPTIONS[0].hp);
  const [player2Hp, setPlayer2Hp] = useState(AVATAR_OPTIONS[1].hp);
  const [player1Em, setPlayer1Em] = useState(0);
  const [player2Em, setPlayer2Em] = useState(0);
  const player1HpRef = useRef(AVATAR_OPTIONS[0].hp);
  const player2HpRef = useRef(AVATAR_OPTIONS[1].hp);

  const [player1History, setPlayer1History] = useState([]);
  const [player2History, setPlayer2History] = useState([]);

  const [player1CombatState, setPlayer1CombatState] = useState(createCombatState());
  const [player2CombatState, setPlayer2CombatState] = useState(createCombatState());

  const [player1MainHpFlash, setPlayer1MainHpFlash] = useState("");
  const [player2MainHpFlash, setPlayer2MainHpFlash] = useState("");
  const [player1SecondaryHpFlash, setPlayer1SecondaryHpFlash] = useState("");
  const [player2SecondaryHpFlash, setPlayer2SecondaryHpFlash] = useState("");
  const [player1MainHpPopup, setPlayer1MainHpPopup] = useState(null);
  const [player2MainHpPopup, setPlayer2MainHpPopup] = useState(null);
  const [player1SecondaryHpPopup, setPlayer1SecondaryHpPopup] = useState(null);
  const [player2SecondaryHpPopup, setPlayer2SecondaryHpPopup] = useState(null);

  const [player1Confirmed, setPlayer1Confirmed] = useState(false);
  const [player2Confirmed, setPlayer2Confirmed] = useState(false);
  const [showStartMatchModal, setShowStartMatchModal] = useState(false);
  const [showQuickStartButton, setShowQuickStartButton] = useState(false);
  const [isLaunchingBattleFromModal, setIsLaunchingBattleFromModal] = useState(false);
  const [isBattleIntroStaging, setIsBattleIntroStaging] = useState(false);
  const [battleIntroRevealPlayer1, setBattleIntroRevealPlayer1] = useState(false);
  const [battleIntroRevealPlayer2, setBattleIntroRevealPlayer2] = useState(false);
  const [isBattleEndSequenceActive, setIsBattleEndSequenceActive] = useState(false);
  const [battleEndSequenceStage, setBattleEndSequenceStage] = useState("idle");
  const [showVictoryContent, setShowVictoryContent] = useState(false);
  const [showResetHpConfirm, setShowResetHpConfirm] = useState(false);
  const [resetTargetPlayer, setResetTargetPlayer] = useState(null);
  const battleStartLaunchTimeoutRef = useRef(null);
  const battleIntroTimeoutsRef = useRef([]);
  const battleEndSequenceTimeoutsRef = useRef([]);

  const [showAdjustHpModal, setShowAdjustHpModal] = useState(false);
  const [adjustTargetPlayer, setAdjustTargetPlayer] = useState(null);
  const [adjustTargetSlot, setAdjustTargetSlot] = useState("main");
  const [adjustMode, setAdjustMode] = useState("-");
  const [adjustValue, setAdjustValue] = useState("");
  const [hpSyncRequest, setHpSyncRequest] = useState(null);
  const [showAdjustAttackModal, setShowAdjustAttackModal] = useState(false);
  const [adjustAttackPlayer, setAdjustAttackPlayer] = useState(null);
  const [adjustAttackSlot, setAdjustAttackSlot] = useState("main");
  const [adjustAttackAvatarName, setAdjustAttackAvatarName] = useState("");
  const [adjustAttackName, setAdjustAttackName] = useState("");
  const [adjustAttackBaseDamage, setAdjustAttackBaseDamage] = useState(0);
  const [adjustAttackMode, setAdjustAttackMode] = useState("-");
  const [adjustAttackValue, setAdjustAttackValue] = useState("");
  const attackAdjustClearHoldRef = useRef(null);
  const attackAdjustClearTriggeredRef = useRef(false);
  const [player1AttackModifiers, setPlayer1AttackModifiers] = useState({});
  const [player2AttackModifiers, setPlayer2AttackModifiers] = useState({});

  const [isRouletteActive, setIsRouletteActive] = useState(false);
  const [roulettePlayer1Index, setRoulettePlayer1Index] = useState(0);
  const [roulettePlayer2Index, setRoulettePlayer2Index] = useState(0);
  const [rouletteRevealPlayer1, setRouletteRevealPlayer1] = useState(false);
  const [rouletteRevealPlayer2, setRouletteRevealPlayer2] = useState(false);
  // Eliminados los estados de índices finales, se usarán refs locales
  const finalIndicesRef = useRef([0, 1]);
  const rouletteRevealTimeoutsRef = useRef([]);

  const [gameStarted, setGameStarted] = useState(false);
  const [startingPlayer, setStartingPlayer] = useState(null);
  const [currentTurnPlayer, setCurrentTurnPlayer] = useState(null);
  const [winner, setWinner] = useState(null);

  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showRestartConfirm, setShowRestartConfirm] = useState(false);

  const [screen, setScreen] = useState("home");
  const [screenVisible, setScreenVisible] = useState(true);
  const [savedBattleSlots, setSavedBattleSlots] = useState(
    Array(MAX_BATTLE_SAVE_SLOTS).fill(null)
  );
  const [chronicleSlots, setChronicleSlots] = useState(createEmptyChronicleSlots);
  const [selectedChronicleSlot, setSelectedChronicleSlot] = useState(0);
  const [loadedBattleSlotIndex, setLoadedBattleSlotIndex] = useState(null);
  const [saveToastMessage, setSaveToastMessage] = useState("");

  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  const [player1Secondary, setPlayer1Secondary] = useState(null);
  const [player2Secondary, setPlayer2Secondary] = useState(null);
  const [battleStats, setBattleStats] = useState(
    createBattleStatsState(AVATAR_OPTIONS[0].name, AVATAR_OPTIONS[1].name)
  );
  const [latestChronicleEntry, setLatestChronicleEntry] = useState(null);
  const [player1SecondaryPanelVisible, setPlayer1SecondaryPanelVisible] = useState(false);
  const [player2SecondaryPanelVisible, setPlayer2SecondaryPanelVisible] = useState(false);
  const [player1SecondaryTurnDisplay, setPlayer1SecondaryTurnDisplay] = useState(null);
  const [player2SecondaryTurnDisplay, setPlayer2SecondaryTurnDisplay] = useState(null);
  const player1SecondaryRef = useRef(null);
  const player2SecondaryRef = useRef(null);

  const [showSecondaryModal, setShowSecondaryModal] = useState(false);
  const [secondaryModalPlayer, setSecondaryModalPlayer] = useState(null);
  const [selectedSecondaryId, setSelectedSecondaryId] = useState(null);
  const [player1ActiveSlot, setPlayer1ActiveSlot] = useState("main");
  const [player2ActiveSlot, setPlayer2ActiveSlot] = useState("main");
  const [showSummonCardPreview, setShowSummonCardPreview] = useState(false);
  const [secondaryCarouselIndex, setSecondaryCarouselIndex] = useState(0);
  const [secondarySelectionExpanded, setSecondarySelectionExpanded] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [secondaryActionsVisible, setSecondaryActionsVisible] = useState(false);

  const [showTargetModal, setShowTargetModal] = useState(false);
  const [pendingAttack, setPendingAttack] = useState(null);
  const [selectedAttackTargetSlot, setSelectedAttackTargetSlot] = useState(null);

  const [showHealTargetModal, setShowHealTargetModal] = useState(false);
  const [pendingHealAmount, setPendingHealAmount] = useState(null);
  const [pendingHealPlayer, setPendingHealPlayer] = useState(null);
  const [selectedHealTargetSlot, setSelectedHealTargetSlot] = useState(null);
  const [battleUndoStack, setBattleUndoStack] = useState([]);
  const [battleRedoStack, setBattleRedoStack] = useState([]);

  const showHpPopup = (setter, text, kind) => {
    const tick = Date.now() + Math.random();
    setter({ text, kind, tick });
    setTimeout(() => {
      setter((current) => (current?.tick === tick ? null : current));
    }, 900);
  };

  const formatBattleElapsedTime = (totalSeconds) => {
    const safeSeconds = Number.isFinite(totalSeconds) ? totalSeconds : 0;
    const hours = Math.floor(safeSeconds / 3600);
    const minutes = Math.floor((safeSeconds % 3600) / 60);
    const seconds = safeSeconds % 60;

    return hours > 0
      ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}:${String(seconds).padStart(2, "0")}`
      : `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const showSaveToast = (message) => {
    if (saveToastTimeoutRef.current) {
      clearTimeout(saveToastTimeoutRef.current);
    }

    setSaveToastMessage(message);
    saveToastTimeoutRef.current = setTimeout(() => {
      setSaveToastMessage("");
      saveToastTimeoutRef.current = null;
    }, 2600);
  };

  const updateBattleStatsForPlayer = (playerId, updater) => {
    setBattleStats((prev) => {
      const nextPlayerStats = updater(prev[playerId]);
      if (!nextPlayerStats || nextPlayerStats === prev[playerId]) {
        return prev;
      }

      return {
        ...prev,
        [playerId]: nextPlayerStats,
      };
    });
  };

  const incrementBattleStats = (playerId, updates) => {
    updateBattleStatsForPlayer(playerId, (current) => ({
      ...current,
      ...Object.entries(updates).reduce((acc, [key, value]) => {
        acc[key] = (current[key] || 0) + value;
        return acc;
      }, {}),
    }));
  };

  const persistChronicleSlots = (slots) => {
    setChronicleSlots(slots);

    try {
      localStorage.setItem(CHRONICLES_STORAGE_KEY, JSON.stringify(slots));
    } catch {
      // Ignore local persistence errors and keep in-memory state.
    }
  };

  const clearBattleEndSequence = () => {
    battleEndSequenceTimeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
    battleEndSequenceTimeoutsRef.current = [];
    setIsBattleEndSequenceActive(false);
    setBattleEndSequenceStage("idle");
    setShowVictoryContent(false);
  };

  const buildBattleChronicleEntry = (winnerName) => {
    const winnerPlayerId =
      winnerName === player1Name ? "player1" : winnerName === player2Name ? "player2" : null;
    const loserPlayerId =
      winnerPlayerId === "player1" ? "player2" : winnerPlayerId === "player2" ? "player1" : null;

    const player1Stats = battleStats.player1;
    const player2Stats = battleStats.player2;

    return {
      savedAt: new Date().toISOString(),
      winner: winnerName,
      duration: formatChronicleDuration(elapsedSeconds),
      turnsPlayed: turn,
      winnerMainAvatar: winnerPlayerId ? (winnerPlayerId === "player1" ? player1Name : player2Name) : "Empate",
      loserMainAvatar: loserPlayerId ? (loserPlayerId === "player1" ? player1Name : player2Name) : "Empate",
      player1: {
        label: player1Name,
        stats: player1Stats,
      },
      player2: {
        label: player2Name,
        stats: player2Stats,
      },
    };
  };

  const persistSavedBattleSlots = (slots) => {
    setSavedBattleSlots(slots);

    try {
      localStorage.setItem(BATTLE_SAVE_STORAGE_KEY, JSON.stringify(slots));
    } catch {
      // Ignore local persistence errors and keep in-memory state.
    }
  };

  useEffect(() => {
    player1HpRef.current = player1Hp;
  }, [player1Hp]);

  useEffect(() => {
    player2HpRef.current = player2Hp;
  }, [player2Hp]);

  useEffect(() => {
    player1SecondaryRef.current = player1Secondary;
  }, [player1Secondary]);

  useEffect(() => {
    player2SecondaryRef.current = player2Secondary;
  }, [player2Secondary]);

  const getPlayerSlotEm = (playerId, slot) => {
    if (playerId === "player1") {
      return slot === "secondary" ? player1Secondary?.currentEm ?? 0 : player1Em;
    }

    return slot === "secondary" ? player2Secondary?.currentEm ?? 0 : player2Em;
  };

  const adjustPlayerSlotEm = (playerId, slot, delta, options = {}) => {
    const { markPlaced = false } = options;
    const isPlayer1 = playerId === "player1";

    if (slot === "secondary") {
      const setSecondary = isPlayer1 ? setPlayer1Secondary : setPlayer2Secondary;

      setSecondary((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          currentEm: Math.max(0, (prev.currentEm || 0) + delta),
        };
      });
    } else if (isPlayer1) {
      setPlayer1Em((prev) => Math.max(0, prev + delta));
    } else {
      setPlayer2Em((prev) => Math.max(0, prev + delta));
    }

    if (markPlaced && delta > 0) {
      incrementBattleStats(playerId, { emPlacedTotal: delta });
      const setCombatState = isPlayer1 ? setPlayer1CombatState : setPlayer2CombatState;
      setCombatState((prev) => ({
        ...prev,
        currentTurnEmPlaced: true,
      }));
    }
  };

  const cloneBattleValue = (value) =>
    value == null ? value : JSON.parse(JSON.stringify(value));

  const createBattleSnapshot = () => ({
    turn,
    startingPlayer,
    currentTurnPlayer,
    winner,
    elapsedSeconds,
    timerRunning,
    gameStarted,
    player1Confirmed,
    player2Confirmed,
    showQuickStartButton:
      showQuickStartButton || (!gameStarted && player1Confirmed && player2Confirmed),
    player1Name,
    player2Name,
    player1BaseHp,
    player2BaseHp,
    player1Hp,
    player2Hp,
    player1Em,
    player2Em,
    player1History: cloneBattleValue(player1History),
    player2History: cloneBattleValue(player2History),
    player1CombatState: cloneBattleValue(player1CombatState),
    player2CombatState: cloneBattleValue(player2CombatState),
    player1Secondary: cloneBattleValue(player1Secondary),
    player2Secondary: cloneBattleValue(player2Secondary),
    player1SecondaryPanelVisible,
    player2SecondaryPanelVisible,
    player1SecondaryTurnDisplay,
    player2SecondaryTurnDisplay,
    player1ActiveSlot,
    player2ActiveSlot,
    battleStats: cloneBattleValue(battleStats),
    player1AttackModifiers: cloneBattleValue(player1AttackModifiers),
    player2AttackModifiers: cloneBattleValue(player2AttackModifiers),
  });

  const applyBattleSnapshot = (snapshot) => {
    if (!snapshot) return;

    setTurn(snapshot.turn);
    setStartingPlayer(snapshot.startingPlayer);
    setCurrentTurnPlayer(snapshot.currentTurnPlayer);
    setWinner(snapshot.winner);
    setElapsedSeconds(snapshot.elapsedSeconds);
    setTimerRunning(snapshot.timerRunning);
    setGameStarted(snapshot.gameStarted);
    setPlayer1Confirmed(snapshot.player1Confirmed ?? false);
    setPlayer2Confirmed(snapshot.player2Confirmed ?? false);
    setShowQuickStartButton(snapshot.showQuickStartButton ?? false);
    setPlayer1Name(snapshot.player1Name);
    setPlayer2Name(snapshot.player2Name);
    setPlayer1BaseHp(snapshot.player1BaseHp);
    setPlayer2BaseHp(snapshot.player2BaseHp);
    setPlayer1Hp(snapshot.player1Hp);
    setPlayer2Hp(snapshot.player2Hp);
    setPlayer1Em(snapshot.player1Em);
    setPlayer2Em(snapshot.player2Em);
    setPlayer1History(snapshot.player1History || []);
    setPlayer2History(snapshot.player2History || []);
    setPlayer1CombatState(snapshot.player1CombatState || createCombatState());
    setPlayer2CombatState(snapshot.player2CombatState || createCombatState());
    setPlayer1Secondary(snapshot.player1Secondary);
    setPlayer2Secondary(snapshot.player2Secondary);
    setPlayer1SecondaryPanelVisible(
      snapshot.player1SecondaryPanelVisible ?? !!snapshot.player1Secondary
    );
    setPlayer2SecondaryPanelVisible(
      snapshot.player2SecondaryPanelVisible ?? !!snapshot.player2Secondary
    );
    setPlayer1SecondaryTurnDisplay(snapshot.player1SecondaryTurnDisplay);
    setPlayer2SecondaryTurnDisplay(snapshot.player2SecondaryTurnDisplay);
    setPlayer1ActiveSlot(snapshot.player1ActiveSlot || "main");
    setPlayer2ActiveSlot(snapshot.player2ActiveSlot || "main");
    setBattleStats(
      snapshot.battleStats ||
        createBattleStatsState(snapshot.player1Name || player1Name, snapshot.player2Name || player2Name)
    );
    setPlayer1AttackModifiers(snapshot.player1AttackModifiers || {});
    setPlayer2AttackModifiers(snapshot.player2AttackModifiers || {});
    setPlayer1MainHpFlash("");
    setPlayer2MainHpFlash("");
    setPlayer1SecondaryHpFlash("");
    setPlayer2SecondaryHpFlash("");
    setShowTargetModal(false);
    setPendingAttack(null);
    setSelectedAttackTargetSlot(null);
    setShowHealTargetModal(false);
    setPendingHealAmount(null);
    setPendingHealPlayer(null);
    setSelectedHealTargetSlot(null);
    setShowAdjustHpModal(false);
    setShowAdjustAttackModal(false);
    setShowStartMatchModal(false);
    setShowExitConfirm(false);
    setShowRestartConfirm(false);
    setShowResetHpConfirm(false);
    setShowSecondaryModal(false);
    setShowSummonCardPreview(false);
    clearBattleEndSequence();
  };

  const pushBattleHistorySnapshot = () => {
    if (!gameStarted) return;
    const snapshot = createBattleSnapshot();
    setBattleUndoStack((prev) => [...prev, snapshot].slice(-5));
    setBattleRedoStack([]);
  };

  const clearBattleHistory = () => {
    setBattleUndoStack([]);
    setBattleRedoStack([]);
  };

  const getNextBattleSaveSlotIndex = () => {
    const firstEmptySlot = savedBattleSlots.findIndex((slot) => !slot);
    if (firstEmptySlot !== -1) return firstEmptySlot;

    return savedBattleSlots.reduce((oldestIndex, slot, index, slots) => {
      const currentTime = new Date(slot?.savedAt || 0).getTime();
      const oldestTime = new Date(slots[oldestIndex]?.savedAt || 0).getTime();
      return currentTime < oldestTime ? index : oldestIndex;
    }, 0);
  };

  const handleSaveBattleAndExit = () => {
    const nextSlotIndex =
      loadedBattleSlotIndex !== null
        ? loadedBattleSlotIndex
        : getNextBattleSaveSlotIndex();
    const snapshot = createBattleSnapshot();
    const savedAt = new Date().toISOString();

    const nextSlots = [...savedBattleSlots];
    nextSlots[nextSlotIndex] = {
      slotNumber: nextSlotIndex + 1,
      savedAt,
      turn: snapshot.turn,
      player1Name: snapshot.player1Name,
      player2Name: snapshot.player2Name,
      formattedTime: formatBattleElapsedTime(snapshot.elapsedSeconds),
      snapshot,
    };

    persistSavedBattleSlots(nextSlots);
    resetGameState();
    setShowExitConfirm(false);
    navigateWithTransition("home");
    showSaveToast(
      `PARTIDA GUARDADA EXITOSAMENTE EN EL SLOT #${nextSlotIndex + 1}`
    );
  };

  const handleSaveChronicleAndExit = () => {
    persistCurrentChronicle();
    resetGameState();
    setShowExitConfirm(false);
    navigateWithTransition("home");
  };

  const handleExitWithoutSaving = () => {
    resetGameState();
    setShowExitConfirm(false);
    navigateWithTransition("home");
  };

  const handleLoadSavedBattle = (slotIndex) => {
    const slot = savedBattleSlots[slotIndex];
    if (!slot?.snapshot) return;

    setScreenVisible(false);

    setTimeout(() => {
      clearBattleHistory();
      setLoadedBattleSlotIndex(slotIndex);
      applyBattleSnapshot(slot.snapshot);
      setScreen("battle");
      setScreenVisible(true);
    }, 250);
  };

  const handleDeleteSavedBattle = (slotIndex) => {
    const nextSlots = [...savedBattleSlots];
    if (!nextSlots[slotIndex]) return;

    nextSlots[slotIndex] = null;
    persistSavedBattleSlots(nextSlots);
    showSaveToast(`PARTIDA ELIMINADA DEL SLOT #${slotIndex + 1}`);
  };

  const handleDeleteChronicle = (slotIndex) => {
    const nextSlots = [...chronicleSlots];
    if (!nextSlots[slotIndex]) return;

    nextSlots[slotIndex] = null;
    persistChronicleSlots(nextSlots);

    if (selectedChronicleSlot === slotIndex) {
      const nextSelectedSlot = nextSlots.findIndex(Boolean);
      setSelectedChronicleSlot(nextSelectedSlot >= 0 ? nextSelectedSlot : 0);
    }

    showSaveToast(`CRÓNICA ELIMINADA DEL SLOT #${slotIndex + 1}`);
  };

  const persistCurrentChronicle = () => {
    if (!winner || !latestChronicleEntry) return;

    const nextChronicleSlots = [latestChronicleEntry, ...chronicleSlots.filter(Boolean)].slice(
      0,
      MAX_CHRONICLE_SLOTS
    );
    const normalizedChronicleSlots = Array.from(
      { length: MAX_CHRONICLE_SLOTS },
      (_, index) => nextChronicleSlots[index] || null
    );

    persistChronicleSlots(normalizedChronicleSlots);
    setSelectedChronicleSlot(0);
    showSaveToast(
      "LA PARTIDA ACTUAL SE GUARDÓ EN EL APARTADO CRÓNICAS, YA PUEDES REVISARLO."
    );
  };

  const handleUndoBattleAction = () => {
    if (battleUndoStack.length === 0) return;
    const previousSnapshot = battleUndoStack[battleUndoStack.length - 1];
    const currentSnapshot = createBattleSnapshot();
    setBattleUndoStack((prev) => prev.slice(0, -1));
    setBattleRedoStack((prev) => [...prev, currentSnapshot]);
    applyBattleSnapshot(previousSnapshot);
  };

  const handleRedoBattleAction = () => {
    if (battleRedoStack.length === 0) return;
    const nextSnapshot = battleRedoStack[battleRedoStack.length - 1];
    const currentSnapshot = createBattleSnapshot();
    setBattleRedoStack((prev) => prev.slice(0, -1));
    setBattleUndoStack((prev) => [...prev, currentSnapshot]);
    applyBattleSnapshot(nextSnapshot);
  };

  const handleManualEmChange = (playerId, slot, delta) => {
    const currentEm = getPlayerSlotEm(playerId, slot);
    if (delta < 0 && currentEm <= 0) return;
    pushBattleHistorySnapshot();
    adjustPlayerSlotEm(playerId, slot, delta, { markPlaced: delta > 0 });
  };

useEffect(() => {
  menuMusicRef.current = new Audio("/audio/menu-theme.mp3");
  menuMusicRef.current.loop = true;
  menuMusicRef.current.volume = 0.35;
  menuMusicRef.current.preload = "auto";

  battleMusicRef.current = new Audio("/audio/battle-theme.mp3");
  battleMusicRef.current.loop = true;
  battleMusicRef.current.volume = 0.35;
  battleMusicRef.current.preload = "auto";

  buttonClickSoundRef.current = new Audio("/audio/button-click.mp3");
  buttonClickSoundRef.current.volume = 0.45;
  buttonClickSoundRef.current.preload = "auto";

  return () => {
    [menuMusicRef.current, battleMusicRef.current, buttonClickSoundRef.current].forEach((audio) => {
      if (!audio) return;
      audio.pause();
      audio.currentTime = 0;
    });
  };
}, []);

useEffect(() => {
  try {
    const storedSlots = localStorage.getItem(BATTLE_SAVE_STORAGE_KEY);
    if (!storedSlots) return;

    const parsedSlots = JSON.parse(storedSlots);
    if (!Array.isArray(parsedSlots)) return;

    const normalizedSlots = Array.from(
      { length: MAX_BATTLE_SAVE_SLOTS },
      (_, index) => parsedSlots[index] || null
    );
    setSavedBattleSlots(normalizedSlots);
  } catch {
    setSavedBattleSlots(Array(MAX_BATTLE_SAVE_SLOTS).fill(null));
  }
}, []);

useEffect(() => {
  try {
    const storedChronicles = localStorage.getItem(CHRONICLES_STORAGE_KEY);
    if (!storedChronicles) return;

    const parsedChronicles = JSON.parse(storedChronicles);
    if (!Array.isArray(parsedChronicles)) return;

    const normalizedChronicles = Array.from(
      { length: MAX_CHRONICLE_SLOTS },
      (_, index) => parsedChronicles[index] || null
    );
    setChronicleSlots(normalizedChronicles);
  } catch {
    setChronicleSlots(createEmptyChronicleSlots());
  }
}, []);

useEffect(() => {
  return () => {
    if (saveToastTimeoutRef.current) {
      clearTimeout(saveToastTimeoutRef.current);
      saveToastTimeoutRef.current = null;
    }
  };
}, []);

useEffect(() => {
  const unlockAudio = () => setAudioUnlocked(true);

  window.addEventListener("pointerdown", unlockAudio, { once: true });
  window.addEventListener("keydown", unlockAudio, { once: true });

  return () => {
    window.removeEventListener("pointerdown", unlockAudio);
    window.removeEventListener("keydown", unlockAudio);
  };
}, []);

useEffect(() => {
  if (!audioUnlocked) return;

  const activeMusic = screen === "battle" ? battleMusicRef.current : menuMusicRef.current;
  const inactiveMusic = screen === "battle" ? menuMusicRef.current : battleMusicRef.current;

  if (inactiveMusic) {
    inactiveMusic.pause();
    inactiveMusic.currentTime = 0;
  }

  if (activeMusic) {
    activeMusic.play().catch(() => {});
  }
}, [audioUnlocked, screen]);

useEffect(() => {
  if (!audioUnlocked) return;

  const playButtonClick = (event) => {
    const button = event.target instanceof HTMLElement
      ? event.target.closest("button")
      : null;

    if (!button || button.disabled) return;
    if (!buttonClickSoundRef.current) return;

    buttonClickSoundRef.current.currentTime = 0;
    buttonClickSoundRef.current.play().catch(() => {});
  };

  document.addEventListener("click", playButtonClick, true);

  return () => {
    document.removeEventListener("click", playButtonClick, true);
  };
}, [audioUnlocked]);

const triggerFlash = (setFlash, type) => {
  setFlash(type);
  setTimeout(() => setFlash(""), 1000);
};

const secondaryTurnTimeoutRef = useRef({
  player1: null,
  player2: null,
});

const showExpiredSecondaryTurn = (playerId) => {
  const setTurnDisplay =
    playerId === "player1" ? setPlayer1SecondaryTurnDisplay : setPlayer2SecondaryTurnDisplay;

  const existingTimeout = secondaryTurnTimeoutRef.current[playerId];
  if (existingTimeout) {
    clearTimeout(existingTimeout);
  }

  setTurnDisplay(0);
  secondaryTurnTimeoutRef.current[playerId] = setTimeout(() => {
    setTurnDisplay(null);
    secondaryTurnTimeoutRef.current[playerId] = null;
  }, 1000);
};

useEffect(() => {
  const secondaryTurnTimeouts = Object.values(secondaryTurnTimeoutRef.current);

  return () => {
    secondaryTurnTimeouts.forEach((timeoutId) => {
      if (timeoutId) clearTimeout(timeoutId);
    });
  };
}, [player1SecondaryTurnDisplay, player2SecondaryTurnDisplay]);

const resetGameState = (options = {}) => {
  const preserveAvatars = options.preserveAvatars ?? false;
  const nextPlayer1Avatar = preserveAvatars ? getAvatarData(player1Name) : AVATAR_OPTIONS[0];
  const nextPlayer2Avatar = preserveAvatars ? getAvatarData(player2Name) : AVATAR_OPTIONS[1];
  Object.keys(secondaryTurnTimeoutRef.current).forEach((playerId) => {
    if (secondaryTurnTimeoutRef.current[playerId]) {
      clearTimeout(secondaryTurnTimeoutRef.current[playerId]);
      secondaryTurnTimeoutRef.current[playerId] = null;
    }
  });

  setTurn(1);

  setPlayer1Name(nextPlayer1Avatar.name);
  setPlayer2Name(nextPlayer2Avatar.name);

  setPlayer1BaseHp(nextPlayer1Avatar.hp);
  setPlayer2BaseHp(nextPlayer2Avatar.hp);

  setPlayer1Hp(nextPlayer1Avatar.hp);
  setPlayer2Hp(nextPlayer2Avatar.hp);
  setPlayer1Em(0);
  setPlayer2Em(0);
  setPlayer1AttackModifiers({});
  setPlayer2AttackModifiers({});

  setPlayer1History([]);
  setPlayer2History([]);

  setPlayer1CombatState(createCombatState());
  setPlayer2CombatState(createCombatState());

  setPlayer1MainHpFlash("");
  setPlayer2MainHpFlash("");
  setPlayer1SecondaryHpFlash("");
  setPlayer2SecondaryHpFlash("");

  setPlayer1Confirmed(false);
  setPlayer2Confirmed(false);

  setShowStartMatchModal(false);
  setShowQuickStartButton(false);
  setIsLaunchingBattleFromModal(false);
  if (battleStartLaunchTimeoutRef.current) {
    clearTimeout(battleStartLaunchTimeoutRef.current);
    battleStartLaunchTimeoutRef.current = null;
  }
  battleIntroTimeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
  battleIntroTimeoutsRef.current = [];
  setIsBattleIntroStaging(false);
  setBattleIntroRevealPlayer1(false);
  setBattleIntroRevealPlayer2(false);
  clearBattleEndSequence();

  setGameStarted(false);
  setStartingPlayer(null);
  setCurrentTurnPlayer(null);
  setWinner(null);
  setLatestChronicleEntry(null);
  setLoadedBattleSlotIndex(null);
  setElapsedSeconds(0);
  setTimerRunning(false);

  setPlayer1Secondary(null);
  setPlayer2Secondary(null);
  setBattleStats(createBattleStatsState(nextPlayer1Avatar.name, nextPlayer2Avatar.name));
  setPlayer1SecondaryPanelVisible(false);
  setPlayer2SecondaryPanelVisible(false);
  setPlayer1SecondaryTurnDisplay(null);
  setPlayer2SecondaryTurnDisplay(null);

  setPlayer1ActiveSlot("main");
  setPlayer2ActiveSlot("main");
  clearBattleHistory();

};


useEffect(() => {
  if (!timerRunning) return;

  const interval = setInterval(() => {
    setElapsedSeconds((prev) => prev + 1);
  }, 1000);

  return () => clearInterval(interval);
}, [timerRunning]);

useEffect(() => {
  if (!player1Secondary) {
    setPlayer1SecondaryPanelVisible(false);
  }
}, [player1Secondary]);

useEffect(() => {
  if (!player2Secondary) {
    setPlayer2SecondaryPanelVisible(false);
  }
}, [player2Secondary]);

useEffect(() => {
  return () => {
    rouletteRevealTimeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
    rouletteRevealTimeoutsRef.current = [];
    if (battleStartLaunchTimeoutRef.current) {
      clearTimeout(battleStartLaunchTimeoutRef.current);
      battleStartLaunchTimeoutRef.current = null;
    }
    battleIntroTimeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
    battleIntroTimeoutsRef.current = [];
    battleEndSequenceTimeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
    battleEndSequenceTimeoutsRef.current = [];
  };
}, []);

useEffect(() => {
  if (!gameStarted || winner) return;

  let nextWinner = null;

  if (player1Hp <= 0 && player2Hp <= 0) {
    nextWinner = "Empate";
  } else if (player1Hp <= 0) {
    nextWinner = player2Name;
  } else if (player2Hp <= 0) {
    nextWinner = player1Name;
  }

  if (!nextWinner) return;

  const winnerFrame = requestAnimationFrame(() => {
    setWinner(nextWinner);
    setTimerRunning(false);
    setShowVictoryContent(false);
    setIsBattleEndSequenceActive(true);
    setBattleEndSequenceStage("duel");
    battleEndSequenceTimeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));

    const monochromeTimeout = setTimeout(() => {
      setBattleEndSequenceStage("monochrome");
    }, 1500);

    const titleTimeout = setTimeout(() => {
      setBattleEndSequenceStage("title");
    }, 2650);

    const revealTimeout = setTimeout(() => {
      setIsBattleEndSequenceActive(false);
      setBattleEndSequenceStage("idle");
      setShowVictoryContent(true);
      battleEndSequenceTimeoutsRef.current = [];
    }, 4100);

    battleEndSequenceTimeoutsRef.current = [
      monochromeTimeout,
      titleTimeout,
      revealTimeout,
    ];
  });

  return () => cancelAnimationFrame(winnerFrame);
}, [gameStarted, winner, player1Hp, player2Hp, player1Name, player2Name]);

useEffect(() => {
  if (!gameStarted || !winner) return;

  setLatestChronicleEntry(buildBattleChronicleEntry(winner));
}, [gameStarted, winner, battleStats, elapsedSeconds, turn]);

const handleOpenSecondaryModal = (playerId) => {
  const isPlayer1 = playerId === "player1";
  const secondaryAvatar = isPlayer1 ? player1Secondary : player2Secondary;
  const isPlayerTurnActive = isPlayer1 ? player1TurnActive : player2TurnActive;
  const secondaryTurnsRemaining = isPlayer1
    ? player1SecondaryTurnDisplay
    : player2SecondaryTurnDisplay;

  if (secondaryAvatar) {
    if (isPlayer1) {
      setPlayer1SecondaryPanelVisible((prev) => !prev);
    } else {
      setPlayer2SecondaryPanelVisible((prev) => !prev);
    }
    return;
  }

  if (!gameStarted || gameOver || !isPlayerTurnActive || turn <= 1 || secondaryTurnsRemaining === 0) {
    return;
  }

  setSecondaryModalPlayer(playerId);
  setSecondaryCarouselIndex(0);
  setSelectedSecondaryId(SECONDARY_AVATARS[0]?.id || null);
  setSecondarySelectionExpanded(false);
  setSecondaryActionsVisible(false);
  setShowSummonCardPreview(false);
  setShowSecondaryModal(true);
};

const handleCloseSecondaryModal = () => {
  setShowSecondaryModal(false);
  setSecondaryModalPlayer(null);
  setSelectedSecondaryId(null);
  setSecondaryCarouselIndex(0);
  setSecondarySelectionExpanded(false);
  setSecondaryActionsVisible(false);
  setShowSummonCardPreview(false);
};

const handleHealRequest = (playerId, amount) => {
  const hasSecondary = playerId === "player1" ? !!player1Secondary : !!player2Secondary;

  if (hasSecondary) {
    setSelectedHealTargetSlot(null);
    setPendingHealPlayer(playerId);
    setPendingHealAmount(amount);
    setShowHealTargetModal(true);
    return;
  }

  applyHealToTarget(playerId, amount, "main");
};

const handleSecondaryTouchStart = (e) => {
  setTouchStartX(e.touches[0].clientX);
};

const handleSecondaryTouchEnd = (e) => {
  if (touchStartX === null) return;

  const touchEndX = e.changedTouches[0].clientX;
  const deltaX = touchStartX - touchEndX;

  if (Math.abs(deltaX) > 40) {
    if (deltaX > 0) {
      handleSecondaryNext();
    } else {
      handleSecondaryPrev();
    }
  }

  setTouchStartX(null);
};

const handleSecondaryPrev = () => {
  setSecondarySelectionExpanded(false);
  setSecondaryActionsVisible(false);
  setShowSummonCardPreview(false);

  setSecondaryCarouselIndex((prev) => {
    const nextIndex = prev <= 0 ? SECONDARY_AVATARS.length - 1 : prev - 1;
    setSelectedSecondaryId(SECONDARY_AVATARS[nextIndex].id);
    return nextIndex;
  });
};

const handleSecondaryNext = () => {
  setSecondarySelectionExpanded(false);
  setSecondaryActionsVisible(false);
  setShowSummonCardPreview(false);

  setSecondaryCarouselIndex((prev) => {
    const nextIndex =
      prev >= SECONDARY_AVATARS.length - 1 ? 0 : prev + 1;
    setSelectedSecondaryId(SECONDARY_AVATARS[nextIndex].id);
    return nextIndex;
  });
};

const handleSecondaryCardTap = (avatarId) => {
  const currentAvatar = SECONDARY_AVATARS[secondaryCarouselIndex];
  if (!currentAvatar) return;

  if (currentAvatar.id !== avatarId) {
    const newIndex = SECONDARY_AVATARS.findIndex((a) => a.id === avatarId);
    if (newIndex !== -1) {
      setSecondaryCarouselIndex(newIndex);
      setSelectedSecondaryId(avatarId);
      setSecondarySelectionExpanded(false);
      setSecondaryActionsVisible(false);
      setShowSummonCardPreview(false);
    }
    return;
  }

  if (showSummonCardPreview) return;

  setSecondarySelectionExpanded(true);
  setSecondaryActionsVisible((prev) => !prev);
};

const applyHealToTarget = (playerId, amount, targetSlot) => {
  const isPlayer1 = playerId === "player1";
  const syncTick = Date.now();

  if (targetSlot === "main") {
    const currentHp = isPlayer1 ? player1HpRef.current : player2HpRef.current;
    const maxHp = isPlayer1 ? player1BaseHp : player2BaseHp;
    const healedHp = Math.min(maxHp, currentHp + amount);
    const healed = healedHp - currentHp;

    if (healed <= 0) return;
    pushBattleHistorySnapshot();
    incrementBattleStats(playerId, {
      healingTotal: healed,
      manualHpAdjustments: 1,
    });

    if (isPlayer1) {
      player1HpRef.current = healedHp;
      setPlayer1Hp(healedHp);
      triggerFlash(setPlayer1MainHpFlash, "heal");
      showHpPopup(setPlayer1MainHpPopup, `+${healed} PV`, "heal");
      setPlayer1History((prev) => [`Curación manual: +${healed} PV`, ...prev.slice(0, 5)]);
    } else {
      player2HpRef.current = healedHp;
      setPlayer2Hp(healedHp);
      triggerFlash(setPlayer2MainHpFlash, "heal");
      showHpPopup(setPlayer2MainHpPopup, `+${healed} PV`, "heal");
      setPlayer2History((prev) => [`Curación manual: +${healed} PV`, ...prev.slice(0, 5)]);
    }

    setHpSyncRequest({
      playerId,
      slot: "main",
      tick: syncTick,
    });
  } else {
    const secondary = isPlayer1 ? player1SecondaryRef.current : player2SecondaryRef.current;
    if (!secondary) return;

    const healedHp = Math.min(secondary.maxHp, secondary.currentHp + amount);
    const healed = healedHp - secondary.currentHp;

    if (healed <= 0) return;
    pushBattleHistorySnapshot();
    incrementBattleStats(playerId, {
      healingTotal: healed,
      manualHpAdjustments: 1,
    });

    if (isPlayer1) {
      player1SecondaryRef.current = {
        ...secondary,
        currentHp: healedHp,
      };
      setPlayer1Secondary((prev) => ({
        ...prev,
        currentHp: healedHp,
      }));
      triggerFlash(setPlayer1SecondaryHpFlash, "heal");
      showHpPopup(setPlayer1SecondaryHpPopup, `+${healed} PV`, "heal");
      setPlayer1History((prev) => [
        `Curación manual a ${secondary.name}: +${healed} PV`,
        ...prev.slice(0, 5),
      ]);
    } else {
      player2SecondaryRef.current = {
        ...secondary,
        currentHp: healedHp,
      };
      setPlayer2Secondary((prev) => ({
        ...prev,
        currentHp: healedHp,
      }));
      triggerFlash(setPlayer2SecondaryHpFlash, "heal");
      showHpPopup(setPlayer2SecondaryHpPopup, `+${healed} PV`, "heal");
      setPlayer2History((prev) => [
        `Curación manual a ${secondary.name}: +${healed} PV`,
        ...prev.slice(0, 5),
      ]);
    }

    setHpSyncRequest({
      playerId,
      slot: "secondary",
      tick: syncTick,
    });
  }
};

const handleChooseHealTarget = (targetSlot) => {
  if (!pendingHealPlayer || !pendingHealAmount) return;

  applyHealToTarget(pendingHealPlayer, pendingHealAmount, targetSlot);

  setShowHealTargetModal(false);
  setPendingHealAmount(null);
  setPendingHealPlayer(null);
  setSelectedHealTargetSlot(null);
};

const closeHealTargetModal = () => {
  setShowHealTargetModal(false);
  setPendingHealAmount(null);
  setPendingHealPlayer(null);
  setSelectedHealTargetSlot(null);
};

const handleAttackRequest = (attackerId, attack, attackerSlot) => {
  const enemyHasSecondary =
    attackerId === "player1" ? !!player2Secondary : !!player1Secondary;
  const ownEm = getPlayerSlotEm(attackerId, attackerSlot);
  const attackerAvatarName =
    attackerSlot === "main"
      ? attackerId === "player1"
        ? player1Name
        : player2Name
      : attackerId === "player1"
      ? player1Secondary?.name
      : player2Secondary?.name;
  const attackCost = getAttackCost(attackerAvatarName, attack);

  if (ownEm < attackCost) return;

  const enemyMainName =
    attackerId === "player1" ? player2Name : player1Name;
  const enemyMainImage = getAvatarData(enemyMainName).image;

  const enemySecondaryName =
    attackerId === "player1"
      ? player2Secondary?.name
      : player1Secondary?.name;
  const enemySecondaryImage =
    attackerId === "player1"
      ? player2Secondary?.image
      : player1Secondary?.image;

  const request = {
    attackerId,
    attack,
    attackerSlot,
    enemyMainName,
    enemyMainImage,
    enemySecondaryName,
    enemySecondaryImage,
  };

  if (enemyHasSecondary) {
    setSelectedAttackTargetSlot(null);
    setPendingAttack(request);
    setShowTargetModal(true);
    return;
  }

  resolveAttackAgainstTarget(attackerId, attack, attackerSlot, "main");
};

const closeTargetModal = () => {
  setShowTargetModal(false);
  setPendingAttack(null);
  setSelectedAttackTargetSlot(null);
};

const handleChooseAttackTarget = (targetSlot) => {
  if (!pendingAttack) return;

  resolveAttackAgainstTarget(
    pendingAttack.attackerId,
    pendingAttack.attack,
    pendingAttack.attackerSlot,
    targetSlot
  );

  closeTargetModal();
};

const handleToggleSummonCardPreview = () => {
  if (!selectedSecondaryId) return;

  if (showSummonCardPreview) {
    setShowSummonCardPreview(false);
    setSecondaryActionsVisible(false);
    return;
  }

  setShowSummonCardPreview(true);
};

const resolveAttackAgainstTarget = (attackerId, attack, attackerSlot, targetSlot) => {
  const isPlayer1 = attackerId === "player1";

  const attackerMainName = isPlayer1 ? player1Name : player2Name;
  const enemyMainName = isPlayer1 ? player2Name : player1Name;

  const attackerMainData = getAvatarData(attackerMainName);
  const enemyMainData = getAvatarData(enemyMainName);

  const attackerSecondary = isPlayer1 ? player1Secondary : player2Secondary;
  const enemySecondary = isPlayer1 ? player2Secondary : player1Secondary;

  const ownCombatState = isPlayer1 ? player1CombatState : player2CombatState;
  const enemyCombatState = isPlayer1 ? player2CombatState : player1CombatState;

  const setOwnCombatState = isPlayer1 ? setPlayer1CombatState : setPlayer2CombatState;
  const setEnemyCombatState = isPlayer1 ? setPlayer2CombatState : setPlayer1CombatState;

  const setOwnMainHp = isPlayer1 ? setPlayer1Hp : setPlayer2Hp;
  const setEnemyMainHp = isPlayer1 ? setPlayer2Hp : setPlayer1Hp;
  const ownMainEm = isPlayer1 ? player1Em : player2Em;
  const enemyMainEm = isPlayer1 ? player2Em : player1Em;
  const ownSecondaryEm = attackerSecondary?.currentEm ?? 0;
  const enemySecondaryEm = enemySecondary?.currentEm ?? 0;
  const ownActiveEm = attackerSlot === "secondary" ? ownSecondaryEm : ownMainEm;
  const enemyAnyAvatarEm = enemyMainEm + enemySecondaryEm;

  const ownMainHp = isPlayer1 ? player1Hp : player2Hp;
  const enemyMainHp = isPlayer1 ? player2Hp : player1Hp;
  const setOwnAttackModifiers = isPlayer1 ? setPlayer1AttackModifiers : setPlayer2AttackModifiers;

  const setOwnHistory = isPlayer1 ? setPlayer1History : setPlayer2History;
  const setEnemyHistory = isPlayer1 ? setPlayer2History : setPlayer1History;

  const setOwnMainFlash = isPlayer1 ? setPlayer1MainHpFlash : setPlayer2MainHpFlash;
  const setEnemyMainFlash = isPlayer1 ? setPlayer2MainHpFlash : setPlayer1MainHpFlash;
  const setOwnSecondaryFlash = isPlayer1 ? setPlayer1SecondaryHpFlash : setPlayer2SecondaryHpFlash;
  const setEnemySecondaryFlash = isPlayer1 ? setPlayer2SecondaryHpFlash : setPlayer1SecondaryHpFlash;
  const setOwnMainHpPopup = isPlayer1 ? setPlayer1MainHpPopup : setPlayer2MainHpPopup;
  const setEnemyMainHpPopup = isPlayer1 ? setPlayer2MainHpPopup : setPlayer1MainHpPopup;
  const setOwnSecondaryHpPopup =
    isPlayer1 ? setPlayer1SecondaryHpPopup : setPlayer2SecondaryHpPopup;
  const setEnemySecondaryHpPopup =
    isPlayer1 ? setPlayer2SecondaryHpPopup : setPlayer1SecondaryHpPopup;

  const setOwnSecondary = isPlayer1 ? setPlayer1Secondary : setPlayer2Secondary;
  const setEnemySecondary = isPlayer1 ? setPlayer2Secondary : setPlayer1Secondary;
  const setOwnSecondaryTurnDisplay =
    isPlayer1 ? setPlayer1SecondaryTurnDisplay : setPlayer2SecondaryTurnDisplay;
  const setEnemySecondaryTurnDisplay =
    isPlayer1 ? setPlayer2SecondaryTurnDisplay : setPlayer1SecondaryTurnDisplay;

  const setOwnActiveSlot = isPlayer1 ? setPlayer1ActiveSlot : setPlayer2ActiveSlot;
  const setEnemyActiveSlot = isPlayer1 ? setPlayer2ActiveSlot : setPlayer1ActiveSlot;

  const ownTargetName =
    attackerSlot === "main"
      ? attackerMainData.name
      : attackerSecondary?.name || "Avatar Secundario";
  const attackModifierKey = getAttackModifierKey(
    attackerId,
    attackerSlot,
    ownTargetName,
    attack.name
  );
  const adjustedAttackDamage = getAdjustedAttackDamage(
    attackerId,
    attackerSlot,
    ownTargetName,
    attack
  );

  const enemyTargetName =
    targetSlot === "main"
      ? enemyMainData.name
      : enemySecondary?.name || "Avatar Secundario";

  const attackerCurrentHp =
    attackerSlot === "main"
      ? ownMainHp
      : attackerSecondary?.currentHp || 0;
  const attackerAttackCount =
    attackerSlot === "secondary" ? attackerSecondary?.attackCount || 0 : 0;

  const targetCurrentHp =
    targetSlot === "main"
      ? enemyMainHp
      : enemySecondary?.currentHp || 0;

  const targetType =
    targetSlot === "main"
      ? enemyMainData.type
      : enemySecondary?.type || "";
  const attackCost = getAttackCost(ownTargetName, attack);

  if (ownActiveEm < attackCost) return;
  pushBattleHistorySnapshot();
  incrementBattleStats(attackerId, { attacksPerformed: 1 });

  let totalDamage = adjustedAttackDamage;
  let selfHeal = 0;
  let selfDamage = 0;
  let healOnSecondaryDefeat = 0;
  let blockEnemyEmTurns = 0;
  let effectActivationsTriggered = 0;
  let blockEnemyEmIfMainHpAtOrBelow = null;
  const notes = [];
  const registerEffectActivation = () => {
    effectActivationsTriggered += 1;
  };

  const addOwnHistory = (text) => {
    setOwnHistory((prev) => [text, ...prev.slice(0, 5)]);
  };

  const addEnemyHistory = (text) => {
    setEnemyHistory((prev) => [text, ...prev.slice(0, 5)]);
  };

  const triggerOwnFlash = (slot, type) => {
    triggerFlash(slot === "secondary" ? setOwnSecondaryFlash : setOwnMainFlash, type);
  };

  const triggerEnemyFlash = (slot, type) => {
    triggerFlash(slot === "secondary" ? setEnemySecondaryFlash : setEnemyMainFlash, type);
  };

  const showOwnPopup = (slot, text, kind) => {
    showHpPopup(slot === "secondary" ? setOwnSecondaryHpPopup : setOwnMainHpPopup, text, kind);
  };

  const showEnemyPopup = (slot, text, kind) => {
    showHpPopup(slot === "secondary" ? setEnemySecondaryHpPopup : setEnemyMainHpPopup, text, kind);
  };

  const processEffect = (effect) => {
    if (!effect) return;

    switch (effect.type) {
      case "compound":
        effect.effects?.forEach(processEffect);
        break;

      case "self_heal":
        selfHeal += effect.heal || 0;
        registerEffectActivation();
        break;

      case "self_damage":
        selfDamage += effect.selfDamage || 0;
        registerEffectActivation();
        break;

      case "enemy_hp_below_or_equal":
        if (targetCurrentHp <= effect.threshold) {
          totalDamage += effect.bonusDamage;
          notes.push(`Efecto activo: +${effect.bonusDamage} PD`);
          registerEffectActivation();
        }
        break;

      case "if_attack_leaves_enemy_main_at_or_below_block_em":
        blockEnemyEmIfMainHpAtOrBelow = effect.threshold;
        break;

      case "bonus_if_previous_turn_attack_was":
        if (attackerSlot === "main" && ownCombatState.previousTurnAttack === effect.attackName) {
          totalDamage += effect.bonusDamage;
          notes.push(`Combo previo: +${effect.bonusDamage} PD`);
          registerEffectActivation();
        }
        break;

      case "enemy_main_type_bonus":
        if (enemyMainData.type === effect.enemyType) {
          totalDamage += effect.bonusDamage;
          notes.push(`Ventaja sobre avatar principal: +${effect.bonusDamage} PD`);
          registerEffectActivation();
        }
        break;

      case "enemy_main_type_steal_top_deck_each_turn":
        if (enemyMainData.type === effect.enemyType) {
          notes.push(
            "Efecto activo: roba la carta superior del mazo rival y añádela a tu mano"
          );
          registerEffectActivation();
        }
        break;

      case "first_before_named_attack_bonus":
        if (
          attackerSlot === "main" &&
          !ownCombatState.previousTurnAttack &&
          !ownCombatState.currentTurnAttack
        ) {
          totalDamage += effect.bonusDamage || 0;
          notes.push(`Primer ataque en partida: +${effect.bonusDamage || 0} PD`);
          registerEffectActivation();
        }
        break;

      case "bonus_if_used_consecutively":
        if (
          attackerSlot === "main" &&
          ownCombatState.consecutiveAttackName === attack.name &&
          ownCombatState.consecutiveCount >= 1
        ) {
          totalDamage += effect.bonusDamage;
          notes.push(`Ataque consecutivo: +${effect.bonusDamage} PD`);
          registerEffectActivation();
        }
        break;

      case "grant_self_damage_reduction":
        if (attackerSlot === "main") {
          setOwnCombatState((prev) => ({
            ...prev,
            damageReduction: {
              amount: effect.amount,
              turnsLeft: effect.durationTurns,
            },
          }));
          notes.push(
            `Escudo activo: -${effect.amount} PD recibidos por ${effect.durationTurns} turnos`
          );
          registerEffectActivation();
        }
        break;

      case "grant_enemy_extra_damage_taken":
        if (targetSlot === "main") {
          setEnemyCombatState((prev) => ({
            ...prev,
            extraDamageTaken: {
              amount: effect.amount,
              turnsLeft: effect.durationTurns,
            },
          }));
          notes.push(
            `Marca activa: enemigo recibe +${effect.amount} PD por ${effect.durationTurns} turnos`
          );
          registerEffectActivation();
        }
        break;

      case "enemy_type_bonus":
        if (targetType === effect.enemyType) {
          totalDamage += effect.bonusDamage;
          notes.push(`Ventaja de tipo: +${effect.bonusDamage} PD`);
          registerEffectActivation();
        }
        break;

      case "any_enemy_type_bonus":
        if (enemyMainData.type === effect.enemyType || enemySecondary?.type === effect.enemyType) {
          totalDamage += effect.bonusDamage;
          notes.push(`Ventaja de tipo: +${effect.bonusDamage} PD`);
          registerEffectActivation();
        }
        break;

      case "self_hp_below_bonus":
        if (attackerCurrentHp < effect.threshold) {
          totalDamage += effect.bonusDamage;
          notes.push(`Bono por PV bajos: +${effect.bonusDamage} PD`);
          registerEffectActivation();
        }
        break;

      case "reduce_enemy_next_attack": {
        const reductionAmount =
          targetType === effect.enemyType ? effect.typeReduction : effect.baseReduction;

        setEnemyCombatState((prev) => ({
          ...prev,
          nextAttackReduction: {
            amount: reductionAmount,
          },
        }));
        notes.push(`El próximo ataque del rival se reduce en ${reductionAmount} PD`);
        registerEffectActivation();
        break;
      }

      case "enemy_has_more_em_than_self_bonus":
        if (enemyMainEm > ownMainEm) {
          totalDamage += effect.bonusDamage;
          notes.push(`Bono por ventaja de EM rival: +${effect.bonusDamage} PD`);
          registerEffectActivation();
        }
        break;

      case "if_enemy_has_no_em_bonus":
        if (enemyMainEm <= 0) {
          totalDamage += effect.bonusDamage;
          notes.push(`Bono por rival sin EM: +${effect.bonusDamage} PD`);
          registerEffectActivation();
        }
        break;

      case "conditional_previous_turn_em":
        if (enemyCombatState.previousTurnEmPlaced) {
          totalDamage += effect.bonusDamage || 0;
          if (effect.bonusDamage) {
            notes.push(`Bono por EM ligada el turno anterior: +${effect.bonusDamage} PD`);
          }
          registerEffectActivation();
        }
        break;

      case "if_attack_defeats_secondary_self_heal":
        healOnSecondaryDefeat += effect.heal || 0;
        registerEffectActivation();
        break;

      case "grant_enemy_next_turn_bonus_damage":
        setEnemyCombatState((prev) => ({
          ...prev,
          nextAttackBonus: {
            amount: effect.amount || 0,
          },
        }));
        if ((effect.amount || 0) >= 0) {
          notes.push(`El próximo ataque del rival gana +${effect.amount || 0} PD`);
        } else {
          if (enemySecondary) {
            notes.push(
              `El próximo ataque de ${enemyMainData.name} y ${enemySecondary.name} se reducen en ${Math.abs(
                effect.amount || 0
              )} PD`
            );
          } else {
            notes.push(
              `El próximo ataque de ${enemyMainData.name} se reduce en ${Math.abs(
                effect.amount || 0
              )} PD`
            );
          }
        }
        registerEffectActivation();
        break;

      case "medusa_first_attack_or_block_em":
        if (attackerAttackCount === 0) {
          const lostOnSummon = Math.floor((attackerSecondary?.maxHp || 0) / 2);
          selfHeal += lostOnSummon;
          notes.push(`Primer ataque de Medusa: +${lostOnSummon} PV`);
        } else {
          blockEnemyEmTurns = 1;
          notes.push("El rival no podrá ligar EM en su próximo turno");
        }
        registerEffectActivation();
        break;

      case "poison_until_secondary_leaves":
        setEnemyCombatState((prev) => ({
          ...prev,
          poisonPerTurn: {
            amount: effect.amount || 0,
            sourceSecondaryId: attackerSecondary?.id || null,
          },
        }));
        notes.push(`Veneno activo: ${effect.amount || 0} PV por turno`);
        registerEffectActivation();
        break;

      case "prismara_first_attack_or_draw":
        if (attackerAttackCount === 0) {
          selfHeal += effect.heal || 0;
          notes.push(`Primer ataque de Prismara: +${effect.heal || 0} PV`);
          registerEffectActivation();
        }
        break;

      case "grant_main_damage_reduction_if_enemy_type":
        if (targetType === effect.enemyType) {
          setOwnCombatState((prev) => ({
            ...prev,
            damageReduction: {
              amount: effect.amount,
              turnsLeft: 1,
            },
          }));
          notes.push(`Tu avatar principal reduce ${effect.amount} PD del próximo ataque`);
          registerEffectActivation();
        }
        break;

      case "bonus_next_time_if_hits_main_multiversal":
        if (targetSlot === "main" && enemyMainData.type === "Multiversal") {
          setOwnCombatState((prev) => ({
            ...prev,
            pendingAttackBonuses: {
              ...prev.pendingAttackBonuses,
              [attack.name]: (prev.pendingAttackBonuses?.[attack.name] || 0) + (effect.bonusDamage || 0),
            },
          }));
          notes.push(`La próxima vez ${attack.name} gana +${effect.bonusDamage || 0} PD`);
          registerEffectActivation();
        }
        break;

      case "bonus_if_own_secondary_type_is":
        if (attackerSecondary?.type === effect.secondaryType) {
          totalDamage += effect.bonusDamage;
          notes.push(`Bono por avatar secundario: +${effect.bonusDamage} PD`);
          registerEffectActivation();
        }
        break;

      case "if_enemy_has_energy_or_chance_bonus_and_heal":
        if (enemyAnyAvatarEm > 0) {
          totalDamage += effect.bonusDamage || 0;
          selfHeal += effect.heal || 0;
          if (effect.bonusDamage) {
            notes.push(`Bono por EM enemiga: +${effect.bonusDamage} PD`);
          }
          if (effect.heal) {
            notes.push(`Efecto activo: +${effect.heal} PV`);
          }
          registerEffectActivation();
        }
        break;

      case "remove_enemy_em": {
        const amountToRemove = Math.min(enemyMainEm, effect.amount || 0);
        if (amountToRemove > 0) {
          if (isPlayer1) {
            setPlayer2Em((prev) => Math.max(0, prev - amountToRemove));
          } else {
            setPlayer1Em((prev) => Math.max(0, prev - amountToRemove));
          }
          notes.push(`El rival pierde ${amountToRemove} EM`);
          registerEffectActivation();
        }
        break;
      }

      case "gain_self_em":
        if ((effect.amount || 0) > 0) {
          adjustPlayerSlotEm(attackerId, attackerSlot, effect.amount || 0);
          notes.push(`Recupera +${effect.amount} EM`);
          registerEffectActivation();
        }
        break;

      default:
        notes.push("Efecto especial pendiente");
        break;
    }
  };

  if (targetSlot === "main" && enemyCombatState.extraDamageTaken.turnsLeft > 0) {
    totalDamage += enemyCombatState.extraDamageTaken.amount;
    notes.push(`Marca activa: +${enemyCombatState.extraDamageTaken.amount} PD`);
    registerEffectActivation();
  }

  if (ownCombatState.nextAttackBonus.amount !== 0) {
    totalDamage += ownCombatState.nextAttackBonus.amount;
    if (ownCombatState.nextAttackBonus.amount > 0) {
      notes.push(`Bono del próximo ataque: +${ownCombatState.nextAttackBonus.amount} PD`);
    } else {
      notes.push(
        `Efecto de Hella Mogarth activo, ataque con -${Math.abs(
          ownCombatState.nextAttackBonus.amount
        )} PD`
      );
    }
    setOwnCombatState((prev) => ({
      ...prev,
      nextAttackBonus: {
        amount: 0,
      },
    }));
    registerEffectActivation();
  }

  const storedAttackBonus = ownCombatState.pendingAttackBonuses?.[attack.name] || 0;
  if (storedAttackBonus > 0) {
    totalDamage += storedAttackBonus;
    notes.push(`Bono almacenado: +${storedAttackBonus} PD`);
    setOwnCombatState((prev) => ({
      ...prev,
      pendingAttackBonuses: {
        ...prev.pendingAttackBonuses,
        [attack.name]: 0,
      },
    }));
    registerEffectActivation();
  }

  if (
    attackerSlot === "secondary" &&
    attackerSecondary?.firstAttackBonusPending > 0 &&
    (attackerSecondary.attackCount || 0) === 0
  ) {
    totalDamage += attackerSecondary.firstAttackBonusPending;
    notes.push(`Primer ataque tras invocación: +${attackerSecondary.firstAttackBonusPending} PD`);
    setOwnSecondary((prev) =>
      prev
        ? {
            ...prev,
            firstAttackBonusPending: 0,
          }
        : prev
    );
    registerEffectActivation();
  }

  if (ownCombatState.nextAttackReduction.amount > 0) {
    totalDamage = Math.max(0, totalDamage - ownCombatState.nextAttackReduction.amount);
    notes.push(`Ataque reducido en ${ownCombatState.nextAttackReduction.amount} PD`);
    setOwnCombatState((prev) => ({
      ...prev,
      nextAttackReduction: {
        amount: 0,
      },
    }));
    registerEffectActivation();
  }

  processEffect(attack.effect);

  if (blockEnemyEmTurns > 0) {
    setEnemyCombatState((prev) => ({
      ...prev,
      emPlacementBlockedTurns: Math.max(prev.emPlacementBlockedTurns, blockEnemyEmTurns),
    }));
  }

  if (targetSlot === "main" && enemyCombatState.damageReduction.turnsLeft > 0) {
    totalDamage = Math.max(0, totalDamage - enemyCombatState.damageReduction.amount);
    notes.push(`Daño reducido en ${enemyCombatState.damageReduction.amount}`);
    registerEffectActivation();
  }

  if (targetSlot === "main") {
    const actualDamageDone = Math.min(totalDamage, enemyMainHp);
    const newMainHp = Math.max(0, enemyMainHp - totalDamage);
    setEnemyMainHp(newMainHp);
    if (totalDamage > 0) {
      triggerEnemyFlash("main", "damage");
      showEnemyPopup("main", `-${totalDamage} PD`, "damage");
    }
    if (actualDamageDone > 0) {
      updateBattleStatsForPlayer(attackerId, (current) => ({
        ...current,
        damageDealt: current.damageDealt + actualDamageDone,
        strongestHit: Math.max(current.strongestHit, actualDamageDone),
      }));
      const defenderId = isPlayer1 ? "player2" : "player1";
      incrementBattleStats(defenderId, { damageReceived: actualDamageDone });
    }
    if (
      blockEnemyEmIfMainHpAtOrBelow !== null &&
      newMainHp <= blockEnemyEmIfMainHpAtOrBelow
    ) {
      blockEnemyEmTurns = Math.max(blockEnemyEmTurns, 1);
      notes.push("El rival no podrá ligar EM en su próximo turno");
      registerEffectActivation();
    }
  } else if (enemySecondary) {
    if (enemySecondary.halveNextDamage) {
      totalDamage = Math.ceil(totalDamage / 2);
      notes.push("Primer daño recibido reducido a la mitad");
      setEnemySecondary((prev) =>
        prev
          ? {
              ...prev,
              halveNextDamage: false,
          }
        : prev
      );
      registerEffectActivation();
    }

    const actualDamageDone = Math.min(totalDamage, enemySecondary.currentHp);
    const newSecondaryHp = Math.max(0, enemySecondary.currentHp - totalDamage);

    if (newSecondaryHp <= 0) {
      applySecondaryExitEffects(isPlayer1 ? "player2" : "player1", enemySecondary, "defeated");
      setEnemySecondary(null);
      setEnemySecondaryTurnDisplay(null);
      setEnemyActiveSlot("main");
      setOwnCombatState((prev) =>
        prev.poisonPerTurn.sourceSecondaryId === enemySecondary.id
          ? {
              ...prev,
              poisonPerTurn: {
                amount: 0,
                sourceSecondaryId: null,
              },
            }
          : prev
      );
      addEnemyHistory(`${enemySecondary.name} fue eliminada`);
      notes.push(`${enemySecondary.name} eliminada`);
      if (healOnSecondaryDefeat > 0) {
        selfHeal += healOnSecondaryDefeat;
        notes.push(`Derrota a secundario: +${healOnSecondaryDefeat} PV`);
      }
    } else {
      setEnemySecondary((prev) => ({
        ...prev,
        currentHp: newSecondaryHp,
      }));
      if (totalDamage > 0) {
        triggerEnemyFlash("secondary", "damage");
        showEnemyPopup("secondary", `-${totalDamage} PD`, "damage");
      }
    }

    if (actualDamageDone > 0) {
      updateBattleStatsForPlayer(attackerId, (current) => ({
        ...current,
        damageDealt: current.damageDealt + actualDamageDone,
        strongestHit: Math.max(current.strongestHit, actualDamageDone),
      }));
      const defenderId = isPlayer1 ? "player2" : "player1";
      incrementBattleStats(defenderId, { damageReceived: actualDamageDone });
    }
  }

  if (selfHeal > 0) {
    incrementBattleStats(attackerId, { healingTotal: selfHeal });
    if (attackerSlot === "main") {
      const healed = Math.min(attackerMainData.hp, ownMainHp + selfHeal) - ownMainHp;
      if (healed > 0) {
        setOwnMainHp((prev) => Math.min(attackerMainData.hp, prev + selfHeal));
        triggerOwnFlash("main", "heal");
        showOwnPopup("main", `+${healed} PV`, "heal");
        notes.push(`Recupera +${healed} PV`);
      }
    } else if (attackerSecondary) {
      const healed = Math.min(attackerSecondary.maxHp, attackerSecondary.currentHp + selfHeal) - attackerSecondary.currentHp;
      if (healed > 0) {
        setOwnSecondary((prev) => ({
          ...prev,
          currentHp: Math.min(prev.maxHp, prev.currentHp + selfHeal),
        }));
        triggerOwnFlash("secondary", "heal");
        showOwnPopup("secondary", `+${healed} PV`, "heal");
        notes.push(`Recupera +${healed} PV`);
      }
    }
  }

  if (selfDamage > 0) {
    incrementBattleStats(attackerId, { damageReceived: selfDamage });
    if (attackerSlot === "main") {
      setOwnMainHp((prev) => Math.max(0, prev - selfDamage));
      triggerOwnFlash("main", "damage");
      showOwnPopup("main", `-${selfDamage} PD`, "damage");
      notes.push(`Sufre ${selfDamage} PD`);
    } else if (attackerSecondary) {
      const newHp = Math.max(0, attackerSecondary.currentHp - selfDamage);

      if (newHp <= 0) {
        applySecondaryExitEffects(attackerId, attackerSecondary, "defeated");
        setOwnSecondary(null);
        setOwnSecondaryTurnDisplay(null);
        setOwnActiveSlot("main");
        setEnemyCombatState((prev) =>
          prev.poisonPerTurn.sourceSecondaryId === attackerSecondary.id
            ? {
                ...prev,
                poisonPerTurn: {
                  amount: 0,
                  sourceSecondaryId: null,
                },
              }
            : prev
        );
        notes.push(`${attackerSecondary.name} fue eliminada`);
      } else {
        setOwnSecondary((prev) => ({
          ...prev,
          currentHp: newHp,
        }));
        triggerOwnFlash("secondary", "damage");
        showOwnPopup("secondary", `-${selfDamage} PD`, "damage");
      }

      notes.push(`Sufre ${selfDamage} PD`);
    }
  }

  if (attackCost > 0) {
    adjustPlayerSlotEm(attackerId, attackerSlot, -attackCost);
    notes.push(`-${attackCost} EM`);
  }

  setOwnAttackModifiers((prev) => {
    const next = { ...prev };
    let changed = false;
    const attackKeyPrefix = `${attackerId}:${attackerSlot}:${ownTargetName}:`;
    const attackKeySuffix = `:${attack.name}`;

    Object.keys(prev).forEach((key) => {
      if (key === attackModifierKey || (key.startsWith(attackKeyPrefix) && key.endsWith(attackKeySuffix))) {
        delete next[key];
        changed = true;
      }
    });

    if (!changed) return prev;
    return next;
  });

  if (attackerSlot === "main") {
    setOwnCombatState((prev) => {
      const sameAttack = prev.consecutiveAttackName === attack.name;

      return {
        ...prev,
        currentTurnAttack: attack.name,
        consecutiveAttackName: attack.name,
        consecutiveCount: sameAttack ? prev.consecutiveCount + 1 : 1,
      };
    });
  } else if (attackerSecondary) {
    setOwnSecondary((prev) => ({
      ...prev,
      attackCount: (prev.attackCount || 0) + 1,
    }));
  }

  if (effectActivationsTriggered > 0) {
    incrementBattleStats(attackerId, { effectsActivated: effectActivationsTriggered });
  }

  const historyText =
    notes.length > 0
      ? `${ownTargetName} - ${attack.name} sobre ${enemyTargetName}: -${totalDamage} PD | ${notes.join(" | ")}`
      : `${ownTargetName} - ${attack.name} sobre ${enemyTargetName}: -${totalDamage} PD`;

  addOwnHistory(historyText);
};

const handleSetActiveSlot = (playerId, slot) => {
  if (slot !== "main" && slot !== "secondary") return;

  if (playerId === "player1") {
    if (slot === "secondary" && !player1Secondary) return;
    if (player1ActiveSlot !== slot) {
      incrementBattleStats("player1", { switchesBetweenMainSecondary: 1 });
    }
    setPlayer1ActiveSlot(slot);
  } else {
    if (slot === "secondary" && !player2Secondary) return;
    if (player2ActiveSlot !== slot) {
      incrementBattleStats("player2", { switchesBetweenMainSecondary: 1 });
    }
    setPlayer2ActiveSlot(slot);
  }
};

const applySecondaryExitEffects = (ownerId, secondary, reason = "removed") => {
  if (!secondary) return;

  const setOwnHistory = ownerId === "player1" ? setPlayer1History : setPlayer2History;
  const setEnemyHistory = ownerId === "player1" ? setPlayer2History : setPlayer1History;
  const setEnemyCombatState = ownerId === "player1" ? setPlayer2CombatState : setPlayer1CombatState;

  if (secondary.id === "medusa") {
    setEnemyCombatState((prev) => ({
      ...prev,
      attackBlockedTurns: Math.max(prev.attackBlockedTurns || 0, 1),
    }));
    setOwnHistory((prev) => [
      `Salida de ${secondary.name}: el rival queda paralizado 1 turno`,
      ...prev.slice(0, 5),
    ]);
    setEnemyHistory((prev) => [
      `${secondary.name} salió de juego: no puedes atacar durante 1 turno`,
      ...prev.slice(0, 5),
    ]);
  }

  if (secondary.id === "prismara" && reason !== "expired") {
    setOwnHistory((prev) => [
      `${secondary.name} salió antes de tiempo: roba 2 cartas`,
      ...prev.slice(0, 5),
    ]);
  }

  if (secondary.id === "karessa" && reason === "expired" && (secondary.currentEm || 0) > 0) {
    setOwnHistory((prev) => [
      `${secondary.name} abandona la partida: 1 EM ligada regresa a tu mano`,
      ...prev.slice(0, 5),
    ]);
  }

  if (secondary.id === "necrondra") {
    setOwnHistory((prev) => [
      `${secondary.name} abandona la partida: roba 1 carta`,
      ...prev.slice(0, 5),
    ]);
  }
};

const applySecondarySummonEffects = (ownerId, secondary) => {
  if (!secondary) return;

  const isPlayer1 = ownerId === "player1";
  const setOwnHistory = isPlayer1 ? setPlayer1History : setPlayer2History;
  const setEnemyHistory = isPlayer1 ? setPlayer2History : setPlayer1History;
  const setEnemyMainHp = isPlayer1 ? setPlayer2Hp : setPlayer1Hp;
  const enemyMainHp = isPlayer1 ? player2Hp : player1Hp;
  const setEnemyMainFlash = isPlayer1 ? setPlayer2MainHpFlash : setPlayer1MainHpFlash;
  const setEnemyCombatState = isPlayer1 ? setPlayer2CombatState : setPlayer1CombatState;

  if (secondary.id === "prismara") {
    const summonDamage = 40;
    setEnemyMainHp((prev) => Math.max(0, prev - summonDamage));
    triggerFlash(setEnemyMainFlash, "damage");
    setOwnHistory((prev) => [
      `${secondary.name} entra en juego: inflige ${summonDamage} PD al avatar principal rival`,
      ...prev.slice(0, 5),
    ]);
    setEnemyHistory((prev) => [
      `${secondary.name} entra en juego: recibes ${summonDamage} PD`,
      ...prev.slice(0, 5),
    ]);
  }

  if (secondary.id === "medusa") {
    setEnemyCombatState((prev) => ({
      ...prev,
      attackBlockedTurns: Math.max(prev.attackBlockedTurns || 0, 1),
    }));
    setOwnHistory((prev) => [
      `${secondary.name} entra en juego: el rival queda paralizado 1 turno`,
      ...prev.slice(0, 5),
    ]);
    setEnemyHistory((prev) => [
      `${secondary.name} entra en juego: no puedes atacar durante 1 turno`,
      ...prev.slice(0, 5),
    ]);
  }

  if (secondary.id === "karessa") {
    setOwnHistory((prev) => [
      `${secondary.name} entra en juego: puedes ligar 1 EM adicional desde tu mano`,
      ...prev.slice(0, 5),
    ]);
  }

  if (secondary.id === "hella") {
    setEnemyHistory((prev) => [
      `${secondary.name} entra en juego: descarta 1 carta al azar de tu mano`,
      ...prev.slice(0, 5),
    ]);
  }

  if (secondary.id === "necrondra") {
    setOwnHistory((prev) => [
      `${secondary.name} entra en juego: mira la mano rival y descarta 1 carta`,
      ...prev.slice(0, 5),
    ]);
  }

  if (secondary.id === "valdrea") {
    setOwnHistory((prev) => [
      `${secondary.name} entra en juego: las cartas en juego se anulan hasta el próximo turno`,
      ...prev.slice(0, 5),
    ]);
    setEnemyHistory((prev) => [
      `${secondary.name} entra en juego: las cartas en juego se anulan hasta el próximo turno`,
      ...prev.slice(0, 5),
    ]);
  }
};

const handleConfirmSecondarySummon = () => {
  if (!selectedSecondaryId || !secondaryModalPlayer) return;

  const avatar = getSecondaryAvatarData(selectedSecondaryId);
  if (!avatar) return;
  pushBattleHistorySnapshot();

  const summonedAvatar = {
    ...avatar,
    currentHp: Math.floor(avatar.hp / 2),
    currentEm: 0,
    maxHp: avatar.hp,
    turnsRemaining: avatar.turnsDuration,
    attackCount: 0,
    isActive: false,
    hasEntered: true,
    halveNextDamage: avatar.id === "medusa",
    firstAttackBonusPending: avatar.id === "karessa" ? 20 : 0,
    extendedTurnsApplied: false,
  };

  if (secondaryModalPlayer === "player1") {
    if (secondaryTurnTimeoutRef.current.player1) {
      clearTimeout(secondaryTurnTimeoutRef.current.player1);
      secondaryTurnTimeoutRef.current.player1 = null;
    }
    setPlayer1Secondary(summonedAvatar);
    updateBattleStatsForPlayer("player1", (current) => ({
      ...current,
      secondarySummonedName: avatar.name,
      secondarySummonTurn: turn,
      secondaryTurnsSurvived: 0,
    }));
    setPlayer1SecondaryPanelVisible(true);
    setPlayer1SecondaryTurnDisplay(summonedAvatar.turnsRemaining);
    setPlayer1ActiveSlot("main");
    setPlayer1History((prev) => [
      `${avatar.name} invocada con ${summonedAvatar.currentHp} PV`,
      ...prev.slice(0, 5),
    ]);
    applySecondarySummonEffects("player1", summonedAvatar);
  } else {
    if (secondaryTurnTimeoutRef.current.player2) {
      clearTimeout(secondaryTurnTimeoutRef.current.player2);
      secondaryTurnTimeoutRef.current.player2 = null;
    }
    setPlayer2Secondary(summonedAvatar);
    updateBattleStatsForPlayer("player2", (current) => ({
      ...current,
      secondarySummonedName: avatar.name,
      secondarySummonTurn: turn,
      secondaryTurnsSurvived: 0,
    }));
    setPlayer2SecondaryPanelVisible(true);
    setPlayer2SecondaryTurnDisplay(summonedAvatar.turnsRemaining);
    setPlayer2ActiveSlot("main");
    setPlayer2History((prev) => [
      `${avatar.name} invocada con ${summonedAvatar.currentHp} PV`,
      ...prev.slice(0, 5),
    ]);
    applySecondarySummonEffects("player2", summonedAvatar);
  }

  handleCloseSecondaryModal();
};

const gameOver = winner !== null;

const player1TurnActive =
  gameStarted &&
  !gameOver &&
  (startingPlayer === null || currentTurnPlayer === "player1");

const player2TurnActive =
  gameStarted &&
  !gameOver &&
  (startingPlayer === null || currentTurnPlayer === "player2");


const handleRandomAvatars = () => {
  if (gameStarted || isRouletteActive) return;

  setShowQuickStartButton(false);

  rouletteRevealTimeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
  rouletteRevealTimeoutsRef.current = [];
  setRouletteRevealPlayer1(false);
  setRouletteRevealPlayer2(false);

  // Generate final random indices with guaranteed uniqueness
  const availableIndices = Array.from({ length: AVATAR_OPTIONS.length }, (_, i) => i);
  const selectedIndices = [];
  for (let i = 0; i < 2; i++) {
    const randomIndex = Math.floor(Math.random() * availableIndices.length);
    selectedIndices.push(availableIndices.splice(randomIndex, 1)[0]);
  }
  finalIndicesRef.current = selectedIndices;

  // Start roulette animation
  setIsRouletteActive(true);
  setRoulettePlayer1Index(0);
  setRoulettePlayer2Index(0);

  // Start interval to change images rapidly with different patterns
  rouletteIntervalRef.current = setInterval(() => {
    setRoulettePlayer1Index(prev => (prev + 1) % AVATAR_OPTIONS.length);
    setRoulettePlayer2Index(prev => (prev + AVATAR_OPTIONS.length - 1) % AVATAR_OPTIONS.length); // Opposite direction
  }, 100); // Change every 100ms

  // Stop animation after 1.5 seconds and apply final values
  setTimeout(() => {
    stopRouletteAndApply();
  }, 1500);
};

const stopRouletteAndApply = () => {
  if (rouletteIntervalRef.current) {
    clearInterval(rouletteIntervalRef.current);
    rouletteIntervalRef.current = null;
  }

  // Usar los índices almacenados en el ref local
  const [finalIndex1, finalIndex2] = finalIndicesRef.current;
  const avatar1 = AVATAR_OPTIONS[finalIndex1];
  const avatar2 = AVATAR_OPTIONS[finalIndex2];
  setRoulettePlayer1Index(finalIndex1);
  setRoulettePlayer2Index(finalIndex2);

  rouletteRevealTimeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
  rouletteRevealTimeoutsRef.current = [];

  setRouletteRevealPlayer2(true);

  const revealBlueTimeout = setTimeout(() => {
    setPlayer2Name(avatar2.name);
    setPlayer2BaseHp(avatar2.hp);
    setPlayer2Hp(avatar2.hp);
  }, 140);

  const switchRevealTimeout = setTimeout(() => {
    setRouletteRevealPlayer2(false);
    setRouletteRevealPlayer1(true);
  }, 340);

  const revealRedTimeout = setTimeout(() => {
    setPlayer1Name(avatar1.name);
    setPlayer1BaseHp(avatar1.hp);
    setPlayer1Hp(avatar1.hp);
  }, 500);

  const finishRouletteTimeout = setTimeout(() => {
    setRouletteRevealPlayer1(false);
    setIsRouletteActive(false);
    setPlayer1Confirmed(false);
    setPlayer2Confirmed(false);
    setPlayer1History([`${avatar1.name} seleccionado aleatoriamente`]);
    setPlayer2History([`${avatar2.name} seleccionado aleatoriamente`]);
    rouletteRevealTimeoutsRef.current = [];
  }, 760);

  rouletteRevealTimeoutsRef.current = [
    revealBlueTimeout,
    switchRevealTimeout,
    revealRedTimeout,
    finishRouletteTimeout,
  ];
};

const handlePlayerReady = (playerId) => {
  if (gameStarted) return;

  if (playerId === "player1") {
    setPlayer1Confirmed(true);
    if (player2Confirmed) {
      setShowStartMatchModal(true);
    }
  } else {
    setPlayer2Confirmed(true);
    if (player1Confirmed) {
      setShowStartMatchModal(true);
    }
  }
};

const handleChooseOtherAvatar = (playerId) => {
  if (gameStarted) return;

  setShowStartMatchModal(false);
  setShowQuickStartButton(false);

  if (playerId === "player1") {
    setPlayer1Confirmed(false);
  } else {
    setPlayer2Confirmed(false);
  }
};

const handleStartMatch = () => {
  setShowStartMatchModal(false);
  setShowQuickStartButton(false);
  setIsLaunchingBattleFromModal(true);
  setIsBattleIntroStaging(true);
  setBattleIntroRevealPlayer1(false);
  setBattleIntroRevealPlayer2(false);
  clearBattleEndSequence();

  if (battleStartLaunchTimeoutRef.current) {
    clearTimeout(battleStartLaunchTimeoutRef.current);
  }
  battleIntroTimeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
  battleIntroTimeoutsRef.current = [];

  battleStartLaunchTimeoutRef.current = setTimeout(() => {
    setGameStarted(true);
    setTurn(1);
    setStartingPlayer(null);
    setCurrentTurnPlayer(null);
    setWinner(null);
    setLatestChronicleEntry(null);
    setBattleStats(createBattleStatsState(player1Name, player2Name));
    setElapsedSeconds(0);
    setTimerRunning(true);
    clearBattleHistory();
    setIsLaunchingBattleFromModal(false);
    battleStartLaunchTimeoutRef.current = null;

    const revealBlueTimeout = setTimeout(() => {
      setBattleIntroRevealPlayer2(true);
    }, 120);

    const revealRedTimeout = setTimeout(() => {
      setBattleIntroRevealPlayer1(true);
    }, 420);

    const finishIntroTimeout = setTimeout(() => {
      setIsBattleIntroStaging(false);
      battleIntroTimeoutsRef.current = [];
    }, 920);

    battleIntroTimeoutsRef.current = [
      revealBlueTimeout,
      revealRedTimeout,
      finishIntroTimeout,
    ];
  }, 980);
};

const handleBackFromStartModal = () => {
  setShowStartMatchModal(false);
  setShowQuickStartButton(true);
};

const handleBattleExitRequest = () => {
  if (isBattleEndSequenceActive) return;

  if (!gameStarted) {
    resetGameState();
    navigateWithTransition("home");
    return;
  }

  setShowExitConfirm(true);
};

const navigateWithTransition = (nextScreen) => {
  setScreenVisible(false);

  setTimeout(() => {
    setScreen(nextScreen);
    setScreenVisible(true);
  }, 250);
};

  const handlePassTurn = (playerId) => {
  if (!gameStarted || gameOver) return;

  const closeOwnTurnState = (ownerId) => {
    const combatState =
      ownerId === "player1" ? player1CombatState : player2CombatState;
    if ((combatState.attackBlockedTurns || 0) > 0) {
      incrementBattleStats(ownerId, { attackBlockedCount: 1 });
    }
    if ((combatState.emPlacementBlockedTurns || 0) > 0) {
      incrementBattleStats(ownerId, { emBlockedCount: 1 });
    }
    const setCombatState = ownerId === "player1" ? setPlayer1CombatState : setPlayer2CombatState;

    setCombatState((prev) => ({
      ...prev,
      previousTurnAttack: prev.currentTurnAttack,
      currentTurnAttack: null,
      previousTurnEmPlaced: prev.currentTurnEmPlaced,
      currentTurnEmPlaced: false,
      attackBlockedTurns: Math.max(0, (prev.attackBlockedTurns || 0) - 1),
      emPlacementBlockedTurns: Math.max(0, (prev.emPlacementBlockedTurns || 0) - 1),
    }));
  };

  const applyPoisonTick = (ownerId) => {
    const poisonState = ownerId === "player1" ? player1CombatState.poisonPerTurn : player2CombatState.poisonPerTurn;
    if (!poisonState?.amount || poisonState.amount <= 0) return;

    const sourceSecondary =
      ownerId === "player1" ? player2Secondary : player1Secondary;

    if (!sourceSecondary || sourceSecondary.id !== poisonState.sourceSecondaryId) {
      const setCombatState = ownerId === "player1" ? setPlayer1CombatState : setPlayer2CombatState;
      setCombatState((prev) => ({
        ...prev,
        poisonPerTurn: {
          amount: 0,
          sourceSecondaryId: null,
        },
      }));
      return;
    }

    const setHp = ownerId === "player1" ? setPlayer1Hp : setPlayer2Hp;
    const setFlash = ownerId === "player1" ? setPlayer1MainHpFlash : setPlayer2MainHpFlash;
    const setHistory = ownerId === "player1" ? setPlayer1History : setPlayer2History;

    setHp((prev) => Math.max(0, prev - poisonState.amount));
    incrementBattleStats(ownerId, { damageReceived: poisonState.amount });
    triggerFlash(setFlash, "damage");
    setHistory((prev) => [
      `Veneno activo: -${poisonState.amount} PV`,
      ...prev.slice(0, 5),
    ]);
  };

  const decrementSecondaryTurns = (ownerId) => {
    if (ownerId === "player1" && player1Secondary) {
      incrementBattleStats("player1", { secondaryTurnsSurvived: 1 });
      const nextTurns = player1Secondary.turnsRemaining - 1;

      if (nextTurns <= 0) {
        if (player1Secondary.id === "hella" && !player1Secondary.extendedTurnsApplied) {
          setPlayer1Secondary((prev) => ({
            ...prev,
            turnsRemaining: 2,
            extendedTurnsApplied: true,
          }));
          setPlayer1SecondaryTurnDisplay(2);
          setPlayer1History((prev) => [
            `${player1Secondary.name} permanece 2 turnos más`,
            ...prev.slice(0, 5),
          ]);
          return;
        }
        if (player1Secondary.id === "medusa") {
          setPlayer2CombatState((prev) => ({
            ...prev,
            poisonPerTurn: {
              amount: 0,
              sourceSecondaryId: null,
            },
          }));
        }
        applySecondaryExitEffects("player1", player1Secondary, "expired");
        setPlayer1Secondary(null);
        showExpiredSecondaryTurn("player1");
        setPlayer1ActiveSlot("main");
        setPlayer1History((prev) => [
          `${player1Secondary.name} salió de juego`,
          ...prev.slice(0, 5),
        ]);
      } else {
        setPlayer1Secondary((prev) => ({
          ...prev,
          turnsRemaining: nextTurns,
        }));
        setPlayer1SecondaryTurnDisplay(nextTurns);
      }
    }

    if (ownerId === "player2" && player2Secondary) {
      incrementBattleStats("player2", { secondaryTurnsSurvived: 1 });
      const nextTurns = player2Secondary.turnsRemaining - 1;

      if (nextTurns <= 0) {
        if (player2Secondary.id === "hella" && !player2Secondary.extendedTurnsApplied) {
          setPlayer2Secondary((prev) => ({
            ...prev,
            turnsRemaining: 2,
            extendedTurnsApplied: true,
          }));
          setPlayer2SecondaryTurnDisplay(2);
          setPlayer2History((prev) => [
            `${player2Secondary.name} permanece 2 turnos más`,
            ...prev.slice(0, 5),
          ]);
          return;
        }
        if (player2Secondary.id === "medusa") {
          setPlayer1CombatState((prev) => ({
            ...prev,
            poisonPerTurn: {
              amount: 0,
              sourceSecondaryId: null,
            },
          }));
        }
        applySecondaryExitEffects("player2", player2Secondary, "expired");
        setPlayer2Secondary(null);
        showExpiredSecondaryTurn("player2");
        setPlayer2ActiveSlot("main");
        setPlayer2History((prev) => [
          `${player2Secondary.name} salió de juego`,
          ...prev.slice(0, 5),
        ]);
      } else {
        setPlayer2Secondary((prev) => ({
          ...prev,
          turnsRemaining: nextTurns,
        }));
        setPlayer2SecondaryTurnDisplay(nextTurns);
      }
    }
  };

  if (startingPlayer === null) {
    pushBattleHistorySnapshot();
    const otherPlayer = playerId === "player1" ? "player2" : "player1";
    closeOwnTurnState(playerId);
    applyPoisonTick(playerId);
    decrementSecondaryTurns(playerId);
    setStartingPlayer(playerId);
    setCurrentTurnPlayer(otherPlayer);
    return;
  }

  if (currentTurnPlayer !== playerId) return;

  pushBattleHistorySnapshot();
  closeOwnTurnState(playerId);
  applyPoisonTick(playerId);
  decrementSecondaryTurns(playerId);

  if (playerId === startingPlayer) {
    const otherPlayer = playerId === "player1" ? "player2" : "player1";
    setCurrentTurnPlayer(otherPlayer);
  } else {
    setTurn((prev) => prev + 1);
    setCurrentTurnPlayer(startingPlayer);
  }
};

const handleRequestResetHp = (playerId) => {
  setResetTargetPlayer(playerId);
  setShowResetHpConfirm(true);
};

const handleRequestAdjustHp = (playerId, slot = "main") => {
  setAdjustTargetPlayer(playerId);
  setAdjustTargetSlot(slot);
  setAdjustMode("-");
  setAdjustValue("");
  setShowAdjustHpModal(true);
};

const getAdjustedAttackDamage = (playerId, slot, avatarName, attack) => {
  if (!attack) return 0;
  const modifiers = playerId === "player1" ? player1AttackModifiers : player2AttackModifiers;
  const key = getAttackModifierKey(playerId, slot, avatarName, attack.name);
  return Math.max(0, (attack.damage || 0) + (modifiers[key] || 0));
};

const getAdjustAttackOperator = () => (adjustAttackMode === "+" ? "+" : "-");

const getAdjustAttackComputedAmount = () => {
  const operator = getAdjustAttackOperator();
  const rawValue = String(adjustAttackValue || "");
  const cleanedValue =
    operator === "+"
      ? rawValue.replace(/[^0-9+]/g, "")
      : rawValue.replace(/[^0-9-]/g, "");

  if (!cleanedValue) return 0;

  return cleanedValue
    .split(operator)
    .filter(Boolean)
    .reduce((total, part) => total + (Number.parseInt(part, 10) || 0), 0);
};

const getPreviewAdjustedAttackDamage = () => {
  if (!adjustAttackPlayer || !adjustAttackName || !adjustAttackAvatarName) {
    return adjustAttackBaseDamage || 0;
  }

  const modifiers =
    adjustAttackPlayer === "player1" ? player1AttackModifiers : player2AttackModifiers;
  const key = getAttackModifierKey(
    adjustAttackPlayer,
    adjustAttackSlot,
    adjustAttackAvatarName,
    adjustAttackName
  );
  const currentValue = modifiers[key] || 0;
  const amount = getAdjustAttackComputedAmount();
  const nextModifier =
    adjustAttackMode === "+"
      ? currentValue + amount
      : Math.max(-adjustAttackBaseDamage, currentValue - amount);

  return Math.max(0, (adjustAttackBaseDamage || 0) + nextModifier);
};

const handleRequestAdjustAttack = (playerId, attack, slot = "main", avatarName = "") => {
  if (!attack) return;
  setAdjustAttackPlayer(playerId);
  setAdjustAttackSlot(slot);
  setAdjustAttackAvatarName(avatarName);
  setAdjustAttackName(attack.name);
  setAdjustAttackBaseDamage(attack.damage || 0);
  setAdjustAttackMode("+");
  setAdjustAttackValue("");
  setShowAdjustAttackModal(true);
};

const handleApplyAdjustAttack = () => {
  const amount = getAdjustAttackComputedAmount();
  if (!amount || amount <= 0 || !adjustAttackPlayer || !adjustAttackName || !adjustAttackAvatarName) return;
  stopAdjustAttackClearHold();
  attackAdjustClearTriggeredRef.current = false;
  pushBattleHistorySnapshot();
  incrementBattleStats(adjustAttackPlayer, { manualPdAdjustments: 1 });

  const setModifiers =
    adjustAttackPlayer === "player1" ? setPlayer1AttackModifiers : setPlayer2AttackModifiers;
  const setHistory = adjustAttackPlayer === "player1" ? setPlayer1History : setPlayer2History;
  const key = getAttackModifierKey(
    adjustAttackPlayer,
    adjustAttackSlot,
    adjustAttackAvatarName,
    adjustAttackName
  );

  setModifiers((prev) => {
    const currentValue = prev[key] || 0;
    const nextValue =
      adjustAttackMode === "+"
        ? currentValue + amount
        : Math.max(-adjustAttackBaseDamage, currentValue - amount);

    return {
      ...prev,
      [key]: nextValue,
    };
  });

  setHistory((prev) => [
    `Ajuste manual a ${adjustAttackName}: ${adjustAttackMode}${amount} PD`,
    ...prev.slice(0, 5),
  ]);

  setShowAdjustAttackModal(false);
  setAdjustAttackPlayer(null);
  setAdjustAttackSlot("main");
  setAdjustAttackAvatarName("");
  setAdjustAttackName("");
  setAdjustAttackBaseDamage(0);
  setAdjustAttackMode("+");
  setAdjustAttackValue("");
};

const handleCloseAdjustAttack = () => {
  stopAdjustAttackClearHold();
  attackAdjustClearTriggeredRef.current = false;
  setShowAdjustAttackModal(false);
  setAdjustAttackPlayer(null);
  setAdjustAttackSlot("main");
  setAdjustAttackAvatarName("");
  setAdjustAttackName("");
  setAdjustAttackBaseDamage(0);
  setAdjustAttackMode("+");
  setAdjustAttackValue("");
};

const handleAdjustAttackDigit = (digit) => {
  setAdjustAttackValue((prev) => {
    const current = String(prev || "");
    if (current === "0") return String(digit);
    return `${current}${digit}`;
  });
};

const handleAdjustAttackOperator = () => {
  const operator = getAdjustAttackOperator();
  setAdjustAttackValue((prev) => {
    const current = String(prev || "");
    if (!/\d$/.test(current)) return current;
    return `${current}${operator}`;
  });
};

const handleAdjustAttackBackspace = () => {
  if (attackAdjustClearTriggeredRef.current) {
    attackAdjustClearTriggeredRef.current = false;
    return;
  }

  setAdjustAttackValue((prev) => String(prev || "").slice(0, -1));
};

const handleClearAdjustAttackValue = () => {
  setAdjustAttackValue("");
};

const startAdjustAttackClearHold = () => {
  if (attackAdjustClearHoldRef.current) {
    clearTimeout(attackAdjustClearHoldRef.current);
  }

  attackAdjustClearTriggeredRef.current = false;
  attackAdjustClearHoldRef.current = setTimeout(() => {
    attackAdjustClearTriggeredRef.current = true;
    handleClearAdjustAttackValue();
    attackAdjustClearHoldRef.current = null;
  }, 450);
};

const stopAdjustAttackClearHold = () => {
  if (attackAdjustClearHoldRef.current) {
    clearTimeout(attackAdjustClearHoldRef.current);
    attackAdjustClearHoldRef.current = null;
  }
};

const handleApplyAdjustHp = () => {
  const amount = Number.parseInt(String(adjustValue).trim(), 10);

  if (!amount || amount <= 0 || !adjustTargetPlayer) return;
  pushBattleHistorySnapshot();
  incrementBattleStats(adjustTargetPlayer, { manualHpAdjustments: 1 });

  if (adjustTargetPlayer === "player1") {
    if (adjustTargetSlot === "secondary" && player1Secondary) {
      if (adjustMode === "+") {
        const newHp = Math.min(player1Secondary.maxHp, player1Secondary.currentHp + amount);
        const healed = newHp - player1Secondary.currentHp;

        if (healed > 0) {
          setPlayer1Secondary((prev) => ({
            ...prev,
            currentHp: newHp,
          }));
          triggerFlash(setPlayer1SecondaryHpFlash, "heal");
          showHpPopup(setPlayer1SecondaryHpPopup, `+${healed} PV`, "heal");
          setPlayer1History((prev) => [
            `Ajuste manual a ${player1Secondary.name}: +${healed} PV`,
            ...prev.slice(0, 5),
          ]);
        }
      } else {
        const newHp = Math.max(0, player1Secondary.currentHp - amount);
        const damageDone = player1Secondary.currentHp - newHp;

        if (damageDone > 0) {
          if (newHp <= 0) {
            applySecondaryExitEffects("player1", player1Secondary, "defeated");
            setPlayer1Secondary(null);
            setPlayer1SecondaryTurnDisplay(null);
            setPlayer1ActiveSlot("main");
            setPlayer1History((prev) => [
              `${player1Secondary.name} fue eliminada por ajuste manual`,
              ...prev.slice(0, 5),
            ]);
          } else {
            setPlayer1Secondary((prev) => ({
              ...prev,
              currentHp: newHp,
            }));
            showHpPopup(setPlayer1SecondaryHpPopup, `-${damageDone} PD`, "damage");
            setPlayer1History((prev) => [
              `Ajuste manual a ${player1Secondary.name}: -${damageDone} PD`,
              ...prev.slice(0, 5),
            ]);
          }

          triggerFlash(setPlayer1SecondaryHpFlash, "damage");
        }
      }
    } else if (adjustMode === "+") {
      const newHp = Math.min(player1BaseHp, player1Hp + amount);
      const healed = newHp - player1Hp;

      if (healed > 0) {
        setPlayer1Hp(newHp);
        triggerFlash(setPlayer1MainHpFlash, "heal");
        showHpPopup(setPlayer1MainHpPopup, `+${healed} PV`, "heal");
        setPlayer1History((prev) => [`Ajuste manual: +${healed} PV`, ...prev.slice(0, 5)]);
      }
    } else {
      const newHp = Math.max(0, player1Hp - amount);
      const damageDone = player1Hp - newHp;

      if (damageDone > 0) {
        setPlayer1Hp(newHp);
        triggerFlash(setPlayer1MainHpFlash, "damage");
        showHpPopup(setPlayer1MainHpPopup, `-${damageDone} PD`, "damage");
        setPlayer1History((prev) => [`Ajuste manual: -${damageDone} PD`, ...prev.slice(0, 5)]);
      }
    }
  }

  if (adjustTargetPlayer === "player2") {
    if (adjustTargetSlot === "secondary" && player2Secondary) {
      if (adjustMode === "+") {
        const newHp = Math.min(player2Secondary.maxHp, player2Secondary.currentHp + amount);
        const healed = newHp - player2Secondary.currentHp;

        if (healed > 0) {
          setPlayer2Secondary((prev) => ({
            ...prev,
            currentHp: newHp,
          }));
          triggerFlash(setPlayer2SecondaryHpFlash, "heal");
          showHpPopup(setPlayer2SecondaryHpPopup, `+${healed} PV`, "heal");
          setPlayer2History((prev) => [
            `Ajuste manual a ${player2Secondary.name}: +${healed} PV`,
            ...prev.slice(0, 5),
          ]);
        }
      } else {
        const newHp = Math.max(0, player2Secondary.currentHp - amount);
        const damageDone = player2Secondary.currentHp - newHp;

        if (damageDone > 0) {
          if (newHp <= 0) {
            applySecondaryExitEffects("player2", player2Secondary, "defeated");
            setPlayer2Secondary(null);
            setPlayer2SecondaryTurnDisplay(null);
            setPlayer2ActiveSlot("main");
            setPlayer2History((prev) => [
              `${player2Secondary.name} fue eliminada por ajuste manual`,
              ...prev.slice(0, 5),
            ]);
          } else {
            setPlayer2Secondary((prev) => ({
              ...prev,
              currentHp: newHp,
            }));
            showHpPopup(setPlayer2SecondaryHpPopup, `-${damageDone} PD`, "damage");
            setPlayer2History((prev) => [
              `Ajuste manual a ${player2Secondary.name}: -${damageDone} PD`,
              ...prev.slice(0, 5),
            ]);
          }

          triggerFlash(setPlayer2SecondaryHpFlash, "damage");
        }
      }
    } else if (adjustMode === "+") {
      const newHp = Math.min(player2BaseHp, player2Hp + amount);
      const healed = newHp - player2Hp;

      if (healed > 0) {
        setPlayer2Hp(newHp);
        triggerFlash(setPlayer2MainHpFlash, "heal");
        showHpPopup(setPlayer2MainHpPopup, `+${healed} PV`, "heal");
        setPlayer2History((prev) => [`Ajuste manual: +${healed} PV`, ...prev.slice(0, 5)]);
      }
    } else {
      const newHp = Math.max(0, player2Hp - amount);
      const damageDone = player2Hp - newHp;

      if (damageDone > 0) {
        setPlayer2Hp(newHp);
        triggerFlash(setPlayer2MainHpFlash, "damage");
        showHpPopup(setPlayer2MainHpPopup, `-${damageDone} PD`, "damage");
        setPlayer2History((prev) => [`Ajuste manual: -${damageDone} PD`, ...prev.slice(0, 5)]);
      }
    }
  }

  setHpSyncRequest({
    playerId: adjustTargetPlayer,
    slot: adjustTargetSlot,
    tick: Date.now(),
  });
  setShowAdjustHpModal(false);
  setShowAdjustAttackModal(false);
  setAdjustTargetPlayer(null);
  setAdjustTargetSlot("main");
  setAdjustValue("");
};

const handleCloseAdjustHp = () => {
  setShowAdjustHpModal(false);
  setAdjustTargetPlayer(null);
  setAdjustTargetSlot("main");
  setAdjustValue("");
};

const handleConfirmResetHp = () => {
  if (!resetTargetPlayer) return;
  pushBattleHistorySnapshot();
  if (resetTargetPlayer === "player1") {
    setPlayer1Hp(player1BaseHp);
    setPlayer1History((prev) => [`Reinicio a ${player1BaseHp} PV`, ...prev.slice(0, 5)]);
  } else if (resetTargetPlayer === "player2") {
    setPlayer2Hp(player2BaseHp);
    setPlayer2History((prev) => [`Reinicio a ${player2BaseHp} PV`, ...prev.slice(0, 5)]);
  }

  setShowResetHpConfirm(false);
  setResetTargetPlayer(null);
};

const handleCancelResetHp = () => {
  setShowResetHpConfirm(false);
  setResetTargetPlayer(null);
};

const turnTitle = gameOver
  ? winner === "Empate"
    ? "EMPATE"
    : `${winner} Gana!`
  : gameStarted
  ? `Turno ${turn}`
  : "Selecciona tu Avatar";

  const hours = Math.floor(elapsedSeconds / 3600);
const minutes = Math.floor((elapsedSeconds % 3600) / 60);
const seconds = elapsedSeconds % 60;

const formattedTime =
  hours > 0
    ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    : `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

const isAnyBattleModalOpen =
  showTargetModal ||
  showHealTargetModal ||
  showAdjustHpModal ||
  showSecondaryModal ||
  showStartMatchModal ||
  isLaunchingBattleFromModal ||
  showExitConfirm ||
  showAdjustAttackModal ||
  showRestartConfirm ||
  showResetHpConfirm;

useEffect(() => {
  if (screen !== "battle") return undefined;

  if (isAnyBattleModalOpen) {
    document.body.classList.add("battle-modal-open");
  } else {
    document.body.classList.remove("battle-modal-open");
  }

  return () => {
    document.body.classList.remove("battle-modal-open");
  };
}, [screen, isAnyBattleModalOpen]);

  const renderCurrentScreen = () => {
    if (screen === "home") {
      
  return (
    <HomeScreen
      onStartBattle={() => {
        setLoadedBattleSlotIndex(null);
        navigateWithTransition("battle");
      }}
      onGoLibrary={() => navigateWithTransition("library")}
      onGoAvatars={() => navigateWithTransition("avatars")}
      onGoChronicles={() => navigateWithTransition("chronicles")}
      onLoadSavedBattle={handleLoadSavedBattle}
      onDeleteSavedBattle={handleDeleteSavedBattle}
      savedBattleSlots={savedBattleSlots}
      chronicleSlots={chronicleSlots}
    />
  );
}

    if (screen === "library") {
      return <LibraryScreen onGoHome={() => navigateWithTransition("home")} />;
    }

    if (screen === "avatars") {
      return <AvatarsScreen onGoHome={() => navigateWithTransition("home")} />;
    }

    if (screen === "chronicles") {
      return (
        <ChroniclesScreen
          onGoHome={() => navigateWithTransition("home")}
          chronicleSlots={chronicleSlots}
          selectedSlot={selectedChronicleSlot}
          onSelectSlot={setSelectedChronicleSlot}
          onDeleteChronicle={handleDeleteChronicle}
        />
      );
    }

    return (
      <div
        className={`app-wrapper ${isAnyBattleModalOpen ? "modal-active" : ""} ${
          isLaunchingBattleFromModal || isBattleIntroStaging ? "battle-launch-active" : ""
        } ${
          isLaunchingBattleFromModal ? "battle-launch-overlay-only" : ""
        } ${
          isBattleEndSequenceActive ? "battle-end-sequence-active" : ""
        } ${
          isBattleEndSequenceActive ? `battle-end-sequence-${battleEndSequenceStage}` : ""
        }`}
      >
        <div className="turn-bar">
          <div className="turn-left">
            <img src="/logo jhoyce.png" alt="Logo del juego" className="game-logo" />
          </div>

          <div className="turn-center">
          <div className="turn-display-group">
               <div className={`turn-display ${gameOver ? "turn-display-final" : ""}`}>
                 {gameOver ? "FIN DE LA PARTIDA" : turnTitle}
               </div>
               {!gameOver && <div className="turn-separator">|</div>}
               {!gameOver && (
                <div className={`timer-display ${gameStarted ? "timer-live" : "timer-idle"}`}>
                    {formattedTime}
                </div>
               )}
           </div>
          </div>

          <div className="turn-right">
            {gameStarted && (
              <div className="battle-action-nav">
                <button
                  className="battle-action-nav-btn"
                  type="button"
                  aria-label="Retroceder acción"
                  title="Retroceder acción"
                  onClick={handleUndoBattleAction}
                  disabled={battleUndoStack.length === 0 || gameOver}
                >
                  <img src="/ui/undo-icon.png" alt="Deshacer" className="battle-action-nav-icon" />
                </button>
                <button
                  className="battle-action-nav-btn"
                  type="button"
                  aria-label="Avanzar acción"
                  title="Avanzar acción"
                  onClick={handleRedoBattleAction}
                  disabled={battleRedoStack.length === 0 || gameOver}
                >
                  <img src="/ui/redo-icon.png" alt="Rehacer" className="battle-action-nav-icon" />
                </button>
              </div>
            )}

            <button
              className="restart-btn icon-restart-btn"
              onClick={() => setShowRestartConfirm(true)}
              title="Reiniciar partida"
              aria-label="Reiniciar partida"
              disabled={!gameStarted}
            >
              <img src="/ui/restart-icon.png" alt="Reiniciar" className="restart-icon" />
            </button>

            <button
              className="back-home-btn icon-home-btn"
              onClick={handleBattleExitRequest}
              title="Volver al inicio"
              aria-label="Volver al inicio"
              disabled={isBattleEndSequenceActive}
            >
              <img src="/ui/home-icon.png" alt="Inicio" className="home-icon" />
            </button>
          </div>
        </div>

{showTargetModal && pendingAttack && (
  <div className="target-modal-overlay">
    <div className="target-modal">
      <h3>{"\u00BFA qu\u00E9 avatar deseas atacar?"}</h3>

      <button
        className="target-modal-close"
        onClick={closeTargetModal}
        aria-label="Cerrar"
      >
        {"\u00D7"}
      </button>

      <div className="target-modal-actions">
        <div className="target-avatar-card-shell">
          <button
            className={`target-main-btn ${
              selectedAttackTargetSlot === "main" ? "target-card-selected" : ""
            } ${
              selectedAttackTargetSlot && selectedAttackTargetSlot !== "main"
                ? "target-card-dimmed"
                : ""
            }`}
            onClick={() => setSelectedAttackTargetSlot("main")}
          >
            <img
              src={pendingAttack.enemyMainImage}
              alt={pendingAttack.enemyMainName}
              className="target-avatar-image"
            />
            <div className="target-avatar-gradient" />
            <div className="target-avatar-role">AVATAR PRINCIPAL</div>
            <div className="target-avatar-name">{pendingAttack.enemyMainName}</div>
          </button>

          {selectedAttackTargetSlot === "main" && (
            <button
              className="target-attack-confirm-btn"
              onClick={() => handleChooseAttackTarget("main")}
            >
              ATACAR
            </button>
          )}
        </div>

        {pendingAttack.enemySecondaryName && (
          <div className="target-avatar-card-shell">
            <button
              className={`target-secondary-btn ${
                selectedAttackTargetSlot === "secondary" ? "target-card-selected" : ""
              } ${
                selectedAttackTargetSlot && selectedAttackTargetSlot !== "secondary"
                  ? "target-card-dimmed"
                  : ""
              }`}
              onClick={() => setSelectedAttackTargetSlot("secondary")}
            >
              <img
                src={pendingAttack.enemySecondaryImage}
                alt={pendingAttack.enemySecondaryName}
                className="target-avatar-image"
              />
              <div className="target-avatar-gradient" />
              <div className="target-avatar-role">AVATAR SECUNDARIO</div>
              <div className="target-avatar-name">{pendingAttack.enemySecondaryName}</div>
            </button>

            {selectedAttackTargetSlot === "secondary" && (
              <button
                className="target-attack-confirm-btn"
                onClick={() => handleChooseAttackTarget("secondary")}
              >
                ATACAR
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
)}

{showHealTargetModal && (
  <div className="target-modal-overlay">
    <div className="target-modal">
      <h3>{"\u00BFA qu\u00E9 avatar deseas aumentar PV?"}</h3>

      <button
        className="target-modal-close"
        onClick={closeHealTargetModal}
        aria-label="Cerrar"
      >
        {"\u00D7"}
      </button>

      <div className="target-modal-actions">
        <div className="target-avatar-card-shell">
          <button
            className={`target-main-btn target-heal-option ${
              selectedHealTargetSlot === "main" ? "target-heal-card-selected" : ""
            } ${
              selectedHealTargetSlot && selectedHealTargetSlot !== "main"
                ? "target-card-dimmed"
                : ""
            }`}
            onClick={() => setSelectedHealTargetSlot("main")}
          >
            <img
              src={
                pendingHealPlayer === "player1"
                  ? getAvatarData(player1Name).image
                  : getAvatarData(player2Name).image
              }
              alt={pendingHealPlayer === "player1" ? player1Name : player2Name}
              className="target-avatar-image"
            />
            <div className="target-avatar-gradient" />
            <div className="target-avatar-role">AVATAR PRINCIPAL</div>
            <div className="target-avatar-name">
              {pendingHealPlayer === "player1" ? player1Name : player2Name}
            </div>
          </button>

          {selectedHealTargetSlot === "main" && (
            <button
              className="target-heal-confirm-btn"
              onClick={() => handleChooseHealTarget("main")}
            >
              SUMAR PV
            </button>
          )}
        </div>

        {((pendingHealPlayer === "player1" && player1Secondary) ||
          (pendingHealPlayer === "player2" && player2Secondary)) && (
          <div className="target-avatar-card-shell">
            <button
              className={`target-secondary-btn target-heal-option ${
                selectedHealTargetSlot === "secondary" ? "target-heal-card-selected" : ""
              } ${
                selectedHealTargetSlot && selectedHealTargetSlot !== "secondary"
                  ? "target-card-dimmed"
                  : ""
              }`}
              onClick={() => setSelectedHealTargetSlot("secondary")}
            >
              <img
                src={
                  pendingHealPlayer === "player1"
                    ? player1Secondary?.image
                    : player2Secondary?.image
                }
                alt={
                  pendingHealPlayer === "player1"
                    ? player1Secondary?.name
                    : player2Secondary?.name
                }
                className="target-avatar-image"
              />
              <div className="target-avatar-gradient" />
              <div className="target-avatar-role">AVATAR SECUNDARIO</div>
              <div className="target-avatar-name">
                {pendingHealPlayer === "player1"
                  ? player1Secondary?.name
                  : player2Secondary?.name}
              </div>
            </button>

            {selectedHealTargetSlot === "secondary" && (
              <button
                className="target-heal-confirm-btn"
                onClick={() => handleChooseHealTarget("secondary")}
              >
                SUMAR PV
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
)}

{showAdjustHpModal && (
  <div className="adjust-overlay">
    <div className="adjust-modal">
      <button
        className="adjust-close"
        onClick={handleCloseAdjustHp}
      >
        {"\u00D7"}
      </button>

      <h3>
        Ajustar PV de{" "}
        {adjustTargetPlayer === "player1"
          ? adjustTargetSlot === "secondary"
            ? player1Secondary?.name || player1Name
            : player1Name
          : adjustTargetSlot === "secondary"
          ? player2Secondary?.name || player2Name
          : player2Name}
      </h3>

      <div className="adjust-mode-row">
        <button
          className={`mode-btn sum-btn ${adjustMode === "+" ? "active" : ""}`}
          onClick={() => setAdjustMode("+")}
        >
          Sumar PV
        </button>

        <button
          className={`mode-btn rest-btn ${adjustMode === "-" ? "active" : ""}`}
          onClick={() => setAdjustMode("-")}
        >
          Restar PV
        </button>
      </div>

      <input
        className="adjust-input"
        type="number"
        min="1"
        value={adjustValue}
        onChange={(e) => setAdjustValue(e.target.value)}
        placeholder="Cantidad"
      />

      <button
        className={`apply-btn ${adjustMode === "+" ? "apply-sum" : "apply-rest"}`}
        onClick={handleApplyAdjustHp}
      >
        Aplicar
      </button>
    </div>
  </div>
)}

{showSecondaryModal && (
  <div className="secondary-modal-overlay">
    <div className="secondary-modal secondary-modal-carousel">
      <button
        className="secondary-modal-close"
        onClick={handleCloseSecondaryModal}
        aria-label="Cerrar"
      >
        {"\u00D7"}
      </button>

      <h3>Selecciona un Avatar Secundario</h3>

      <div className="secondary-carousel-shell">
        <button
          className="secondary-carousel-arrow left"
          onClick={handleSecondaryPrev}
          type="button"
        >
          {"\u2039"}
        </button>

        <div
          className="secondary-carousel-stage"
          onTouchStart={handleSecondaryTouchStart}
          onTouchEnd={handleSecondaryTouchEnd}
        >
          {SECONDARY_AVATARS.map((avatar, index) => {
            const offset = index - secondaryCarouselIndex;
            const isCenter = index === secondaryCarouselIndex;
            const isNear = Math.abs(offset) === 1;
            const showGlow =
              isCenter && secondaryActionsVisible && !showSummonCardPreview;

            return (
              <button
                key={avatar.id}
                type="button"
                className={`secondary-carousel-card ${
                  isCenter ? "is-center" : isNear ? "is-side" : "is-hidden"
                }`}
                style={{
                  transform: `translateX(${offset * 58}%) scale(${
                    isCenter ? 1 : 0.72
                  })`,
                  zIndex: isCenter ? 3 : isNear ? 2 : 1,
                }}
                onClick={() => handleSecondaryCardTap(avatar.id)}
              >
<div
  className={`secondary-carousel-card-inner ${
    showGlow ? "secondary-card-glow" : ""
  }`}
>
  <div className="secondary-flip-scene">
    <div
      className={`secondary-flip-inner ${
        isCenter && showSummonCardPreview ? "flipped" : ""
      }`}
    >
      <div className="secondary-flip-face secondary-flip-front">
        <img
          src={avatar.image}
          alt={avatar.name}
          className="secondary-carousel-image"
        />

        <div className="secondary-carousel-gradient" />

        <div className="secondary-carousel-overlay-info">
          <span className="secondary-carousel-name">{avatar.name}</span>
          <span className="secondary-carousel-hp">{avatar.hp} PV</span>
          <span className="secondary-carousel-summon">
            {avatar.summonCardName}
          </span>
        </div>
      </div>

      <div className="secondary-flip-face secondary-flip-back">
        <img
          src={avatar.summonImage}
          alt={avatar.summonCardName}
          className="secondary-carousel-image"
        />
      </div>
    </div>
  </div>

  {isCenter && secondarySelectionExpanded && (
    <button
      className="secondary-card-toggle-btn"
      onClick={(e) => {
        e.stopPropagation();
        handleToggleSummonCardPreview();
      }}
      type="button"
      aria-label="Mostrar carta de invocación"
    >
      <img
        src="/ui/summon-card-icon.png"
        alt="Carta de invocación"
        className="secondary-card-toggle-icon"
      />
    </button>
  )}

  {isCenter && secondaryActionsVisible && !showSummonCardPreview && (
    <div className="secondary-carousel-overlay-actions visible">
      <button
        className="secondary-confirm-btn"
        onClick={(e) => {
          e.stopPropagation();
          handleConfirmSecondarySummon();
        }}
      >
        INVOCAR
      </button>
    </div>
  )}
</div>
              </button>
            );
          })}
        </div>

        <button
          className="secondary-carousel-arrow right"
          onClick={handleSecondaryNext}
          type="button"
        >
          {"\u203A"}
        </button>
      </div>
    </div>
  </div>
)}

{showStartMatchModal && !gameStarted && (
  <div className="start-match-overlay">
    <div className="start-match-modal">
      <h3>COMBATE LISTO!</h3>
      <p>
        Inicia la partida cuando quieras. También puedes volver para cambiar
        cualquier selección antes del combate.
      </p>

      <button className="start-match-btn" onClick={handleStartMatch}>
        INICIAR
      </button>

      <button className="start-back-btn" onClick={handleBackFromStartModal}>
        REGRESAR
      </button>
    </div>
  </div>
)}

{isLaunchingBattleFromModal && (
  <div className="battle-launch-transition active">
    <img
      src="/logo jhoyce.png"
      alt="Jhoyce Multiversal Legends"
      className="battle-launch-transition-logo"
    />
  </div>
)}

{isBattleEndSequenceActive && battleEndSequenceStage === "title" && (
  <div className="battle-launch-transition battle-end-transition active">
    <div className="battle-end-transition-copy">FIN DE LA PARTIDA</div>
  </div>
)}


        {showExitConfirm && (
          <div className="exit-confirm-overlay">
            <div className="exit-confirm-modal">
              <h3>
                {gameOver
                  ? "¿DESEA QUE LOS STATS DE ESTA PARTIDA SE GUARDEN EN CRÓNICAS?"
                  : "¿DESEA GUARDAR ESTA PARTIDA?"}
              </h3>

              <div className="exit-confirm-actions">
                <button
                  className="exit-accept-btn"
                  onClick={gameOver ? handleSaveChronicleAndExit : handleSaveBattleAndExit}
                >
                  ACEPTAR
                </button>

                <button
                  className="exit-cancel-btn"
                  onClick={handleExitWithoutSaving}
                >
                  CANCELAR
                </button>
              </div>
            </div>
  </div>
)}

{showAdjustAttackModal && (
  <div className="adjust-overlay" onClick={handleCloseAdjustAttack}>
    <div
      className="adjust-modal attack-adjust-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <h3>
        Ajustar PD de {adjustAttackName}
      </h3>

      <div className="attack-adjust-current-damage">
        {getPreviewAdjustedAttackDamage()}{" "}
        <span>PD</span>
      </div>

      <div className="adjust-mode-row">
        <button
          className={`mode-btn sum-btn ${adjustAttackMode === "+" ? "active" : ""}`}
          onClick={() => {
            setAdjustAttackMode("+");
            setAdjustAttackValue("");
          }}
        >
          + PD
        </button>
        <button
          className={`mode-btn rest-btn ${adjustAttackMode === "-" ? "active" : ""}`}
          onClick={() => {
            setAdjustAttackMode("-");
            setAdjustAttackValue("");
          }}
        >
          - PD
        </button>
      </div>

      <input
        className="adjust-input attack-adjust-input"
        type="text"
        inputMode="none"
        readOnly
        placeholder="Cantidad"
        value={adjustAttackValue}
        onClick={handleClearAdjustAttackValue}
      />

      <div className="attack-adjust-keypad">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
          <button
            key={digit}
            type="button"
            className="attack-adjust-key"
            onClick={() => handleAdjustAttackDigit(digit)}
          >
            {digit}
          </button>
        ))}
        <button
          type="button"
          className="attack-adjust-key attack-adjust-key-symbol"
          onClick={handleAdjustAttackOperator}
        >
          {adjustAttackMode}
        </button>
        <button
          type="button"
          className="attack-adjust-key"
          onClick={() => handleAdjustAttackDigit(0)}
        >
          0
        </button>
        <button
          type="button"
          className="attack-adjust-key attack-adjust-key-backspace"
          onClick={handleAdjustAttackBackspace}
          onMouseDown={startAdjustAttackClearHold}
          onMouseUp={stopAdjustAttackClearHold}
          onMouseLeave={stopAdjustAttackClearHold}
          onTouchStart={startAdjustAttackClearHold}
          onTouchEnd={stopAdjustAttackClearHold}
          onTouchCancel={stopAdjustAttackClearHold}
        >
          {"\u2190"}
        </button>
      </div>

      <div className="attack-adjust-divider" />

      <button
        className={`apply-btn ${adjustAttackMode === "+" ? "apply-sum" : "apply-rest"}`}
        onClick={handleApplyAdjustAttack}
      >
        APLICAR AJUSTE
      </button>
    </div>
  </div>
)}

        {showRestartConfirm && (
          <div className="restart-confirm-overlay">
            <div className="restart-confirm-modal">
              <h3>{"¿Quieres Reiniciar la partida?"}</h3>

              <div className="restart-confirm-actions">
                <button
                  className="restart-accept-btn"
                  onClick={() => {
                    resetGameState({ preserveAvatars: true });
                    setShowRestartConfirm(false);
                  }}
                >
                  ACEPTAR
                </button>

                <button
                  className="restart-cancel-btn"
                  onClick={() => setShowRestartConfirm(false)}
                >
                  CANCELAR
                </button>
              </div>
            </div>
          </div>
        )}

        {showResetHpConfirm && (
  <div className="reset-confirm-overlay">
    <div className="reset-confirm-modal">
      <h3>{"Se restaurar\u00E1n los PV de este avatar. \u00BFDeseas continuar?"}</h3>

      <div className="reset-confirm-actions">
        <button
          className="reset-continue-btn"
          onClick={handleConfirmResetHp}
        >
          CONTINUAR
        </button>

        <button
          className="reset-back-btn"
          onClick={handleCancelResetHp}
        >
          VOLVER
        </button>
      </div>
    </div>
  </div>
)}

        <div className="app">
          <PlayerPanel
            panelPlayerId="player1"
            playerLabel="PV"
            name={player1Name}
            setName={setPlayer1Name}
            hp={player1Hp}
            setHp={setPlayer1Hp}
            defaultHp={player1BaseHp}
            setDefaultHp={setPlayer1BaseHp}
            history={player1History}
            setHistory={setPlayer1History}
            enemyHp={player2Hp}
            setEnemyHp={setPlayer2Hp}
            ownCombatState={player1CombatState}
            setOwnCombatState={setPlayer1CombatState}
            enemyCombatState={player2CombatState}
            setEnemyCombatState={setPlayer2CombatState}
            mainHpFlash={player1MainHpFlash}
            secondaryHpFlash={player1SecondaryHpFlash}
            turn={turn}
            isConfirmed={player1Confirmed}
            onChooseOtherAvatar={() => handleChooseOtherAvatar("player1")}
            onRequestResetHp={() => handleRequestResetHp("player1")}
            onRequestAdjustHp={(slot) => handleRequestAdjustHp("player1", slot)}
            onReady={() => handlePlayerReady("player1")}
            gameStarted={gameStarted}
            gameOver={gameOver}
            isTurnActive={player1TurnActive}
            canPassTurn={
              gameStarted &&
              !gameOver &&
              (startingPlayer === null || currentTurnPlayer === "player1")
            }
            onPassTurn={() => handlePassTurn("player1")}
            bgClass="left-side"
            secondaryAvatar={player1Secondary}
            secondaryPanelVisible={player1SecondaryPanelVisible}
            secondaryTurnDisplay={player1SecondaryTurnDisplay}
            onSecondaryButtonClick={() => handleOpenSecondaryModal("player1")}
            activeSlot={player1ActiveSlot}
            onSetActiveSlot={(slot) => handleSetActiveSlot("player1", slot)}
            onAttackRequest={(attack, attackerSlot) =>
              handleAttackRequest("player1", attack, attackerSlot)
            }
            onHealRequest={(amount) => handleHealRequest("player1", amount)}
            onRequestAdjustAttack={(attack, slot, avatarName) =>
              handleRequestAdjustAttack("player1", attack, slot, avatarName)
            }
            getAdjustedAttackDamage={(slot, avatarName, attack) =>
              getAdjustedAttackDamage("player1", slot, avatarName, attack)
            }
            ownEm={player1Em}
            hpSyncRequest={hpSyncRequest}
            mainHpPopup={player1MainHpPopup}
            secondaryHpPopup={player1SecondaryHpPopup}
            onIncreaseEm={() => handleManualEmChange("player1", player1ActiveSlot, 1)}
            onDecreaseEm={() => handleManualEmChange("player1", player1ActiveSlot, -1)}
            isRouletteActive={isRouletteActive}
            rouletteIndex={roulettePlayer1Index}
            rouletteRevealActive={rouletteRevealPlayer1}
            battleIntroStaging={isBattleIntroStaging}
            battleIntroVisible={battleIntroRevealPlayer1}
            battleEndSequenceActive={isBattleEndSequenceActive}
            battleEndSequenceStage={battleEndSequenceStage}
            showVictoryContent={showVictoryContent}
            winner={winner}
            chronicleEntry={latestChronicleEntry}
          />

          {!gameStarted && !isLaunchingBattleFromModal && !isBattleIntroStaging && (
            <div className="random-avatar-container">
              {showQuickStartButton && player1Confirmed && player2Confirmed && (
                <button
                  className="quick-start-btn"
                  onClick={handleStartMatch}
                  title="Iniciar partida"
                  aria-label="Iniciar partida"
                  disabled={isRouletteActive}
                >
                  <img
                    src="/ui/start-icon.png"
                    alt=""
                    className="quick-start-icon"
                  />
                </button>
              )}
              <button
                className="random-avatar-btn"
                onClick={handleRandomAvatars}
                title="Seleccionar avatares aleatorios"
                aria-label="Seleccionar avatares aleatorios"
                disabled={isRouletteActive}
              >
                <img
                  src="/ui/random-icon.png"
                  alt=""
                  className="random-avatar-icon"
                />
              </button>
            </div>
          )}

          <PlayerPanel
            panelPlayerId="player2"
            playerLabel="PV"
            name={player2Name}
            setName={setPlayer2Name}
            hp={player2Hp}
            setHp={setPlayer2Hp}
            defaultHp={player2BaseHp}
            setDefaultHp={setPlayer2BaseHp}
            history={player2History}
            setHistory={setPlayer2History}
            enemyHp={player1Hp}
            setEnemyHp={setPlayer1Hp}
            ownCombatState={player2CombatState}
            setOwnCombatState={setPlayer2CombatState}
            enemyCombatState={player1CombatState}
            setEnemyCombatState={setPlayer1CombatState}
            mainHpFlash={player2MainHpFlash}
            secondaryHpFlash={player2SecondaryHpFlash}
            turn={turn}
            isConfirmed={player2Confirmed}
            onChooseOtherAvatar={() => handleChooseOtherAvatar("player2")}
            onRequestResetHp={() => handleRequestResetHp("player2")}
            onRequestAdjustHp={(slot) => handleRequestAdjustHp("player2", slot)}
            onReady={() => handlePlayerReady("player2")}
            gameStarted={gameStarted}
            gameOver={gameOver}
            isTurnActive={player2TurnActive}
            canPassTurn={
              gameStarted &&
              !gameOver &&
              (startingPlayer === null || currentTurnPlayer === "player2")
            }
            onPassTurn={() => handlePassTurn("player2")}
            bgClass="right-side"
            secondaryAvatar={player2Secondary}
            secondaryPanelVisible={player2SecondaryPanelVisible}
            secondaryTurnDisplay={player2SecondaryTurnDisplay}
            onSecondaryButtonClick={() => handleOpenSecondaryModal("player2")}
            activeSlot={player2ActiveSlot}
            onSetActiveSlot={(slot) => handleSetActiveSlot("player2", slot)}
            onAttackRequest={(attack, attackerSlot) =>
              handleAttackRequest("player2", attack, attackerSlot)
            }
            onHealRequest={(amount) => handleHealRequest("player2", amount)}
            onRequestAdjustAttack={(attack, slot, avatarName) =>
              handleRequestAdjustAttack("player2", attack, slot, avatarName)
            }
            getAdjustedAttackDamage={(slot, avatarName, attack) =>
              getAdjustedAttackDamage("player2", slot, avatarName, attack)
            }
            ownEm={player2Em}
            hpSyncRequest={hpSyncRequest}
            mainHpPopup={player2MainHpPopup}
            secondaryHpPopup={player2SecondaryHpPopup}
            onIncreaseEm={() => handleManualEmChange("player2", player2ActiveSlot, 1)}
            onDecreaseEm={() => handleManualEmChange("player2", player2ActiveSlot, -1)}
            isRouletteActive={isRouletteActive}
            rouletteIndex={roulettePlayer2Index}
            rouletteRevealActive={rouletteRevealPlayer2}
            battleIntroStaging={isBattleIntroStaging}
            battleIntroVisible={battleIntroRevealPlayer2}
            battleEndSequenceActive={isBattleEndSequenceActive}
            battleEndSequenceStage={battleEndSequenceStage}
            showVictoryContent={showVictoryContent}
            winner={winner}
            chronicleEntry={latestChronicleEntry}
          />  
        </div>
      </div>
    );
  };

  return (
    <div className={`screen-fade ${screenVisible ? "screen-show" : "screen-hide"}`}>
      {renderCurrentScreen()}
      {saveToastMessage && <div className="save-toast">{saveToastMessage}</div>}
    </div>
  );
}
