<template>
  <div class="check-relationship">
    <h3>Check Relationship</h3>
    <table>
      <tr>
        <th>User</th>
        <td><input type="text" v-model="user" @input="onClearResult()" /></td>
      </tr>
      <tr>
        <th>Object</th>
        <td><input type="text" v-model="object" placeholder="entity:id" @input="onClearResult()" /></td>
      </tr>
      <tr>
        <th>Relation</th>
        <td><input type="text" v-model="relation" @input="onClearResult()" /></td>
      </tr>
      <tr>
        <th>Allowed</th>
        <td class="allowed" :class="{ 'is-allowed': allowed }">{{ allowed }}</td>
      </tr>
    </table>
    <div class="actions">
      <button @click="onReset()">Reset</button>
      <button @click="onCheck()">Check</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Http } from '@/services/httpService';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

const user = ref('');
const object = ref('');
const relation = ref('');
const allowed = ref<boolean>();

const toast = useToast();

const onClearResult = () => (allowed.value = undefined);

const onReset = () => {
  user.value = '';
  object.value = '';
  relation.value = '';
  onClearResult();
};

const onCheck = async () => {
  if (!user.value || !object.value || !relation.value) {
    toast.warning('All values must be present', { timeout: 2000 });
    return;
  }

  if (!object.value.includes(':')) {
    toast.warning("Object must be of form 'entity:id'");
    return;
  }

  onClearResult();

  try {
    allowed.value = await Http.check({
      user: user.value,
      object: object.value,
      relation: relation.value
    });
  } catch (error: any) {
    if (error.message) {
      const msg = JSON.parse(error.message);
      toast.error(msg.code);
    } else {
      console.error(error);
    }
  }
};
</script>

<style scoped>
.check-relationship {
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
