// GREGA: Create -> steam/PBF steel -> Ars/Nether -> four presses -> GT circuits.
ServerEvents.recipes(event => {
  // Restore only the nugget split needed by Create's starting andesite alloy.
  event.shapeless('9x minecraft:iron_nugget', ['#c:ingots/iron'])
    .id('grega:early/iron_nuggets')

  // GT disables manual ingot compression. The first Create press must not require an iron block.
  event.remove({ output: 'create:mechanical_press' })
  event.shaped('create:mechanical_press', [' S ', ' C ', 'III'], {
    S: 'create:shaft', C: 'create:andesite_casing', I: '#c:ingots/iron'
  }).id('grega:early/mechanical_press')

  // Every hand-crafted GT hard hammer otherwise bypasses the initial Create plate step.
  event.remove({ type: 'minecraft:crafting_shaped', output: '#gtceu:crafting_tools/hammer' })
  event.shaped('gtceu:iron_hammer', ['PP ', 'PPS', 'PP '], {
    P: 'create:iron_sheet', S: '#c:rods/wooden'
  }).id('grega:early/pressed_iron_hammer')

  // Keep book dyeing/upgrades. Both initial-book recipes require the new steel recipe instead.
  event.remove({ id: 'ars_nouveau:novice_spell_book' })
  event.remove({ id: 'ars_nouveau:novice_spellbook_alt' })
  event.shaped('ars_nouveau:novice_spell_book', [' S ', 'SBS', ' L '], {
    S: '#c:plates/steel', B: 'minecraft:book', L: '#c:gems/lapis'
  }).id('grega:early/steel_bound_spell_book')

  // All pressing and press duplication now happen inside the Core steam Inscriber.
  event.remove({ type: 'ae2:inscriber' })
  event.remove({ output: 'ae2:inscriber' })
  event.recipes.gtceu.shaped('grega_core:steam_inscriber', ['BPB', 'CHC', 'BwB'], {
    B: '#c:plates/bronze', P: 'minecraft:piston', C: '#c:plates/copper',
    H: 'gtceu:bronze_machine_casing'
  }).id('grega:early/steam_inscriber')

  // Replace the entire vacuum-tube tier, including the circuit assembler's ULV tag inputs.
  event.remove({ output: 'gtceu:vacuum_tube' })
  event.replaceInput({}, 'gtceu:vacuum_tube', 'grega_core:basic_electronic_component')
  // GT tool items supply their own damaged crafting remainder; never consume the whole tool.
  event.recipes.gtceu.shaped('grega_core:basic_electronic_component', ['hfx', 'LCE', 'RSR'], {
    L: 'ae2:logic_processor', C: 'ae2:calculation_processor', E: 'ae2:engineering_processor',
    R: 'gtceu:red_alloy_single_cable', S: '#c:plates/steel'
  }).id('grega:early/basic_electronic_component')
})

ServerEvents.tags('item', event => {
  event.remove('gtceu:circuits/ulv', 'gtceu:vacuum_tube')
  event.add('gtceu:circuits/ulv', 'grega_core:basic_electronic_component')
})
