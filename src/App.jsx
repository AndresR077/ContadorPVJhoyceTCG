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
          "Si se activa después de que se haya usado el ataque secundario el turno anterior, hará +20 PD extra.",
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
          "Durante los 2 turnos siguientes, los ataques que reciba el avatar se reducen en 10 PD.",
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
        description: "",
        effect: null,
      },
      {
        name: "Fractura de la Realidad",
        damage: 90,
        description: "",
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
        description: "",
        effect: null,
      },
      {
        name: "Embestida Jaguar",
        damage: 80,
        description: "",
        effect: null,
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
        description: "",
        effect: null,
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
          "Si el avatar enemigo tiene 600 PV o menos, este ataque hace +30 PD extra.",
        effect: {
          type: "enemy_hp_below_or_equal",
          threshold: 600,
          bonusDamage: 30,
        },
      },
      {
        name: "Purgatorio de Anubis",
        damage: 100,
        description: "",
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
        type: "enemy_main_type_bonus_and_block_chance",
        enemyType: "Mágico",
        bonusDamage: 20,
      },
    },
    {
      name: "Sigilo Perfecto de Halcón",
      damage: 80,
      description:
        "Si este ataque se activa antes de 'Pacto de Honor y Gloria' por primera vez en la partida, roba 1 carta extra de tu mazo y tu oponente deberá descartar 1 carta de su mano aleatoriamente.",
      effect: {
        type: "first_before_named_attack_draw_and_discard",
        attackName: "Pacto de Honor y Gloria",
        drawCount: 1,
        discardCount: 1,
      },
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
      effect: {
        type: "enemy_discard_pile_condition_extra_em_or_draw",
        threshold: 4,
      },
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
        type: "compound",
        effects: [
          {
            type: "bonus_per_enemy_hand_card",
            bonusPerCard: 3,
            maxBonus: 60,
          },
          {
            type: "enemy_type_bonus",
            enemyType: "Guerrero",
            bonusDamage: 20,
          },
        ],
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
          "Si el avatar enemigo tiene 750 PV o menos, este ataque hace +10 PD extra.",
        effect: {
          type: "enemy_hp_below_or_equal",
          threshold: 750,
          bonusDamage: 10,
        },
      },
      {
        name: "Emboscada de Serafines",
        damage: 100,
        description: "",
        effect: null,
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
        type: "compound",
        effects: [
          {
            type: "block_enemy_objects_and_heal",
            durationTurns: 2,
          },
          {
            type: "enemy_hp_below_or_equal",
            threshold: 600,
            bonusDamage: 10,
          },
        ],
      },
    },
    {
      name: "Horda Dévora-Almas",
      damage: 120,
      description:
        "Si tu avatar Secundario es de tipo Oscuro / Demoniaco, al usar este ataque inflige +30 PD. Además, el oponente revela su mano y descarta 1 carta al azar.",
      effect: {
        type: "compound",
        effects: [
          {
            type: "bonus_if_own_secondary_type_is",
            secondaryType: "Oscuro / Demoniaco",
            bonusDamage: 30,
          },
          {
            type: "enemy_reveal_hand_and_random_discard",
            discardCount: 1,
          },
        ],
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
    image: "/secondary/Hella.png",
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
          "Durante el próximo turno del oponente, su ataque inflige +30 PD. Luego toma 2 cartas de tu pila de descarte y regrésalas a tu mano.",
        effect: {
          type: "grant_enemy_next_turn_bonus_damage",
          amount: 30,
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
    image: "/secondary/Medusa.png",
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
    image: "/secondary/Prismara.png",
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
    image: "/secondary/Valdrea.png",
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
    image: "/secondary/Karessa.png",
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
          type: "enemy_type_bonus",
          enemyType: "Mítico",
          bonusDamage: 10,
        },
      },
      {
        name: "Runa Victoriosa",
        damage: 70,
        description:
          "Si al activar este ataque, Karessa está a 3 turnos o menos de salir de juego, la EM usada para activarlo regresa a tu mano.",
        effect: {
          type: "secondary_turns_remaining_bonus_condition",
          thresholdTurns: 3,
        },
      },
    ],
  },
  {
    id: "necrondra",
    name: "Necrondra",
    hp: 850,
    summonCardName: "Ritual de la Biblioteca Negra",
    image: "/secondary/Necrondra.png",
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
        effect: {
          type: "draw_and_opponent_random_discard",
          drawCount: 2,
          discardCount: 1,
        },
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
              type: "enemy_type_bonus",
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
    effect: "El contrincante no roba carta en su proximo turno.",
    summary: "Controla el ritmo del rival y castiga el siguiente ciclo de robo.",
  },
  "elixir-de-lucidez-forzada": {
    effect: "Lanza un efecto aleatorio que puede beneficiar o perjudicar.",
    summary: "Una carta impredecible que puede inclinar la partida en cualquier direccion.",
  },
  "espejo-decisivo": {
    effect: "Reduce en 30 PD el siguiente ataque recibido.",
    summary: "Mitiga el proximo golpe y compra tiempo para reorganizar el turno.",
  },
  "desicion-instantanea": {
    name: "Decision Instantanea",
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
    chanceStars: 2,
    frameAccent: "#ff5247",
  },
  "guardian-de-los-6-pilares": {
    chanceStars: 1,
    frameAccent: "#5fce7f",
  },
  "invocadora-ultra-celestial": {
    chanceStars: 2,
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

  if (!/^Energ[ií]a\b/i.test(baseName)) {
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

const toLibraryImagePath = (fileName) => `/library/${encodeURIComponent(fileName)}`;

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
    effect: overrides.effect ?? "Texto de efecto pendiente de catalogar en la libreria.",
    summary: overrides.summary ?? meta.summary,
    image: toLibraryImagePath(fileName),
  };
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
  if (typeof value !== "string" || !/[ÃÂâ]/.test(value)) return value;

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

const createCombatState = () => ({
  previousTurnAttack: null,
  currentTurnAttack: null,
  consecutiveAttackName: null,
  consecutiveCount: 0,
  damageReduction: {
    amount: 0,
    turnsLeft: 0,
  },
  extraDamageTaken: {
    amount: 0,
    turnsLeft: 0,
  },
});

function PlayerPanel({
  playerLabel,
  name,
  setName,
  hp,
  setHp,
  defaultHp,
  setDefaultHp,
  history,
  setHistory,
  setOwnCombatState,
  mainHpFlash,
  secondaryHpFlash,
  isConfirmed,
  onReady,
  onChooseOtherAvatar,
  onRequestResetHp,
  onRequestAdjustHp,
  secondaryAvatar,
  secondaryTurnDisplay,
  onOpenSecondaryModal,
  activeSlot,
  onSetActiveSlot,
  isRouletteActive,
  rouletteIndex,
  onAttackRequest,
  onHealRequest,
  gameStarted,
  gameOver,
  isTurnActive,
  canPassTurn,
  onPassTurn,
  bgClass,
}) {
  
  const avatarData = getAvatarData(name);
  const healOptions = [100, 80, 40, 10];
  const isLeftSide = bgClass === "left-side";

  const [showTypeInfo, setShowTypeInfo] = useState(false);
  const [showInactiveTypeIconColor, setShowInactiveTypeIconColor] = useState(false);
  const [activationEffect, setActivationEffect] = useState(false);
  const [isSecondaryPanelSwitching, setIsSecondaryPanelSwitching] = useState(false);
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

const isSecondaryActive = activeSlot === "secondary" && !!secondaryAvatar;
const activeAttacks = activeAvatar.attacks || [];
const activeHpFlash = isSecondaryActive ? secondaryHpFlash : mainHpFlash;
const secondaryPanelHpFlash = isSecondaryActive ? mainHpFlash : secondaryHpFlash;
const shouldShowTypeIconInColor = isTurnActive || showInactiveTypeIconColor;
const activeDisplayedHp = isSecondaryActive ? displayedSecondaryHp : displayedMainHp;
const secondaryPanelDisplayedHp = isSecondaryActive ? displayedMainHp : displayedSecondaryHp;
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
  return () => {
    if (switchSlotTimeoutRef.current) clearTimeout(switchSlotTimeoutRef.current);
    if (switchPanelTimeoutRef.current) clearTimeout(switchPanelTimeoutRef.current);
  };
}, []);

useEffect(() => {
  const mainHpAnimationFrame = mainHpAnimationRef.current;
  const secondaryHpAnimationFrame = secondaryHpAnimationRef.current;

  return () => {
    if (mainHpAnimationFrame) cancelAnimationFrame(mainHpAnimationFrame);
    if (secondaryHpAnimationFrame) cancelAnimationFrame(secondaryHpAnimationFrame);
  };
}, [displayedMainHp, displayedSecondaryHp, hp, name, secondaryAvatar?.id, secondaryAvatar?.currentHp]);

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
<div className={`player-panel ${bgClass}`}>
  <div className="panel-bg">
    <img
  key={isRouletteActive ? `roulette-${rouletteIndex}` : avatarData.image}
  src={isRouletteActive ? AVATAR_OPTIONS[rouletteIndex].image : activeAvatar.image}
  alt={isRouletteActive ? AVATAR_OPTIONS[rouletteIndex].name : activeAvatar.name}
  className={`panel-bg-image ${
    !gameStarted
      ? isConfirmed
        ? "avatar-ready"
        : "avatar-not-ready"
      : isTurnActive
      ? "avatar-turn-active"
      : "avatar-turn-inactive"
  } ${activationEffect ? "avatar-activation" : ""} ${
    isSecondaryPanelSwitching ? "panel-bg-image-switching" : ""
  }`}
  style={{
  objectFit: (isRouletteActive ? AVATAR_OPTIONS[rouletteIndex].bgFit : activeAvatar.bgFit) || "cover",
  objectPosition: (isRouletteActive ? AVATAR_OPTIONS[rouletteIndex].bgPosition : activeAvatar.bgPosition) || "center top",
  }}
/>
    <div
      className={`panel-bg-transition-overlay ${
        isSecondaryPanelSwitching ? "active" : ""
      }`}
    />
    <div
      className={`panel-bg-overlay ${
        bgClass === "left-side" ? "panel-bg-overlay-red" : "panel-bg-overlay-blue"
      }`}
    />
  </div>

  <div className="panel-content">
      <div className={`panel-top ${bgClass === "left-side" ? "panel-top-left" : ""}`}>
<div className="avatar-header">
  <div className={`avatar-name-area ${isSecondaryActive ? "secondary-active" : ""}`}>
    <select
      className="name-select"
      value={name}
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
  <div className="secondary-active-wrapper">
    <button
      type="button"
      className={`secondary-large-panel ${
        isSecondaryActive ? "active" : ""
      } ${bgClass === "left-side" ? "secondary-large-panel-red" : "secondary-large-panel-blue"} ${
        !isTurnActive ? "turn-inactive-visual" : ""
      }`}
      onClick={handleToggleActiveAvatar}
    >
      <div className="secondary-large-panel-image-wrap">
        <img
          src={isSecondaryActive ? avatarData.image : secondaryAvatar.image}
          alt={isSecondaryActive ? avatarData.name : secondaryAvatar.name}
          className="secondary-large-panel-image"
        />
        <div className="secondary-large-panel-image-overlay" />
      </div>

      <div className="secondary-large-panel-info">
        <span className="secondary-large-panel-label">
         {isSecondaryActive ? "Volver a Principal" : "Cambiar a Secundario"}
        </span>

        <span className="secondary-large-panel-name">
          {isSecondaryActive ? avatarData.name : secondaryAvatar.name}
        </span>

        <span
          className={`secondary-large-panel-hp ${
            secondaryPanelHpFlash ? `hp-flash-${secondaryPanelHpFlash}` : ""
          }`}
        >
          {secondaryPanelDisplayedHp} PV
        </span>
      </div>
    </button>
  </div>
)}

<div className={`hp-box ${gameStarted ? "hp-action-layout" : "hp-center-only"}`}>
  {gameStarted && (
    <div className="hp-side-action left-action">
      {isLeftSide ? (
        <>
          <button
            className="secondary-avatar-btn icon-secondary-btn"
            title="Invocar Avatar Secundario"
            aria-label="Invocar Avatar Secundario"
            disabled={
              !gameStarted ||
              gameOver ||
              !isTurnActive ||
              !!secondaryAvatar ||
              secondaryTurnDisplay === 0
            }
            onClick={onOpenSecondaryModal}
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
        <button
          className="reset-btn hp-reset-btn icon-reset-btn"
          onClick={onRequestResetHp}
          title="Reiniciar PV"
          aria-label="Reiniciar PV"
          disabled={!gameStarted || gameOver || !isTurnActive}
        >
          <img src="/ui/reset-pv.png" alt="Reiniciar PV" className="reset-icon" />
        </button>
      )}
    </div>
  )}

  <div className="hp-center-display single-line-hp">
    <span className={`hp-number ${activeHpFlash ? `hp-flash-${activeHpFlash}` : ""}`}>
    {activeDisplayedHp}
    </span>
    <span className="hp-inline-label">{playerLabel}</span>
  </div>

{gameStarted && (
  <div className="hp-side-action right-action">
    {isLeftSide ? (
      <button
        className="reset-btn hp-reset-btn icon-reset-btn"
        onClick={onRequestResetHp}
        title="Reiniciar PV"
        aria-label="Reiniciar PV"
        disabled={!gameStarted || gameOver || !isTurnActive}
      >
        <img src="/ui/reset-pv.png" alt="Reiniciar PV" className="reset-icon" />
      </button>
    ) : (
      <button
        className="secondary-avatar-btn icon-secondary-btn"
        title="Invocar Avatar Secundario"
        aria-label="Invocar Avatar Secundario"
        disabled={
          !gameStarted ||
          gameOver ||
          !isTurnActive ||
          !!secondaryAvatar ||
          secondaryTurnDisplay === 0
        }
        onClick={onOpenSecondaryModal}
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
        {activeAttacks.map((attack) => (
          <button
            key={attack.name}
            className="attack-btn"
            onClick={() => onAttackRequest(attack, activeSlot)}
            title={attack.description || attack.name}
            disabled={!gameStarted || gameOver || !isTurnActive}
>
            <span className="attack-name">{attack.name}</span>
            <span className="attack-damage">-{attack.damage} PD</span>
          </button>
        ))}
      </div>

      <div className={`buttons-salud ${!isLeftSide ? "buttons-salud-right" : ""}`}>
  {healOptions.map((amount) => (
    <button
      key={amount}
      className="heal-btn"
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
  </div>
);
}

function HomeScreen({ onStartBattle, onGoLibrary, onGoAvatars }) {
  const [selectedHomeAction, setSelectedHomeAction] = useState(null);
  const [isLaunchingBattle, setIsLaunchingBattle] = useState(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
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
          {homeActions.map((action) => {
            const isSelected = selectedHomeAction === action.id;

            return (
              <button
                key={action.id}
                type="button"
                className={`home-menu-card ${action.id} ${isSelected ? "active" : ""}`}
                onClick={() => handleHomeActionClick(action)}
              >
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
    </div>
  );
}

function LibraryScreen({ onGoHome }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [touchStartY, setTouchStartY] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
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

  return (
    <div className={`library-screen library-tone-${selectedCard.tone}`}>
      <div className="library-topbar">
        <h1>Librería</h1>
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
                  <span className="library-rarity-pill">{selectedCardRarityLabel}</span>
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
    </div>
  );
}

function AvatarsScreen({ onGoHome }) {
  const [avatarMode, setAvatarMode] = useState("primary");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [touchStartY, setTouchStartY] = useState(null);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const avatarCollection =
    avatarMode === "secondary" ? SECONDARY_AVATARS : AVATAR_OPTIONS;
  const selectedAvatar = avatarCollection[selectedIndex] ?? avatarCollection[0];
  const selectedAttacks = selectedAvatar.attacks ?? [];

  useEffect(() => {
    setSelectedIndex(0);
  }, [avatarMode]);

  const changeAvatar = (direction) => {
    setSelectedIndex((prev) => {
      const totalAvatars = avatarCollection.length;
      return (prev + direction + totalAvatars) % totalAvatars;
    });
  };

  const startRepeating = (direction) => {
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => changeAvatar(direction), 150);
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
    };
  }, []);

  const getWheelOffset = (index) => {
    const totalAvatars = avatarCollection.length;
    let offset = index - selectedIndex;

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

  const avatarTypeLabel = avatarMode === "secondary" ? "Secundario" : "Avatar";
  const avatarSummary =
    avatarMode === "secondary"
      ? `${normalizeDisplayText(selectedAvatar.type)} · ${selectedAvatar.hp} PV · Debilidad: ${normalizeDisplayText(selectedAvatar.weakness)} · Invocación: ${normalizeDisplayText(selectedAvatar.summonCardName)}`
      : `${normalizeDisplayText(selectedAvatar.type)} · ${selectedAvatar.hp} PV · Debilidad: ${normalizeDisplayText(selectedAvatar.weakness)}`;

  return (
    <div className="avatars-screen library-tone-summon">
      <div className="library-topbar">
        <h1>Avatares</h1>
        <div className="library-topbar-right">
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

      <div className="library-layout avatars-layout">
        <div className="library-showcase">
          <div className="library-detail avatars-detail">
            <div className="library-detail-frame avatars-detail-frame">
              <img
                src={selectedAvatar.image}
                alt={normalizeDisplayText(selectedAvatar.name)}
                className="library-detail-image avatars-detail-image"
              />
            </div>

            <div className="library-detail-copy">
              <div className="library-detail-heading">
                <div className="library-detail-tags">
                  <p className="library-category">{avatarTypeLabel}</p>
                  <span className="library-rarity-pill">
                    {normalizeDisplayText(selectedAvatar.type)}
                  </span>
                </div>
                <h2>{normalizeDisplayText(selectedAvatar.name)}</h2>
                <p className="library-summary avatars-summary">
                  {normalizeDisplayText(selectedAvatar.type)} · {selectedAvatar.hp} PV ·
                  Debilidad: {normalizeDisplayText(selectedAvatar.weakness)}
                </p>
              </div>

              <div className="library-meta-grid">
                <div className="library-meta-card library-meta-card-wide library-effect-card">
                  <span className="library-meta-label">Ataques</span>
                  <div className="avatar-attack-list">
                    {selectedAttacks.map((attack) => (
                      <div
                        key={`${selectedAvatar.name}-${attack.name}`}
                        className="avatar-attack-item"
                      >
                        <strong>{normalizeDisplayText(attack.name)}</strong>
                        <p>
                          -{attack.damage} PD
                          {attack.description
                            ? ` · ${normalizeDisplayText(attack.description)}`
                            : ""}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="library-wheel-panel avatars-wheel-panel">
          <div className="avatars-mode-switch" role="tablist" aria-label="Tipo de avatar">
            <button
              type="button"
              className={`avatars-mode-btn ${avatarMode === "primary" ? "active" : ""}`}
              onClick={() => setAvatarMode("primary")}
            >
              Principal
            </button>
            <button
              type="button"
              className={`avatars-mode-btn ${avatarMode === "secondary" ? "active" : ""}`}
              onClick={() => setAvatarMode("secondary")}
            >
              Secundario
            </button>
          </div>

          <button
            className="library-wheel-arrow"
            onClick={() => changeAvatar(-1)}
            onMouseDown={() => startRepeating(-1)}
            onMouseUp={stopRepeating}
            onMouseLeave={stopRepeating}
            onTouchStart={() => startRepeating(-1)}
            onTouchEnd={stopRepeating}
            type="button"
            aria-label="Avatar anterior"
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
              {AVATAR_OPTIONS.map((avatar, index) => {
                const offset = getWheelOffset(index);
                const isActive = offset === 0;
                const isVisible = Math.abs(offset) <= 1;

                return (
                  <button
                    key={avatar.name}
                    type="button"
                    className={`library-wheel-item ${isActive ? "active" : ""}`}
                    style={{
                      transform: `translateY(${offset * 74}px) scale(${isActive ? 1 : 0.84})`,
                      opacity: !isVisible ? 0 : isActive ? 1 : 0.58,
                      pointerEvents: !isVisible ? "none" : "auto",
                    }}
                    onClick={() => setSelectedIndex(index)}
                  >
                    <span className="library-wheel-item-name">
                      {normalizeDisplayText(avatar.name)}
                    </span>
                    <span className="library-wheel-item-meta">
                      {normalizeDisplayText(avatar.type)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            className="library-wheel-arrow"
            onClick={() => changeAvatar(1)}
            onMouseDown={() => startRepeating(1)}
            onMouseUp={stopRepeating}
            onMouseLeave={stopRepeating}
            onTouchStart={() => startRepeating(1)}
            onTouchEnd={stopRepeating}
            type="button"
            aria-label="Avatar siguiente"
          >
            v
          </button>
        </aside>
        <h2>Próximamente</h2>
        <p>Aquí aparecerá la galería de avatares.</p>
      </div>
    </div>
  );
}

export default function App() {
  const menuMusicRef = useRef(null);
  const battleMusicRef = useRef(null);
  const buttonClickSoundRef = useRef(null);
  const rouletteIntervalRef = useRef(null);
  const [turn, setTurn] = useState(1);
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  const [player1Name, setPlayer1Name] = useState(AVATAR_OPTIONS[0].name);
  const [player2Name, setPlayer2Name] = useState(AVATAR_OPTIONS[1].name);

  const [player1BaseHp, setPlayer1BaseHp] = useState(AVATAR_OPTIONS[0].hp);
  const [player2BaseHp, setPlayer2BaseHp] = useState(AVATAR_OPTIONS[1].hp);

  const [player1Hp, setPlayer1Hp] = useState(AVATAR_OPTIONS[0].hp);
  const [player2Hp, setPlayer2Hp] = useState(AVATAR_OPTIONS[1].hp);

  const [player1History, setPlayer1History] = useState([]);
  const [player2History, setPlayer2History] = useState([]);

  const [player1CombatState, setPlayer1CombatState] = useState(createCombatState());
  const [player2CombatState, setPlayer2CombatState] = useState(createCombatState());

  const [player1MainHpFlash, setPlayer1MainHpFlash] = useState("");
  const [player2MainHpFlash, setPlayer2MainHpFlash] = useState("");
  const [player1SecondaryHpFlash, setPlayer1SecondaryHpFlash] = useState("");
  const [player2SecondaryHpFlash, setPlayer2SecondaryHpFlash] = useState("");

  const [player1Confirmed, setPlayer1Confirmed] = useState(false);
  const [player2Confirmed, setPlayer2Confirmed] = useState(false);
  const [showStartMatchModal, setShowStartMatchModal] = useState(false);
  const [showResetHpConfirm, setShowResetHpConfirm] = useState(false);
  const [resetTargetPlayer, setResetTargetPlayer] = useState(null);

  const [showAdjustHpModal, setShowAdjustHpModal] = useState(false);
  const [adjustTargetPlayer, setAdjustTargetPlayer] = useState(null);
  const [adjustTargetSlot, setAdjustTargetSlot] = useState("main");
  const [adjustMode, setAdjustMode] = useState("-");
  const [adjustValue, setAdjustValue] = useState("");

  const [isRouletteActive, setIsRouletteActive] = useState(false);
  const [roulettePlayer1Index, setRoulettePlayer1Index] = useState(0);
  const [roulettePlayer2Index, setRoulettePlayer2Index] = useState(0);
  // Eliminados los estados de índices finales, se usarán refs locales
  const finalIndicesRef = useRef([0, 1]);

  const [gameStarted, setGameStarted] = useState(false);
  const [startingPlayer, setStartingPlayer] = useState(null);
  const [currentTurnPlayer, setCurrentTurnPlayer] = useState(null);
  const [winner, setWinner] = useState(null);

  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showRestartConfirm, setShowRestartConfirm] = useState(false);

  const [screen, setScreen] = useState("home");
  const [screenVisible, setScreenVisible] = useState(true);

  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  const [player1Secondary, setPlayer1Secondary] = useState(null);
  const [player2Secondary, setPlayer2Secondary] = useState(null);
  const [player1SecondaryTurnDisplay, setPlayer1SecondaryTurnDisplay] = useState(null);
  const [player2SecondaryTurnDisplay, setPlayer2SecondaryTurnDisplay] = useState(null);

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

const resetGameState = () => {
  Object.keys(secondaryTurnTimeoutRef.current).forEach((playerId) => {
    if (secondaryTurnTimeoutRef.current[playerId]) {
      clearTimeout(secondaryTurnTimeoutRef.current[playerId]);
      secondaryTurnTimeoutRef.current[playerId] = null;
    }
  });

  setTurn(1);

  setPlayer1Name(AVATAR_OPTIONS[0].name);
  setPlayer2Name(AVATAR_OPTIONS[1].name);

  setPlayer1BaseHp(AVATAR_OPTIONS[0].hp);
  setPlayer2BaseHp(AVATAR_OPTIONS[1].hp);

  setPlayer1Hp(AVATAR_OPTIONS[0].hp);
  setPlayer2Hp(AVATAR_OPTIONS[1].hp);

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

  setGameStarted(false);
  setStartingPlayer(null);
  setCurrentTurnPlayer(null);
  setWinner(null);
  setElapsedSeconds(0);
  setTimerRunning(false);

  setPlayer1Secondary(null);
  setPlayer2Secondary(null);
  setPlayer1SecondaryTurnDisplay(null);
  setPlayer2SecondaryTurnDisplay(null);

  setPlayer1ActiveSlot("main");
  setPlayer2ActiveSlot("main");

};


useEffect(() => {
  if (!timerRunning) return;

  const interval = setInterval(() => {
    setElapsedSeconds((prev) => prev + 1);
  }, 1000);

  return () => clearInterval(interval);
}, [timerRunning]);

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
  });

  return () => cancelAnimationFrame(winnerFrame);
}, [gameStarted, winner, player1Hp, player2Hp, player1Name, player2Name]);

  useEffect(() => {
    let ticking = false;

    const updateParallax = () => {
      const scrollY = window.scrollY;
      const images = document.querySelectorAll(".panel-bg-image");

      images.forEach((img) => {
        const isInactive = img.classList.contains("avatar-turn-inactive") || img.classList.contains("avatar-not-ready");
const scale = isInactive ? 1.08 : 1.03;

img.style.transform = `translateY(${scrollY * 0.30}px) scale(${scale})`;
      });

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateParallax();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

const handleOpenSecondaryModal = (playerId) => {
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

  if (targetSlot === "main") {
    const currentHp = isPlayer1 ? player1Hp : player2Hp;
    const maxHp = isPlayer1 ? player1BaseHp : player2BaseHp;
    const healedHp = Math.min(maxHp, currentHp + amount);
    const healed = healedHp - currentHp;

    if (healed <= 0) return;

    if (isPlayer1) {
      setPlayer1Hp(healedHp);
      triggerFlash(setPlayer1MainHpFlash, "heal");
      setPlayer1History((prev) => [`Curación manual: +${healed} PV`, ...prev.slice(0, 5)]);
    } else {
      setPlayer2Hp(healedHp);
      triggerFlash(setPlayer2MainHpFlash, "heal");
      setPlayer2History((prev) => [`Curación manual: +${healed} PV`, ...prev.slice(0, 5)]);
    }
  } else {
    const secondary = isPlayer1 ? player1Secondary : player2Secondary;
    if (!secondary) return;

    const healedHp = Math.min(secondary.maxHp, secondary.currentHp + amount);
    const healed = healedHp - secondary.currentHp;

    if (healed <= 0) return;

    if (isPlayer1) {
      setPlayer1Secondary((prev) => ({
        ...prev,
        currentHp: healedHp,
      }));
      triggerFlash(setPlayer1SecondaryHpFlash, "heal");
      setPlayer1History((prev) => [
        `Curación manual a ${secondary.name}: +${healed} PV`,
        ...prev.slice(0, 5),
      ]);
    } else {
      setPlayer2Secondary((prev) => ({
        ...prev,
        currentHp: healedHp,
      }));
      triggerFlash(setPlayer2SecondaryHpFlash, "heal");
      setPlayer2History((prev) => [
        `Curación manual a ${secondary.name}: +${healed} PV`,
        ...prev.slice(0, 5),
      ]);
    }
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

  const ownMainHp = isPlayer1 ? player1Hp : player2Hp;
  const enemyMainHp = isPlayer1 ? player2Hp : player1Hp;

  const setOwnHistory = isPlayer1 ? setPlayer1History : setPlayer2History;
  const setEnemyHistory = isPlayer1 ? setPlayer2History : setPlayer1History;

  const setOwnMainFlash = isPlayer1 ? setPlayer1MainHpFlash : setPlayer2MainHpFlash;
  const setEnemyMainFlash = isPlayer1 ? setPlayer2MainHpFlash : setPlayer1MainHpFlash;
  const setOwnSecondaryFlash = isPlayer1 ? setPlayer1SecondaryHpFlash : setPlayer2SecondaryHpFlash;
  const setEnemySecondaryFlash = isPlayer1 ? setPlayer2SecondaryHpFlash : setPlayer1SecondaryHpFlash;

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

  const enemyTargetName =
    targetSlot === "main"
      ? enemyMainData.name
      : enemySecondary?.name || "Avatar Secundario";

  const attackerCurrentHp =
    attackerSlot === "main"
      ? ownMainHp
      : attackerSecondary?.currentHp || 0;

  const targetCurrentHp =
    targetSlot === "main"
      ? enemyMainHp
      : enemySecondary?.currentHp || 0;

  const targetType =
    targetSlot === "main"
      ? enemyMainData.type
      : enemySecondary?.type || "";

  let totalDamage = attack.damage;
  let selfHeal = 0;
  let selfDamage = 0;
  const notes = [];

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

  const processEffect = (effect) => {
    if (!effect) return;

    switch (effect.type) {
      case "compound":
        effect.effects?.forEach(processEffect);
        break;

      case "self_heal":
        selfHeal += effect.heal || 0;
        break;

      case "self_damage":
        selfDamage += effect.selfDamage || 0;
        break;

      case "enemy_hp_below_or_equal":
        if (targetCurrentHp <= effect.threshold) {
          totalDamage += effect.bonusDamage;
          notes.push(`Efecto activo: +${effect.bonusDamage} PD`);
        }
        break;

      case "bonus_if_previous_turn_attack_was":
        if (attackerSlot === "main" && ownCombatState.previousTurnAttack === effect.attackName) {
          totalDamage += effect.bonusDamage;
          notes.push(`Combo previo: +${effect.bonusDamage} PD`);
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
        }
        break;

      case "enemy_type_bonus":
        if (targetType === effect.enemyType) {
          totalDamage += effect.bonusDamage;
          notes.push(`Ventaja de tipo: +${effect.bonusDamage} PD`);
        }
        break;

      case "self_hp_below_bonus":
        if (attackerCurrentHp < effect.threshold) {
          totalDamage += effect.bonusDamage;
          notes.push(`Bono por PV bajos: +${effect.bonusDamage} PD`);
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
  }

  processEffect(attack.effect);

  if (targetSlot === "main" && enemyCombatState.damageReduction.turnsLeft > 0) {
    totalDamage = Math.max(0, totalDamage - enemyCombatState.damageReduction.amount);
    notes.push(`Daño reducido en ${enemyCombatState.damageReduction.amount}`);
  }

  if (targetSlot === "main") {
    setEnemyMainHp((prev) => Math.max(0, prev - totalDamage));
    if (totalDamage > 0) triggerEnemyFlash("main", "damage");
  } else if (enemySecondary) {
    const newSecondaryHp = Math.max(0, enemySecondary.currentHp - totalDamage);

    if (newSecondaryHp <= 0) {
      setEnemySecondary(null);
      setEnemySecondaryTurnDisplay(null);
      setEnemyActiveSlot("main");
      addEnemyHistory(`${enemySecondary.name} fue eliminada`);
      notes.push(`${enemySecondary.name} eliminada`);
    } else {
      setEnemySecondary((prev) => ({
        ...prev,
        currentHp: newSecondaryHp,
      }));
      if (totalDamage > 0) triggerEnemyFlash("secondary", "damage");
    }
  }

  if (selfHeal > 0) {
    if (attackerSlot === "main") {
      const healed = Math.min(attackerMainData.hp, ownMainHp + selfHeal) - ownMainHp;
      if (healed > 0) {
        setOwnMainHp((prev) => Math.min(attackerMainData.hp, prev + selfHeal));
        triggerOwnFlash("main", "heal");
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
        notes.push(`Recupera +${healed} PV`);
      }
    }
  }

  if (selfDamage > 0) {
    if (attackerSlot === "main") {
      setOwnMainHp((prev) => Math.max(0, prev - selfDamage));
      triggerOwnFlash("main", "damage");
      notes.push(`Sufre ${selfDamage} PD`);
    } else if (attackerSecondary) {
      const newHp = Math.max(0, attackerSecondary.currentHp - selfDamage);

      if (newHp <= 0) {
        setOwnSecondary(null);
        setOwnSecondaryTurnDisplay(null);
        setOwnActiveSlot("main");
        notes.push(`${attackerSecondary.name} fue eliminada`);
      } else {
        setOwnSecondary((prev) => ({
          ...prev,
          currentHp: newHp,
        }));
        triggerOwnFlash("secondary", "damage");
      }

      notes.push(`Sufre ${selfDamage} PD`);
    }
  }

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
    setPlayer1ActiveSlot(slot);
  } else {
    if (slot === "secondary" && !player2Secondary) return;
    setPlayer2ActiveSlot(slot);
  }
};

const handleConfirmSecondarySummon = () => {
  if (!selectedSecondaryId || !secondaryModalPlayer) return;

  const avatar = getSecondaryAvatarData(selectedSecondaryId);
  if (!avatar) return;

  const summonedAvatar = {
    ...avatar,
    currentHp: Math.floor(avatar.hp / 2),
    maxHp: avatar.hp,
    turnsRemaining: avatar.turnsDuration,
    isActive: false,
    hasEntered: true,
  };

  if (secondaryModalPlayer === "player1") {
    if (secondaryTurnTimeoutRef.current.player1) {
      clearTimeout(secondaryTurnTimeoutRef.current.player1);
      secondaryTurnTimeoutRef.current.player1 = null;
    }
    setPlayer1Secondary(summonedAvatar);
    setPlayer1SecondaryTurnDisplay(summonedAvatar.turnsRemaining);
    setPlayer1ActiveSlot("main");
    setPlayer1History((prev) => [
      `${avatar.name} invocada con ${summonedAvatar.currentHp} PV`,
      ...prev.slice(0, 5),
    ]);
  } else {
    if (secondaryTurnTimeoutRef.current.player2) {
      clearTimeout(secondaryTurnTimeoutRef.current.player2);
      secondaryTurnTimeoutRef.current.player2 = null;
    }
    setPlayer2Secondary(summonedAvatar);
    setPlayer2SecondaryTurnDisplay(summonedAvatar.turnsRemaining);
    setPlayer2ActiveSlot("main");
    setPlayer2History((prev) => [
      `${avatar.name} invocada con ${summonedAvatar.currentHp} PV`,
      ...prev.slice(0, 5),
    ]);
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

  setIsRouletteActive(false);

  // Usar los índices almacenados en el ref local
  const [finalIndex1, finalIndex2] = finalIndicesRef.current;
  const avatar1 = AVATAR_OPTIONS[finalIndex1];
  const avatar2 = AVATAR_OPTIONS[finalIndex2];

  setPlayer1Name(avatar1.name);
  setPlayer1BaseHp(avatar1.hp);
  setPlayer1Hp(avatar1.hp);

  setPlayer2Name(avatar2.name);
  setPlayer2BaseHp(avatar2.hp);
  setPlayer2Hp(avatar2.hp);

  // Reset confirmation status
  setPlayer1Confirmed(false);
  setPlayer2Confirmed(false);

  // Add to history
  setPlayer1History([`${avatar1.name} seleccionado aleatoriamente`]);
  setPlayer2History([`${avatar2.name} seleccionado aleatoriamente`]);
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

  if (playerId === "player1") {
    setPlayer1Confirmed(false);
  } else {
    setPlayer2Confirmed(false);
  }
};

const handleStartMatch = () => {
  setGameStarted(true);
  setTurn(1);
  setStartingPlayer(null);
  setCurrentTurnPlayer(null);
  setWinner(null);
  setShowStartMatchModal(false);
  setElapsedSeconds(0);
  setTimerRunning(true);
};

const handleBackFromStartModal = () => {
  setShowStartMatchModal(false);
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

  const decrementSecondaryTurns = (ownerId) => {
    if (ownerId === "player1" && player1Secondary) {
      const nextTurns = player1Secondary.turnsRemaining - 1;

      if (nextTurns <= 0) {
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
      const nextTurns = player2Secondary.turnsRemaining - 1;

      if (nextTurns <= 0) {
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
    const otherPlayer = playerId === "player1" ? "player2" : "player1";
    decrementSecondaryTurns(playerId);
    setStartingPlayer(playerId);
    setCurrentTurnPlayer(otherPlayer);
    return;
  }

  if (currentTurnPlayer !== playerId) return;

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

const handleApplyAdjustHp = () => {
  const amount = Number(adjustValue);

  if (!amount || amount <= 0 || !adjustTargetPlayer) return;

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
        setPlayer1History((prev) => [`Ajuste manual: +${healed} PV`, ...prev.slice(0, 5)]);
      }
    } else {
      const newHp = Math.max(0, player1Hp - amount);
      const damageDone = player1Hp - newHp;

      if (damageDone > 0) {
        setPlayer1Hp(newHp);
        triggerFlash(setPlayer1MainHpFlash, "damage");
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
        setPlayer2History((prev) => [`Ajuste manual: +${healed} PV`, ...prev.slice(0, 5)]);
      }
    } else {
      const newHp = Math.max(0, player2Hp - amount);
      const damageDone = player2Hp - newHp;

      if (damageDone > 0) {
        setPlayer2Hp(newHp);
        triggerFlash(setPlayer2MainHpFlash, "damage");
        setPlayer2History((prev) => [`Ajuste manual: -${damageDone} PD`, ...prev.slice(0, 5)]);
      }
    }
  }

  setShowAdjustHpModal(false);
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

  const renderCurrentScreen = () => {
    if (screen === "home") {
      
  return (
    <HomeScreen
      onStartBattle={() => navigateWithTransition("battle")}
      onGoLibrary={() => navigateWithTransition("library")}
      onGoAvatars={() => navigateWithTransition("avatars")}
    />
  );
}

    if (screen === "library") {
      return <LibraryScreen onGoHome={() => navigateWithTransition("home")} />;
    }

    if (screen === "avatars") {
      return <AvatarsScreen onGoHome={() => navigateWithTransition("home")} />;
    }

    return (
      <div className="app-wrapper">
        <div className="turn-bar">
          <div className="turn-left">
            <img src="/logo jhoyce.png" alt="Logo del juego" className="game-logo" />
          </div>

          <div className="turn-center">
            <div className="turn-display-group">
               <div className="turn-display">{turnTitle}</div>
               <div className="turn-separator">|</div>
                <div className={`timer-display ${gameStarted ? "timer-live" : "timer-idle"}`}>
                    {formattedTime}
              </div>
           </div>
          </div>

          <div className="turn-right">
            
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
              onClick={() => setShowExitConfirm(true)}
              title="Volver al inicio"
              aria-label="Volver al inicio"
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
      <button className="start-match-btn" onClick={handleStartMatch}>
        INICIAR
      </button>

      <button className="start-back-btn" onClick={handleBackFromStartModal}>
        REGRESAR
      </button>
    </div>
  </div>
)}


        {showExitConfirm && (
          <div className="exit-confirm-overlay">
            <div className="exit-confirm-modal">
              <h3>{"\u00BFEst\u00E1s seguro que quieres salir?"}</h3>

              <div className="exit-confirm-actions">
                <button
                  className="exit-accept-btn"
                  onClick={() => {
                    resetGameState();
                    setShowExitConfirm(false);
                    navigateWithTransition("home");
                  }}
                >
                  ACEPTAR
                </button>

                <button
                  className="exit-cancel-btn"
                  onClick={() => setShowExitConfirm(false)}
                >
                  CANCELAR
                </button>
              </div>
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
                    resetGameState();
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
            secondaryTurnDisplay={player1SecondaryTurnDisplay}
            onOpenSecondaryModal={() => handleOpenSecondaryModal("player1")}
            activeSlot={player1ActiveSlot}
            onSetActiveSlot={(slot) => handleSetActiveSlot("player1", slot)}
            onAttackRequest={(attack, attackerSlot) =>
              handleAttackRequest("player1", attack, attackerSlot)
            }
            onHealRequest={(amount) => handleHealRequest("player1", amount)}
            isRouletteActive={isRouletteActive}
            rouletteIndex={roulettePlayer1Index}
          />

          {!gameStarted && (
            <div className="random-avatar-container">
              <button
                className="random-avatar-btn"
                onClick={handleRandomAvatars}
                title="Seleccionar avatares aleatorios"
                aria-label="Seleccionar avatares aleatorios"
                disabled={isRouletteActive}
              >
                🎲
              </button>
            </div>
          )}

          <PlayerPanel
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
            secondaryTurnDisplay={player2SecondaryTurnDisplay}
            onOpenSecondaryModal={() => handleOpenSecondaryModal("player2")}
            activeSlot={player2ActiveSlot}
            onSetActiveSlot={(slot) => handleSetActiveSlot("player2", slot)}
            onAttackRequest={(attack, attackerSlot) =>
              handleAttackRequest("player2", attack, attackerSlot)
            }
            onHealRequest={(amount) => handleHealRequest("player2", amount)}
            isRouletteActive={isRouletteActive}
            rouletteIndex={roulettePlayer2Index}
          />  
        </div>
      </div>
    );
  };

  return (
    <div className={`screen-fade ${screenVisible ? "screen-show" : "screen-hide"}`}>
      {renderCurrentScreen()}
    </div>
  );
}
