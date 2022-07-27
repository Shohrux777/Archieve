<template>
  <div >
        <!-- Central Danger Modal -->
        <mdb-modal :show="hide"  @close="to_hide_modal()" danger>
          <mdb-modal-header>
            <mdb-modal-title>{{$t('error')}}</mdb-modal-title>
          </mdb-modal-header>
          <mdb-modal-body>
            <mdb-row>
              <mdb-col col="3" class="text-center"><mdb-icon icon="exclamation" size="4x"/></mdb-col>
              <mdb-col col="9">
                <p>{{m_text}}</p>

                <a  class="detail" @click="showDetail = !showDetail">{{$t('More_details')}}</a>
                <p v-if="showDetail">{{detail_info}}</p>
              </mdb-col>
            </mdb-row>
          </mdb-modal-body>
          <mdb-modal-footer right>
            <mdb-btn outline="danger"  @click="to_hide_modal()">Ok</mdb-btn>
          </mdb-modal-footer>
        </mdb-modal>
      </div>
</template>

<script>
import {mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter,mdbIcon,
      mdbRow, mdbBtn,mdbCol} from "mdbvue";

export default {
  components: {
      mdbModal,
      mdbModalHeader,
      mdbModalTitle,
      mdbModalBody,
      mdbModalFooter,
      mdbIcon,
      mdbRow,
      mdbBtn,
      mdbCol
    },
    props:{
      m_text :{
        type:String,
        default:''
      },
      hide : {
        type : Boolean,
        default : false
      },
      detail_info : String
    },
    data()
    {
      return{
        showDetail : false
      }
    },
    methods : {
      to_hide_modal()
      {
        this.showDetail = false;
        this.$emit('to_hide_modal');
      }
    }
}
</script>


<style lang="scss" scoped>
.detail{
  cursor: pointer;
  color: #007bff !important;
}

.detail:hover
{
  color: #12aff8 !important;
}

</style>
