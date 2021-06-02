<template>
  <div class="permissions">
    <div class="permissions_header ">
      <div class="header_leftColumn ">
        <div class="header_leftColumn__top">
          <div class="header_left__title">
            Создание роли пользователя
          </div>
          <div class="header_left__subtitle">
            Нажмите на статус что бы поменять доступ
          </div>
        </div>
        <div class="header_leftColumn__bottom ">
          <input type="text" class="search-input" :placeholder="searchPlaceholder"
                 v-model="nameRole">
        </div>
      </div>
      <div class="header_rightColumn ">
        <button type="button" class="btnCreate"
                @click="createRole()"
        >Создать роль
        </button>
      </div>
    </div>
    <!--    Сделки-->
    <!--    Клиенты-->
    <!--    Задачи-->
    <!--    Лид формы-->
    <!--    Интеграции-->
    <!--    Мои события-->
    <div class="permissions_table ">
      <div class="table_row table_title">
        <div class="table_row__col table_row__colEmpty "></div>
        <div class="table_row__col">Создание</div>
        <div class="table_row__col">Просмотр</div>
        <div class="table_row__col">Редактирование</div>
        <div class="table_row__col">Удаление</div>
        <div class="table_row__col">Экспорт</div>
      </div>
      <!--      transactions-->
      <div class="table_row">
        <div class="table_row__col permissions_name">Сделки</div>
        <div class="table_row__col">
          <select id="transactionsCreating" class="selects-item transactionsCreating"
                  v-model="transactionsCreating"
          >
            <option class="option error" value="1">Запрещено</option>
            <option class="option responsibility" value="2">Если ответственный</option>
            <option class="option group" value="3">В рамках своей группы</option>
            <option class="option success" value="4">Разрешено</option>
          </select>
        </div>
        <div class="table_row__col">
          <select id="transactionsViewing" class="selects-item transactionsViewing"
                  v-model="transactionsViewing"
          >
            <option class="option error" value="1">Запрещено</option>
            <option class="option responsibility" value="2">Если ответственный</option>
            <option class="option group" value="3">В рамках своей группы</option>
            <option class="option success" value="4">Разрешено</option>
          </select>
        </div>
        <div class="table_row__col">
          <select id="transactionsEditing" class="selects-item transactionsEditing"
                  v-model="transactionsEditing"
          >
            <option class="option error" value="1">Запрещено</option>
            <option class="option responsibility" value="2">Если ответственный</option>
            <option class="option group" value="3">В рамках своей группы</option>
            <option class="option success" value="4">Разрешено</option>
          </select>
        </div>
        <div class="table_row__col">
          <select id="transactionsRemoval" class="selects-item transactionsRemoval"
                  v-model="transactionsRemoval"
          >
            <option class="option error" value="1">Запрещено</option>
            <option class="option responsibility" value="2">Если ответственный</option>
            <option class="option group" value="3">В рамках своей группы</option>
            <option class="option success" value="4">Разрешено</option>
          </select>
        </div>
        <div class="table_row__col">
          <select id="transactionsExport" class="selects-item transactionsExport"
                  v-model="transactionsExport"
          >
            <option class="option error" value="1">Запрещено</option>
            <option class="option responsibility" value="2">Если ответственный</option>
            <option class="option group" value="3">В рамках своей группы</option>
            <option class="option success" value="4">Разрешено</option>
          </select>
        </div>
      </div>
      <!--      Customers-->
      <div class="table_row">
        <div class="table_row__col permissions_name">Клиенты</div>
        <div class="table_row__col">
          <select id="customersCreating" class="selects-item customersCreating"
                  v-model="customersCreating"
          >
            <option class="option error" value="1">Запрещено</option>
            <option class="option responsibility" value="2">Если ответственный</option>
            <option class="option group" value="3">В рамках своей группы</option>
            <option class="option success" value="4">Разрешено</option>
          </select>
        </div>
        <div class="table_row__col">
          <select id="customersViewing" class="selects-item customersViewing"
                  v-model="customersViewing"
          >
            <option class="option error" value="1">Запрещено</option>
            <option class="option responsibility" value="2">Если ответственный</option>
            <option class="option group" value="3">В рамках своей группы</option>
            <option class="option success" value="4">Разрешено</option>
          </select>
        </div>
        <div class="table_row__col">
          <select id="customersEditing" class="selects-item customersEditing"
                  v-model="customersEditing"
          >
            <option class="option error" value="1">Запрещено</option>
            <option class="option responsibility" value="2">Если ответственный</option>
            <option class="option group" value="3">В рамках своей группы</option>
            <option class="option success" value="4">Разрешено</option>
          </select>
        </div>
        <div class="table_row__col">
          <select id="customersRemoval" class="selects-item customersRemoval"
                  v-model="customersRemoval"
          >
            <option class="option error" value="1">Запрещено</option>
            <option class="option responsibility" value="2">Если ответственный</option>
            <option class="option group" value="3">В рамках своей группы</option>
            <option class="option success" value="4">Разрешено</option>
          </select>
        </div>
        <div class="table_row__col">
          <select id="customersExport" class="selects-item customersExport"
                  v-model="customersExport"
          >
            <option class="option error" value="1">Запрещено</option>
            <option class="option responsibility" value="2">Если ответственный</option>
            <option class="option group" value="3">В рамках своей группы</option>
            <option class="option success" value="4">Разрешено</option>
          </select>
        </div>
      </div>
      <!--      tasks-->
      <div class="table_row">
        <div class="table_row__col permissions_name">Задачи</div>
        <div class="table_row__col">
          <select id="tasksCreating" class="selects-item tasksCreating"
                  v-model="tasksCreating"
          >
            <option class="option error" value="1">Запрещено</option>
            <option class="option responsibility" value="2">Если ответственный</option>
            <option class="option group" value="3">В рамках своей группы</option>
            <option class="option success" value="4">Разрешено</option>
          </select>
        </div>
        <div class="table_row__col">
          <select id="tasksViewing" class="selects-item tasksViewing"
                  v-model="tasksViewing"
          >
            <option class="option error" value="1">Запрещено</option>
            <option class="option responsibility" value="2">Если ответственный</option>
            <option class="option group" value="3">В рамках своей группы</option>
            <option class="option success" value="4">Разрешено</option>
          </select>
        </div>
        <div class="table_row__col">
          <select id="tasksEditing" class="selects-item tasksEditing"
                  v-model="tasksEditing"
          >
            <option class="option error" value="1">Запрещено</option>
            <option class="option responsibility" value="2">Если ответственный</option>
            <option class="option group" value="3">В рамках своей группы</option>
            <option class="option success" value="4">Разрешено</option>
          </select>
        </div>
        <div class="table_row__col">
          <select id="tasksRemoval" class="selects-item tasksRemoval"
                  v-model="tasksRemoval"
          >
            <option class="option error" value="1">Запрещено</option>
            <option class="option responsibility" value="2">Если ответственный</option>
            <option class="option group" value="3">В рамках своей группы</option>
            <option class="option success" value="4">Разрешено</option>
          </select>
        </div>
        <div class="table_row__col">
          <select id="tasksExport" class="selects-item tasksExport"
                  v-model="tasksExport"
          >
            <option class="option error" value="1">Запрещено</option>
            <option class="option responsibility" value="2">Если ответственный</option>
            <option class="option group" value="3">В рамках своей группы</option>
            <option class="option success" value="4">Разрешено</option>
          </select>
        </div>
      </div>
      <!--      lidforms-->
      <div class="table_row">
        <div class="table_row__col permissions_name">Лид формы</div>
        <div class="table_row__col">
          <select id="lidformsCreating" class="selects-item lidformsCreating"
                  v-model="lidformsCreating"
          >
            <option class="option error" value="1">Запрещено</option>
            <option class="option responsibility" value="2">Если ответственный</option>
            <option class="option group" value="3">В рамках своей группы</option>
            <option class="option success" value="4">Разрешено</option>
          </select>
        </div>
        <div class="table_row__col">
          <select id="lidformsViewing" class="selects-item lidformsViewing"
                  v-model="lidformsViewing"
          >
            <option class="option error" value="1">Запрещено</option>
            <option class="option responsibility" value="2">Если ответственный</option>
            <option class="option group" value="3">В рамках своей группы</option>
            <option class="option success" value="4">Разрешено</option>
          </select>
        </div>
        <div class="table_row__col">
          <select id="lidformsEditing" class="selects-item lidformsEditing"
                  v-model="lidformsEditing"
          >
            <option class="option error" value="1">Запрещено</option>
            <option class="option responsibility" value="2">Если ответственный</option>
            <option class="option group" value="3">В рамках своей группы</option>
            <option class="option success" value="4">Разрешено</option>
          </select>
        </div>
        <div class="table_row__col">
          <select id="lidformsRemoval" class="selects-item lidformsRemoval"
                  v-model="lidformsRemoval"
          >
            <option class="option error" value="1">Запрещено</option>
            <option class="option responsibility" value="2">Если ответственный</option>
            <option class="option group" value="3">В рамках своей группы</option>
            <option class="option success" value="4">Разрешено</option>
          </select>
        </div>
        <div class="table_row__col">
          <select id="lidformsExport" class="selects-item lidformsExport"
                  v-model="lidformsExport"
          >
            <option class="option error" value="1">Запрещено</option>
            <option class="option responsibility" value="2">Если ответственный</option>
            <option class="option group" value="3">В рамках своей группы</option>
            <option class="option success" value="4">Разрешено</option>
          </select>
        </div>
      </div>
      <!--      integrations-->
      <div class="table_row">
        <div class="table_row__col permissions_name">Интеграции</div>
        <div class="table_row__col">
          <select id="integrationsCreating" class="selects-item integrationsCreating"
                  v-model="integrationsCreating"
          >
            <option class="option error" value="1">Запрещено</option>
            <option class="option responsibility" value="2">Если ответственный</option>
            <option class="option group" value="3">В рамках своей группы</option>
            <option class="option success" value="4">Разрешено</option>
          </select>
        </div>
        <div class="table_row__col">
          <select id="integrationsViewing" class="selects-item integrationsViewing"
                  v-model="integrationsViewing"
          >
            <option class="option error" value="1">Запрещено</option>
            <option class="option responsibility" value="2">Если ответственный</option>
            <option class="option group" value="3">В рамках своей группы</option>
            <option class="option success" value="4">Разрешено</option>
          </select>
        </div>
        <div class="table_row__col">
          <select id="integrationsEditing" class="selects-item integrationsEditing"
                  v-model="integrationsEditing"
          >
            <option class="option error" value="1">Запрещено</option>
            <option class="option responsibility" value="2">Если ответственный</option>
            <option class="option group" value="3">В рамках своей группы</option>
            <option class="option success" value="4">Разрешено</option>
          </select>
        </div>
        <div class="table_row__col">
          <select id="integrationsRemoval" class="selects-item integrationsRemoval"
                  v-model="integrationsRemoval"
          >
            <option class="option error" value="1">Запрещено</option>
            <option class="option responsibility" value="2">Если ответственный</option>
            <option class="option group" value="3">В рамках своей группы</option>
            <option class="option success" value="4">Разрешено</option>
          </select>
        </div>
        <div class="table_row__col">
          <select id="integrationsExport" class="selects-item integrationsExport"
                  v-model="integrationsExport"
          >
            <option class="option error" value="1">Запрещено</option>
            <option class="option responsibility" value="2">Если ответственный</option>
            <option class="option group" value="3">В рамках своей группы</option>
            <option class="option success" value="4">Разрешено</option>
          </select>
        </div>
      </div>
      <!--      myEvents-->
      <div class="table_row">
        <div class="table_row__col permissions_name">Мои события</div>
        <div class="table_row__col">
          <select id="myEventsCreating" class="selects-item myEventsCreating"
                  v-model="myEventsCreating"
          >
            <option class="option error" value="1">Запрещено</option>
            <option class="option responsibility" value="2">Если ответственный</option>
            <option class="option group" value="3">В рамках своей группы</option>
            <option class="option success" value="4">Разрешено</option>
          </select>
        </div>
        <div class="table_row__col">
          <select id="myEventsViewing" class="selects-item myEventsViewing"
                  v-model="myEventsViewing"
          >
            <option class="option error" value="1">Запрещено</option>
            <option class="option responsibility" value="2">Если ответственный</option>
            <option class="option group" value="3">В рамках своей группы</option>
            <option class="option success" value="4">Разрешено</option>
          </select>
        </div>
        <div class="table_row__col">
          <select id="myEventsEditing" class="selects-item myEventsEditing"
                  v-model="myEventsEditing"
          >
            <option class="option error" value="1">Запрещено</option>
            <option class="option responsibility" value="2">Если ответственный</option>
            <option class="option group" value="3">В рамках своей группы</option>
            <option class="option success" value="4">Разрешено</option>
          </select>
        </div>
        <div class="table_row__col">
          <select id="myEventsRemoval" class="selects-item myEventsRemoval"
                  v-model="myEventsRemoval"
          >
            <option class="option error" value="1">Запрещено</option>
            <option class="option responsibility" value="2">Если ответственный</option>
            <option class="option group" value="3">В рамках своей группы</option>
            <option class="option success" value="4">Разрешено</option>
          </select>
        </div>
        <div class="table_row__col">
          <select id="myEventsExport" class="selects-item myEventsExport"
                  v-model="myEventsExport"
          >
            <option class="option error" value="1">Запрещено</option>
            <option class="option responsibility" value="2">Если ответственный</option>
            <option class="option group" value="3">В рамках своей группы</option>
            <option class="option success" value="4">Разрешено</option>
          </select>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: "Permissions",
  props: {},
  data() {
    return {
      title: "",
      searchPlaceholder: "Название роли",
      nameRole: "",
      // <!--      transactions-->
      transactionsCreating: 1,
      transactionsViewing: 1,
      transactionsEditing: 1,
      transactionsRemoval: 1,
      transactionsExport: 1,
      // <!--      customers-->
      customersCreating: 1,
      customersViewing: 1,
      customersEditing: 1,
      customersRemoval: 1,
      customersExport: 1,
      // <!--      tasks-->
      tasksCreating: 1,
      tasksViewing: 1,
      tasksEditing: 1,
      tasksRemoval: 1,
      tasksExport: 1,
      // <!--      lidforms-->
      lidformsCreating: 1,
      lidformsViewing: 1,
      lidformsEditing: 1,
      lidformsRemoval: 1,
      lidformsExport: 1,
      // <!--      integrations-->
      integrationsCreating: 1,
      integrationsViewing: 1,
      integrationsEditing: 1,
      integrationsRemoval: 1,
      integrationsExport: 1,
      // <!--      myEvents-->
      myEventsCreating: 1,
      myEventsViewing: 1,
      myEventsEditing: 1,
      myEventsRemoval: 1,
      myEventsExport: 1,
    }
  },
  components: {},
  computed: {},
  methods: {
    async createRole() {
      const formData = {
        name: this.nameRole,
        // <!--      transactions-->
        transactionsCreating: Number(this.transactionsCreating),
        transactionsViewing: Number(this.transactionsViewing),
        transactionsEditing: Number(this.transactionsEditing),
        transactionsRemoval: Number(this.transactionsRemoval),
        transactionsExport: Number(this.transactionsExport),
        // <!--      customers-->
        customersCreating: Number(this.customersCreating),
        customersViewing: Number(this.customersViewing),
        customersEditing: Number(this.customersEditing),
        customersRemoval: Number(this.customersRemoval),
        customersExport: Number(this.customersExport),
        // <!--      tasks-->
        tasksCreating: Number(this.tasksCreating),
        tasksViewing: Number(this.tasksViewing),
        tasksEditing: Number(this.tasksEditing),
        tasksRemoval: Number(this.tasksRemoval),
        tasksExport: Number(this.tasksExport),
        // <!--      lidforms-->
        lidformsCreating: Number(this.lidformsCreating),
        lidformsViewing: Number(this.lidformsViewing),
        lidformsEditing: Number(this.lidformsEditing),
        lidformsRemoval: Number(this.lidformsRemoval),
        lidformsExport: Number(this.lidformsExport),
        // <!--      integrations-->
        integrationsCreating: Number(this.integrationsCreating),
        integrationsViewing: Number(this.integrationsViewing),
        integrationsEditing: Number(this.integrationsEditing),
        integrationsRemoval: Number(this.integrationsRemoval),
        integrationsExport: Number(this.integrationsExport),
        // <!--      myEvents-->
        myEventsCreating: Number(this.myEventsCreating),
        myEventsViewing: Number(this.myEventsViewing),
        myEventsEditing: Number(this.myEventsEditing),
        myEventsRemoval: Number(this.myEventsRemoval),
        myEventsExport: Number(this.myEventsExport),
      };
      await console.log(formData);
    }
  },
  watch: {
    // <!--      Transactions-->
    transactionsCreating() {
      if (this.transactionsCreating == 1) {
        document.querySelector('.transactionsCreating').style.background = "red";
      } else if (this.transactionsCreating == 2) {
        document.querySelector('.transactionsCreating').style.background = "goldenrod";
      } else if (this.transactionsCreating == 3) {
        document.querySelector('.transactionsCreating').style.background = "#5b51c5";
      } else if (this.transactionsCreating == 4) {
        document.querySelector('.transactionsCreating').style.background = "#218838";
      }
      if (this.transactionsCreating == 2) {
        document.querySelector('.transactionsCreating').style.fontSize = "14px";
      }else if(this.transactionsCreating == 3){
        document.querySelector('.transactionsCreating').style.fontSize = "13px";
      }else{
        document.querySelector('.transactionsCreating').style.fontSize = "16px";
      }
    },
    transactionsViewing() {
      if (this.transactionsViewing == 1) {
        document.querySelector('.transactionsViewing').style.background = "red";
      } else if (this.transactionsViewing == 2) {
        document.querySelector('.transactionsViewing').style.background = "goldenrod";
      } else if (this.transactionsViewing == 3) {
        document.querySelector('.transactionsViewing').style.background = "#5b51c5";
      } else if (this.transactionsViewing == 4) {
        document.querySelector('.transactionsViewing').style.background = "#218838";
      }
      if (this.transactionsViewing == 2) {
        document.querySelector('.transactionsViewing').style.fontSize = "14px";
      }else if(this.transactionsViewing == 3){
        document.querySelector('.transactionsViewing').style.fontSize = "13px";
      }else{
        document.querySelector('.transactionsViewing').style.fontSize = "16px";
      }
    },
    transactionsEditing() {
      if (this.transactionsEditing == 1) {
        document.querySelector('.transactionsEditing').style.background = "red";
      } else if (this.transactionsEditing == 2) {
        document.querySelector('.transactionsEditing').style.background = "goldenrod";
      } else if (this.transactionsEditing == 3) {
        document.querySelector('.transactionsEditing').style.background = "#5b51c5";
      } else if (this.transactionsEditing == 4) {
        document.querySelector('.transactionsEditing').style.background = "#218838";
      }
      if (this.transactionsEditing == 2) {
        document.querySelector('.transactionsEditing').style.fontSize = "14px";
      }else if(this.transactionsEditing == 3){
        document.querySelector('.transactionsEditing').style.fontSize = "13px";
      }else{
        document.querySelector('.transactionsEditing').style.fontSize = "16px";
      }
    },
    transactionsRemoval() {
      if (this.transactionsRemoval == 1) {
        document.querySelector('.transactionsRemoval').style.background = "red";
      } else if (this.transactionsRemoval == 2) {
        document.querySelector('.transactionsRemoval').style.background = "goldenrod";
      } else if (this.transactionsRemoval == 3) {
        document.querySelector('.transactionsRemoval').style.background = "#5b51c5";
      } else if (this.transactionsRemoval == 4) {
        document.querySelector('.transactionsRemoval').style.background = "#218838";
      }
      if (this.transactionsRemoval == 2) {
        document.querySelector('.transactionsRemoval').style.fontSize = "14px";
      }else if(this.transactionsRemoval == 3){
        document.querySelector('.transactionsRemoval').style.fontSize = "13px";
      }else{
        document.querySelector('.transactionsRemoval').style.fontSize = "16px";
      }
    },
    transactionsExport() {
      if (this.transactionsExport == 1) {
        document.querySelector('.transactionsExport').style.background = "red";
      } else if (this.transactionsExport == 2) {
        document.querySelector('.transactionsExport').style.background = "goldenrod";
      } else if (this.transactionsExport == 3) {
        document.querySelector('.transactionsExport').style.background = "#5b51c5";
      } else if (this.transactionsExport == 4) {
        document.querySelector('.transactionsExport').style.background = "#218838";
      }
      if (this.transactionsExport == 2) {
        document.querySelector('.transactionsExport').style.fontSize = "14px";
      }else if(this.transactionsExport == 3){
        document.querySelector('.transactionsExport').style.fontSize = "13px";
      }else{
        document.querySelector('.transactionsExport').style.fontSize = "16px";
      }
    },
    // <!--      customers-->
    customersCreating() {
      if (this.customersCreating == 1) {
        document.querySelector('.customersCreating').style.background = "red";
      } else if (this.customersCreating == 2) {
        document.querySelector('.customersCreating').style.background = "goldenrod";
      } else if (this.customersCreating == 3) {
        document.querySelector('.customersCreating').style.background = "#5b51c5";
      } else if (this.customersCreating == 4) {
        document.querySelector('.customersCreating').style.background = "#218838";
      }
      if (this.customersCreating == 2) {
        document.querySelector('.customersCreating').style.fontSize = "14px";
      }else if(this.customersCreating == 3){
        document.querySelector('.customersCreating').style.fontSize = "13px";
      }else{
        document.querySelector('.customersCreating').style.fontSize = "16px";
      }
    },
    customersViewing() {
      if (this.customersViewing == 1) {
        document.querySelector('.customersViewing').style.background = "red";
      } else if (this.customersViewing == 2) {
        document.querySelector('.customersViewing').style.background = "goldenrod";
      } else if (this.customersViewing == 3) {
        document.querySelector('.customersViewing').style.background = "#5b51c5";
      } else if (this.customersViewing == 4) {
        document.querySelector('.customersViewing').style.background = "#218838";
      }
      if (this.customersViewing == 2) {
        document.querySelector('.customersViewing').style.fontSize = "14px";
      }else if(this.customersViewing == 3){
        document.querySelector('.customersViewing').style.fontSize = "13px";
      }else{
        document.querySelector('.customersViewing').style.fontSize = "16px";
      }
    },
    customersEditing() {
      if (this.customersEditing == 1) {
        document.querySelector('.customersEditing').style.background = "red";
      } else if (this.customersEditing == 2) {
        document.querySelector('.customersEditing').style.background = "goldenrod";
      } else if (this.customersEditing == 3) {
        document.querySelector('.customersEditing').style.background = "#5b51c5";
      } else if (this.customersEditing == 4) {
        document.querySelector('.customersEditing').style.background = "#218838";
      }
      if (this.customersEditing == 2) {
        document.querySelector('.customersEditing').style.fontSize = "14px";
      }else if(this.customersEditing == 3){
        document.querySelector('.customersEditing').style.fontSize = "13px";
      }else{
        document.querySelector('.customersEditing').style.fontSize = "16px";
      }
    },
    customersRemoval() {
      if (this.customersRemoval == 1) {
        document.querySelector('.customersRemoval').style.background = "red";
      } else if (this.customersRemoval == 2) {
        document.querySelector('.customersRemoval').style.background = "goldenrod";
      } else if (this.customersRemoval == 3) {
        document.querySelector('.customersRemoval').style.background = "#5b51c5";
      } else if (this.customersRemoval == 4) {
        document.querySelector('.customersRemoval').style.background = "#218838";
      }
      if (this.customersRemoval == 2) {
        document.querySelector('.customersRemoval').style.fontSize = "14px";
      }else if(this.customersRemoval == 3){
        document.querySelector('.customersRemoval').style.fontSize = "13px";
      }else{
        document.querySelector('.customersRemoval').style.fontSize = "16px";
      }
    },
    customersExport() {
      if (this.customersExport == 1) {
        document.querySelector('.customersExport').style.background = "red";
      } else if (this.customersExport == 2) {
        document.querySelector('.customersExport').style.background = "goldenrod";
      } else if (this.customersExport == 3) {
        document.querySelector('.customersExport').style.background = "#5b51c5";
      } else if (this.customersExport == 4) {
        document.querySelector('.customersExport').style.background = "#218838";
      }
      if (this.customersExport == 2) {
        document.querySelector('.customersExport').style.fontSize = "14px";
      }else if(this.customersExport == 3){
        document.querySelector('.customersExport').style.fontSize = "13px";
      }else{
        document.querySelector('.customersExport').style.fontSize = "16px";
      }
    },
    // <!--      tasks-->
    tasksCreating() {
      if (this.tasksCreating == 1) {
        document.querySelector('.tasksCreating').style.background = "red";
      } else if (this.tasksCreating == 2) {
        document.querySelector('.tasksCreating').style.background = "goldenrod";
      } else if (this.tasksCreating == 3) {
        document.querySelector('.tasksCreating').style.background = "#5b51c5";
      } else if (this.tasksCreating == 4) {
        document.querySelector('.tasksCreating').style.background = "#218838";
      }
      if (this.tasksCreating == 2) {
        document.querySelector('.tasksCreating').style.fontSize = "14px";
      }else if(this.tasksCreating == 3){
        document.querySelector('.tasksCreating').style.fontSize = "13px";
      }else{
        document.querySelector('.tasksCreating').style.fontSize = "16px";
      }
    },
    tasksViewing() {
      if (this.tasksViewing == 1) {
        document.querySelector('.tasksViewing').style.background = "red";
      } else if (this.tasksViewing == 2) {
        document.querySelector('.tasksViewing').style.background = "goldenrod";
      } else if (this.tasksViewing == 3) {
        document.querySelector('.tasksViewing').style.background = "#5b51c5";
      } else if (this.tasksViewing == 4) {
        document.querySelector('.tasksViewing').style.background = "#218838";
      }
      if (this.tasksViewing == 2) {
        document.querySelector('.tasksViewing').style.fontSize = "14px";
      }else if(this.tasksViewing == 3){
        document.querySelector('.tasksViewing').style.fontSize = "13px";
      }else{
        document.querySelector('.tasksViewing').style.fontSize = "16px";
      }
    },
    tasksEditing() {
      if (this.tasksEditing == 1) {
        document.querySelector('.tasksEditing').style.background = "red";
      } else if (this.tasksEditing == 2) {
        document.querySelector('.tasksEditing').style.background = "goldenrod";
      } else if (this.tasksEditing == 3) {
        document.querySelector('.tasksEditing').style.background = "#5b51c5";
      } else if (this.tasksEditing == 4) {
        document.querySelector('.tasksEditing').style.background = "#218838";
      }
      if (this.tasksEditing == 2) {
        document.querySelector('.tasksEditing').style.fontSize = "14px";
      }else if(this.tasksEditing == 3){
        document.querySelector('.tasksEditing').style.fontSize = "13px";
      }else{
        document.querySelector('.tasksEditing').style.fontSize = "16px";
      }
    },
    tasksRemoval() {
      if (this.tasksRemoval == 1) {
        document.querySelector('.tasksRemoval').style.background = "red";
      } else if (this.tasksRemoval == 2) {
        document.querySelector('.tasksRemoval').style.background = "goldenrod";
      } else if (this.tasksRemoval == 3) {
        document.querySelector('.tasksRemoval').style.background = "#5b51c5";
      } else if (this.tasksRemoval == 4) {
        document.querySelector('.tasksRemoval').style.background = "#218838";
      }
      if (this.tasksRemoval == 2) {
        document.querySelector('.tasksRemoval').style.fontSize = "14px";
      }else if(this.tasksRemoval == 3){
        document.querySelector('.tasksRemoval').style.fontSize = "13px";
      }else{
        document.querySelector('.tasksRemoval').style.fontSize = "16px";
      }
    },
    tasksExport() {
      if (this.tasksExport == 1) {
        document.querySelector('.tasksExport').style.background = "red";
      } else if (this.tasksExport == 2) {
        document.querySelector('.tasksExport').style.background = "goldenrod";
      } else if (this.tasksExport == 3) {
        document.querySelector('.tasksExport').style.background = "#5b51c5";
      } else if (this.tasksExport == 4) {
        document.querySelector('.tasksExport').style.background = "#218838";
      }
      if (this.tasksExport == 2) {
        document.querySelector('.tasksExport').style.fontSize = "14px";
      }else if(this.tasksExport == 3){
        document.querySelector('.tasksExport').style.fontSize = "13px";
      }else{
        document.querySelector('.tasksExport').style.fontSize = "16px";
      }
    },
    // <!--      lidforms-->
    lidformsCreating() {
      if (this.lidformsCreating == 1) {
        document.querySelector('.lidformsCreating').style.background = "red";
      } else if (this.lidformsCreating == 2) {
        document.querySelector('.lidformsCreating').style.background = "goldenrod";
      } else if (this.lidformsCreating == 3) {
        document.querySelector('.lidformsCreating').style.background = "#5b51c5";
      } else if (this.lidformsCreating == 4) {
        document.querySelector('.lidformsCreating').style.background = "#218838";
      }
      if (this.lidformsCreating == 2) {
        document.querySelector('.lidformsCreating').style.fontSize = "14px";
      }else if(this.lidformsCreating == 3){
        document.querySelector('.lidformsCreating').style.fontSize = "13px";
      }else{
        document.querySelector('.lidformsCreating').style.fontSize = "16px";
      }
    },
    lidformsViewing() {
      if (this.lidformsViewing == 1) {
        document.querySelector('.lidformsViewing').style.background = "red";
      } else if (this.lidformsViewing == 2) {
        document.querySelector('.lidformsViewing').style.background = "goldenrod";
      } else if (this.lidformsViewing == 3) {
        document.querySelector('.lidformsViewing').style.background = "#5b51c5";
      } else if (this.lidformsViewing == 4) {
        document.querySelector('.lidformsViewing').style.background = "#218838";
      }
      if (this.lidformsViewing == 2) {
        document.querySelector('.lidformsViewing').style.fontSize = "14px";
      }else if(this.lidformsViewing == 3){
        document.querySelector('.lidformsViewing').style.fontSize = "13px";
      }else{
        document.querySelector('.lidformsViewing').style.fontSize = "16px";
      }
    },
    lidformsEditing() {
      if (this.lidformsEditing == 1) {
        document.querySelector('.lidformsEditing').style.background = "red";
      } else if (this.lidformsEditing == 2) {
        document.querySelector('.lidformsEditing').style.background = "goldenrod";
      } else if (this.lidformsEditing == 3) {
        document.querySelector('.lidformsEditing').style.background = "#5b51c5";
      } else if (this.lidformsEditing == 4) {
        document.querySelector('.lidformsEditing').style.background = "#218838";
      }
      if (this.lidformsEditing == 2) {
        document.querySelector('.lidformsEditing').style.fontSize = "14px";
      }else if(this.lidformsEditing == 3){
        document.querySelector('.lidformsEditing').style.fontSize = "13px";
      }else{
        document.querySelector('.lidformsEditing').style.fontSize = "16px";
      }
    },
    lidformsRemoval() {
      if (this.lidformsRemoval == 1) {
        document.querySelector('.lidformsRemoval').style.background = "red";
      } else if (this.lidformsRemoval == 2) {
        document.querySelector('.lidformsRemoval').style.background = "goldenrod";
      } else if (this.lidformsRemoval == 3) {
        document.querySelector('.lidformsRemoval').style.background = "#5b51c5";
      } else if (this.lidformsRemoval == 4) {
        document.querySelector('.lidformsRemoval').style.background = "#218838";
      }
      if (this.lidformsRemoval == 2) {
        document.querySelector('.lidformsRemoval').style.fontSize = "14px";
      }else if(this.lidformsRemoval == 3){
        document.querySelector('.lidformsRemoval').style.fontSize = "13px";
      }else{
        document.querySelector('.lidformsRemoval').style.fontSize = "16px";
      }
    },
    lidformsExport() {
      if (this.lidformsExport == 1) {
        document.querySelector('.lidformsExport').style.background = "red";
      } else if (this.lidformsExport == 2) {
        document.querySelector('.lidformsExport').style.background = "goldenrod";
      } else if (this.lidformsExport == 3) {
        document.querySelector('.lidformsExport').style.background = "#5b51c5";
      } else if (this.lidformsExport == 4) {
        document.querySelector('.lidformsExport').style.background = "#218838";
      }
      if (this.lidformsExport == 2) {
        document.querySelector('.lidformsExport').style.fontSize = "14px";
      }else if(this.lidformsExport == 3){
        document.querySelector('.lidformsExport').style.fontSize = "13px";
      }else{
        document.querySelector('.lidformsExport').style.fontSize = "16px";
      }
    },
    // <!--      integrations-->
    integrationsCreating() {
      if (this.integrationsCreating == 1) {
        document.querySelector('.integrationsCreating').style.background = "red";
      } else if (this.integrationsCreating == 2) {
        document.querySelector('.integrationsCreating').style.background = "goldenrod";
      } else if (this.integrationsCreating == 3) {
        document.querySelector('.integrationsCreating').style.background = "#5b51c5";
      } else if (this.integrationsCreating == 4) {
        document.querySelector('.integrationsCreating').style.background = "#218838";
      }
      if (this.integrationsCreating == 2) {
        document.querySelector('.integrationsCreating').style.fontSize = "14px";
      }else if(this.integrationsCreating == 3){
        document.querySelector('.integrationsCreating').style.fontSize = "13px";
      }else{
        document.querySelector('.integrationsCreating').style.fontSize = "16px";
      }
    },
    integrationsViewing() {
      if (this.integrationsViewing == 1) {
        document.querySelector('.integrationsViewing').style.background = "red";
      } else if (this.integrationsViewing == 2) {
        document.querySelector('.integrationsViewing').style.background = "goldenrod";
      } else if (this.integrationsViewing == 3) {
        document.querySelector('.integrationsViewing').style.background = "#5b51c5";
      } else if (this.integrationsViewing == 4) {
        document.querySelector('.integrationsViewing').style.background = "#218838";
      }
      if (this.integrationsViewing == 2) {
        document.querySelector('.integrationsViewing').style.fontSize = "14px";
      }else if(this.integrationsViewing == 3){
        document.querySelector('.integrationsViewing').style.fontSize = "13px";
      }else{
        document.querySelector('.integrationsViewing').style.fontSize = "16px";
      }
    },
    integrationsEditing() {
      if (this.integrationsEditing == 1) {
        document.querySelector('.integrationsEditing').style.background = "red";
      } else if (this.integrationsEditing == 2) {
        document.querySelector('.integrationsEditing').style.background = "goldenrod";
      } else if (this.integrationsEditing == 3) {
        document.querySelector('.integrationsEditing').style.background = "#5b51c5";
      } else if (this.integrationsEditing == 4) {
        document.querySelector('.integrationsEditing').style.background = "#218838";
      }
      if (this.integrationsEditing == 2) {
        document.querySelector('.integrationsEditing').style.fontSize = "14px";
      }else if(this.integrationsEditing == 3){
        document.querySelector('.integrationsEditing').style.fontSize = "13px";
      }else{
        document.querySelector('.integrationsEditing').style.fontSize = "16px";
      }
    },
    integrationsRemoval() {
      if (this.integrationsRemoval == 1) {
        document.querySelector('.integrationsRemoval').style.background = "red";
      } else if (this.integrationsRemoval == 2) {
        document.querySelector('.integrationsRemoval').style.background = "goldenrod";
      } else if (this.integrationsRemoval == 3) {
        document.querySelector('.integrationsRemoval').style.background = "#5b51c5";
      } else if (this.integrationsRemoval == 4) {
        document.querySelector('.integrationsRemoval').style.background = "#218838";
      }
      if (this.integrationsRemoval == 2) {
        document.querySelector('.integrationsRemoval').style.fontSize = "14px";
      }else if(this.integrationsRemoval == 3){
        document.querySelector('.integrationsRemoval').style.fontSize = "13px";
      }else{
        document.querySelector('.integrationsRemoval').style.fontSize = "16px";
      }
    },
    integrationsExport() {
      if (this.integrationsExport == 1) {
        document.querySelector('.integrationsExport').style.background = "red";
      } else if (this.integrationsExport == 2) {
        document.querySelector('.integrationsExport').style.background = "goldenrod";
      } else if (this.integrationsExport == 3) {
        document.querySelector('.integrationsExport').style.background = "#5b51c5";
      } else if (this.integrationsExport == 4) {
        document.querySelector('.integrationsExport').style.background = "#218838";
      }
      if (this.integrationsExport == 2) {
        document.querySelector('.integrationsExport').style.fontSize = "14px";
      }else if(this.integrationsExport == 3){
        document.querySelector('.integrationsExport').style.fontSize = "13px";
      }else{
        document.querySelector('.integrationsExport').style.fontSize = "16px";
      }
    },
    // <!--      myEvents-->
    myEventsCreating() {
      if (this.myEventsCreating == 1) {
        document.querySelector('.myEventsCreating').style.background = "red";
      } else if (this.myEventsCreating == 2) {
        document.querySelector('.myEventsCreating').style.background = "goldenrod";
      } else if (this.myEventsCreating == 3) {
        document.querySelector('.myEventsCreating').style.background = "#5b51c5";
      } else if (this.myEventsCreating == 4) {
        document.querySelector('.myEventsCreating').style.background = "#218838";
      }
      if (this.myEventsCreating == 2) {
        document.querySelector('.myEventsCreating').style.fontSize = "14px";
      }else if(this.myEventsCreating == 3){
        document.querySelector('.myEventsCreating').style.fontSize = "13px";
      }else{
        document.querySelector('.myEventsCreating').style.fontSize = "16px";
      }
    },
    myEventsViewing() {
      if (this.myEventsViewing == 1) {
        document.querySelector('.myEventsViewing').style.background = "red";
      } else if (this.myEventsViewing == 2) {
        document.querySelector('.myEventsViewing').style.background = "goldenrod";
      } else if (this.myEventsViewing == 3) {
        document.querySelector('.myEventsViewing').style.background = "#5b51c5";
      } else if (this.myEventsViewing == 4) {
        document.querySelector('.myEventsViewing').style.background = "#218838";
      }
      if (this.myEventsViewing == 2) {
        document.querySelector('.myEventsViewing').style.fontSize = "14px";
      }else if(this.myEventsViewing == 3){
        document.querySelector('.myEventsViewing').style.fontSize = "13px";
      }else{
        document.querySelector('.myEventsViewing').style.fontSize = "16px";
      }
    },
    myEventsEditing() {
      if (this.myEventsEditing == 1) {
        document.querySelector('.myEventsEditing').style.background = "red";
      } else if (this.myEventsEditing == 2) {
        document.querySelector('.myEventsEditing').style.background = "goldenrod";
      } else if (this.myEventsEditing == 3) {
        document.querySelector('.myEventsEditing').style.background = "#5b51c5";
      } else if (this.myEventsEditing == 4) {
        document.querySelector('.myEventsEditing').style.background = "#218838";
      }
      if (this.myEventsEditing == 2) {
        document.querySelector('.myEventsEditing').style.fontSize = "14px";
      }else if(this.myEventsEditing == 3){
        document.querySelector('.myEventsEditing').style.fontSize = "13px";
      }else{
        document.querySelector('.myEventsEditing').style.fontSize = "16px";
      }
    },
    myEventsRemoval() {
      if (this.myEventsRemoval == 1) {
        document.querySelector('.myEventsRemoval').style.background = "red";
      } else if (this.myEventsRemoval == 2) {
        document.querySelector('.myEventsRemoval').style.background = "goldenrod";
      } else if (this.myEventsRemoval == 3) {
        document.querySelector('.myEventsRemoval').style.background = "#5b51c5";
      } else if (this.myEventsRemoval == 4) {
        document.querySelector('.myEventsRemoval').style.background = "#218838";
      }
      if (this.myEventsRemoval == 2) {
        document.querySelector('.myEventsRemoval').style.fontSize = "14px";
      }else if(this.myEventsRemoval == 3){
        document.querySelector('.myEventsRemoval').style.fontSize = "13px";
      }else{
        document.querySelector('.myEventsRemoval').style.fontSize = "16px";
      }
    },
    myEventsExport() {
      if (this.myEventsExport == 1) {
        document.querySelector('.myEventsExport').style.background = "red";
      } else if (this.myEventsExport == 2) {
        document.querySelector('.myEventsExport').style.background = "goldenrod";
      } else if (this.myEventsExport == 3) {
        document.querySelector('.myEventsExport').style.background = "#5b51c5";
      } else if (this.myEventsExport == 4) {
        document.querySelector('.myEventsExport').style.background = "#218838";
      }
      if (this.myEventsExport == 2) {
        document.querySelector('.myEventsExport').style.fontSize = "14px";
      }else if(this.myEventsExport == 3){
        document.querySelector('.myEventsExport').style.fontSize = "13px";
      }else{
        document.querySelector('.myEventsExport').style.fontSize = "16px";
      }
    },
  },
  async mounted() {

  },
  async created() {

  }
}
</script>

<style scoped>
.permissions {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  background: #d1cfcf;
  padding: 20px;
  height: 100vh;
  font-family: "Montserrat", sans-serif;
  box-sizing: border-box;
}

.permissions_header {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}

.header_leftColumn {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
}

.header_rightColumn {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  align-content: flex-end;
  width: 50%;
  height: 100%;
}

.btnCreate {
  width: 200px;
  height: 40px;
  background: #5b51c5;
  border-radius: 5px;
  color: #ffffff;
}
.btnCreate:hover{
  box-shadow: 0px 0px 10px 1px rgb(115 103 240 / 70%);
}

.header_leftColumn__top {
  color: #7c7979;
  font-family: "Montserrat", sans-serif;
  line-height: 24px;
}

.header_left__title {
  font-size: 20px;
}

.header_left__subtitle {
  font-size: 14px;
}

.header_leftColumn__bottom {
  margin-top: 20px;
  width: 100%;
}

.search-input {
  display: flex;

  width: 70%;
  height: 50px;
  background: #EFEEEE;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.6), inset -6px -6px 16px rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  font-family: Proxima Nova Cond;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 27px;
  color: rgba(19, 19, 19, 0.6);
  /*text-align: top;*/

}

/*==============================permissions_table=========================*/

.permissions_table {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 40px;
}

.table_title .table_row__col {
  border: 0px;
}

.table_row {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.table_row__col {
  display: flex;
  flex-direction: column;
  width: 16.66%;
  height: 70px;
  justify-content: center;
  align-items: center;

  border: 1px solid black;
}

.table_row__colEmpty {
  border: 0px;
}

.selects-item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
  background: red;
  width: 80%;
  height: 30px;
  text-align: center;
  color: #ffffff;
  border: 1px solid #000;
  border-radius: 4px;
  /*font-size: 8px;*/
  text-align-last: center;
}

.error {
  background: red;
}

.responsibility {
  background: goldenrod;
}

.group {
  background: #5b51c5;
}

.success {
  background: #218838;
}

</style>

