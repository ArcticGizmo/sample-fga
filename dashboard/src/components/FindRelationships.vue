<template>
  <div class="find-relationships">
    <h3>Find Relationships</h3>
    <div class="modes">
      <button v-for="mode in MODES" :key="mode" :class="{ selected: mode === selectedMode }" @click="onSetMode(mode)">
        {{ mode }}
      </button>
    </div>
    <table>
      <tr v-if="showUser">
        <th>User</th>
        <td><input type="text" v-model="user" @input="onClearResult()" /></td>
      </tr>
      <tr v-if="showObject">
        <th>Object</th>
        <td><input type="text" v-model="object" placeholder="entity:id" @input="onClearResult()" /></td>
      </tr>
      <tr v-else>
        <th>Type</th>
        <td><input type="text" v-model="type" placeholder="entity" @input="onClearResult()" /></td>
      </tr>
      <tr v-if="showRelation">
        <th>Relation</th>
        <td><input type="text" v-model="relation" @input="onClearResult()" /></td>
      </tr>
    </table>
    <div class="actions">
      <button @click="onReset()">Reset</button>
      <button @click="onFind()">Find</button>
    </div>
    <div v-if="isLoading" class="is-loading">Loading ...</div>
    <div v-else class="results">
      <JsonView v-for="(tuple, index) in tuples" :key="index" :value="tuple" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Http, FindTuple } from '@/services/httpService';
import { computed, ref } from 'vue';
import { useToast } from 'vue-toastification';
import JsonView from './JsonView.vue';

const MODES = ['Any', 'User', 'Object', 'Relation'];

const user = ref('');
const object = ref('');
const relation = ref('');
const type = ref('');
const tuples = ref<FindTuple[]>([]);
const isLoading = ref(false);
const selectedMode = ref(MODES[0]);

const toast = useToast();

const showUser = computed(() => selectedMode.value !== 'User');
const showObject = computed(() => selectedMode.value !== 'Object');
const showRelation = computed(() => selectedMode.value !== 'Relation');

const onSetMode = (mode: string) => (selectedMode.value = mode);

const onClearResult = () => (tuples.value = []);

const onReset = () => {
  user.value = '';
  object.value = '';
  relation.value = '';
  type.value = '';
  onClearResult();
};

const getCall = (mode: string) => {
  switch (mode) {
    case 'User':
      return () => Http.findUsers(object.value, relation.value);
    case 'Object':
      return () => Http.findObjects(user.value, relation.value, type.value);
    case 'Relation':
      return () => Http.findRelations(user.value, object.value);
    default:
      return () => Http.find({ user: user.value, object: object.value, relation: relation.value });
  }
};

const onFind = async () => {
  const find = getCall(selectedMode.value);
  isLoading.value = true;
  onClearResult();
  try {
    const resp = await find();
    tuples.value = resp.tuples;
  } catch (error: any) {
    if (error.message) {
      const msg = JSON.parse(error.message);
      toast.error(msg.code);
    } else {
      console.error(error);
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.find-relationships {
  max-width: 350px;
  padding: 0.5rem;
  border: 1px solid gray;
  box-shadow: 1px 1px 3px;
}

table {
  table-layout: fixed;
  width: 100%;
}

th {
  width: 5rem;
}

td input {
  width: 100%;
  height: 1.5rem;
}

.modes {
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
  gap: 0.25rem;
}

.modes > * {
  opacity: 0.75;
}

.modes .selected {
  opacity: 1;
}

.actions {
  margin-top: 0.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.25rem;
}

.allowed {
  color: darkred;
  text-transform: capitalize;
  text-align: center;
  font-weight: bold;
}

.allowed.is-allowed {
  color: darkgreen;
}
</style>
