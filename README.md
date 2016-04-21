# KCTracker

Various helper tools for Kantai Collection.

## Expedition Calculator

### Assumptions

Various assumptions have been made to simplify implementation, they are documented here.

#### Sparkle Cost

Sparkling is assumed to be performed at 1-1, with no escorts (or throwaway shisp that are not refuelled). The relevant morale modifiers are:

* MVP: +10
* Flagship: +3
* S-Rank: +1
* A-Rank: +0
* Return from Sortie: -15

Therefore, the morale delta is `(10 + 3 + 1) + (10 + 3 + 0) - 15 = 12`, or 1 bar of fuel+ammo per expedition.

In practice, the cost is somewhat higher, as it is not uncommon to get B rank or lower at node C (plus repair costs).

### Great Success Chance

Assumed to be 19% chance per sparkled ship. It is also assumed that it is always best to maximize GS chance (i.e. always use at least 5 ships in a sparkled fleet).

#### Ship Types

* SS: Unremodelled, regular subs (10 Fuel, 20 Ammo). Maruyu is not used, despite lower consumption, because her low stats make consistent sparkling difficult.
* DD: Mutsuki-class (15 Fuel, 15 Ammo). Can and should be remodelled.
* CL: Tenryuu-class (25 Fuel, 20 Ammo). Should not be remodelled.
* AV: Chitose-class, 3rd remodel (35 Fuel, 45 Ammo).
* CA: Furutaka, Aoba-class (35 Fuel, 50 Ammo). Should not be remodelled.
* BBV: Ise-class, 1st remodel (95 Fuel, 105 Ammo).
* CT: Katori-class, 1st remodel (35 Fuel, 20 Ammo).
* AS: Taigei (35 Fuel, 10 Ammo)

#### Unaccounted Factors

**Daihatsu Landing Craft:** It is always beneficial to use them if you have them. Prioritize adding them to your GS expeditions in descreasing order of income.

**Drums:** It is known that Drums increase the GS chance for Expeditions that require them; for these expeditions you can reduce the number of sparkled ships. Recommended numbers can be found [here](https://www.reddit.com/r/kancolle/wiki/intermediate#wiki_increasing_resource_gain).

**Consumable Output:** The calculator does not put any weight on consumables.