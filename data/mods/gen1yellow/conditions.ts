export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	slp: {
		name: 'slp',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Move') {
				this.add('-status', target, 'slp', `[from] move: ${sourceEffect.name}`);
			} else {
				this.add('-status', target, 'slp');
			}
			// 1-3 turns
			this.effectState.startTime = this.random(1, 4);
			this.effectState.time = this.effectState.startTime;

			if (target.removeVolatile('nightmare')) {
				this.add('-end', target, 'Nightmare', '[silent]');
			}
		},
		onBeforeMovePriority: 2,
		onBeforeMove(pokemon, target, move) {
			pokemon.statusState.time--;
			this.add('cant', pokemon, 'slp');
			pokemon.lastMove = null;
			return false;
		},
		onAfterMoveSelf(pokemon) {
			if (pokemon.statusState.time <= 0) pokemon.cureStatus();
		},
	},
};
