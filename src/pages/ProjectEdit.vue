<template>
  <div id="project_edit">
    <div class="header">
      <Header active="user"></Header>

    </div>
    <div class="body">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="main-tab">
        <el-tab-pane label="Overview" name="project">
          <div class="card">
            <h2>
              Overview

            </h2>
            <hr style="border:1px dashed #b6afd7;"/>
            <el-form ref="project_info" :model="project_info" :label-width="labelWidth" class="form-margin">
              <el-row>
                <el-col :span="10">
                  <el-form-item label="ID">
                    <!--                <el-input v-model="project_info.project_id"></el-input>-->
                    {{project_info.project_id}}
                  </el-form-item>
                </el-col>
                <el-col :span="10"  :offset="2">
                  <el-form-item label="Elements">
                    <!--                <el-input v-model="project_info.project_id"></el-input>-->
                    {{project_info.elements}}
                  </el-form-item>
                </el-col>
              </el-row>


              <el-row>
                <el-col :span="10">
                  <el-form-item label="Authors" prop="authors">
                    <el-input v-model="project_info.authors"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                  <el-form-item label="Keywords" prop="keywords">
                    <el-input v-model="project_info.keywords"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="22" >
                  <el-form-item label="Abstract" prop="abstract">
                    <el-input type="textarea" rows="3" v-model="project_info.abstract"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="22" >
                  <el-form-item prop="license">
                    <div slot="label">
                      <img src="../assets/images/License.png" class="icon-img">
                      License
                    </div>
                    <el-collapse accordion>
                      <el-collapse-item>
                        <template slot="title">
                          <el-radio v-model="project_info.license" label="1">Attribution</el-radio>
                        </template>
                        <p>
                          <strong>Attribution</strong> — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
                        </p>
                      </el-collapse-item>
                      <el-collapse-item>
                        <template slot="title">
                          <el-radio v-model="project_info.license" label="2">Attribution-ShareAlike</el-radio>
                        </template>
                        <p>
                          <strong>Attribution</strong> — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
                        </p>
                        <p><strong>ShareAlike</strong> — If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.</p>
                      </el-collapse-item>
                      <el-collapse-item>
                        <template slot="title">
                          <el-radio v-model="project_info.license" label="3">Attribution-NoDerivs</el-radio>
                        </template>
                        <p>
                          <strong>Attribution</strong> — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
                        </p>
                        <p><strong>NoDerivatives</strong> — If you remix, transform, or build upon the material, you may not distribute the modified material. </p>
                      </el-collapse-item>
                      <el-collapse-item>
                        <template slot="title">
                          <el-radio v-model="project_info.license" label="4">Attribution-NonCommercial</el-radio>
                        </template>
                        <p>
                          <strong>Attribution</strong> — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
                        </p>
                        <div><strong>NonCommercial </strong> — You may not use the material for commercial purposes. </div>
                      </el-collapse-item>
                      <el-collapse-item>
                        <template slot="title">
                          <el-radio v-model="project_info.license" label="5">Attribution-NonCommercial-ShareAlike</el-radio>
                        </template>
                        <p>
                          <strong>Attribution</strong> — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
                        </p>
                        <p><strong>NonCommercial </strong> — You may not use the material for commercial purposes.</p>
                        <p><strong>ShareAlike</strong> — If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.</p>
                      </el-collapse-item>
                      <el-collapse-item>
                        <template slot="title">
                          <el-radio v-model="project_info.license" label="6">Attribution-NonCommercial-NoDerivs</el-radio>
                        </template>
                        <p>
                          <strong>Attribution</strong> — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
                        </p>
                        <p><strong>NonCommercial </strong> — You may not use the material for commercial purposes.</p>
                        <p><strong>NoDerivatives</strong> — If you remix, transform, or build upon the material, you may not distribute the modified material. </p>
                      </el-collapse-item>
                    </el-collapse>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="Updated Time" label-width="1rem">
                    <!--                <el-input v-model="project_info.update_time"></el-input>-->
                    {{project_info.update_time}}
                  </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                  <el-form-item label="Submitted Time" label-width="1rem">
                    <!--                <el-input v-model="project_info.first_submission_time"></el-input>-->
                    {{project_info.first_submission_time}}
                  </el-form-item>
                </el-col>
              </el-row>


              <el-row style="text-align: center;">
                <el-button class="button-share"  round @click="changeAvilable()"
                :style="{'background-color':project_info.available==0?'#33327e':'#e47a00'}">
                  <img src="../assets/images/共享.png" class="icon-img">
                  <span style="vertical-align:middle">{{ project_info.available==0?'Go Private' : 'Go Public' }}</span>
                </el-button>
                <el-button class="button-cancel"  round @click="reload"><span class="cancel-text">Reset</span></el-button>
                <el-button class="button-delete" round @click="projectDelete({ type: 'projects'})">
                  <img src="../assets/images/删除.png" class="icon-img">
                    <span style="vertical-align:middle">Delete</span>
                  </el-button>
                <el-button class="button-submit" round @click="projectSubmit">
                  <img src="../assets/images/Save.png" class="icon-img">
                  <span style="vertical-align:middle">Save</span>
                </el-button>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
        <!--      Model-->
        <el-tab-pane label="Model" name="model">
          <div class="card" id="model_info">
            <h2>Model</h2>
            <hr style="border:1px dashed #b6afd7;" />
            <el-form ref="model_add" :rules="rules1" :model="model_add" :label-width="labelWidth" class="form-margin">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="Deepmd-kit Version" prop="version">
                    <MySelect :default="model_add.version" :options="modelOptions" @success="modelVersionSelect($event,model_add)"></MySelect>
                  </el-form-item>
                </el-col>

              </el-row>
              <el-row>
                <el-col :span="22">
                  <el-form-item prop="data">
                    <div slot="label">
                      Model
                      <i class="el-icon-question" style="vertical-align: top;" @click="modelDialogVisible = true">

                      </i>
                    </div>
                    <div style="display: flex">
                      <FileUpload :disabled="!model_add.version" upload_id="model_add_data" text="Browse" @upload="fileAdd($event, 'model_add',2)"></FileUpload>
                    </div>

                    <span v-if="model_add_progress>0 && model_add_progress!=100" class="file-notice">Waiting for upload, please don't close this page...</span>
                    <el-progress v-if="model_add_progress>0" :stroke-width="15"  :percentage="model_add_progress"></el-progress>
                    <el-row :gutter="16">
                      <el-col :sapn="12">
                        <el-input  v-model="model_add.data" clearable></el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>

                </el-col>
              </el-row>
              <el-row>
                <el-col :span="22">
                  <el-form-item prop="param">
                    <div slot="label">
                      Input Files
                      <i class="el-icon-question" style="vertical-align: top;" @click="modelParamVisible = true">

                      </i>
                    </div>
                    <el-select v-model="model_add.param_type" multiple clearable filterable allow-create style="width: 60%">
                      <el-option value="input.json" label="input.json"></el-option>
                      <el-option value="lcurve.out" label="curve.out"></el-option>
                      <el-option value="checkpoint" label="checkpoint"></el-option>
                      <el-option value="model.ckpt.index" label="model.ckpt.index"></el-option>
                      <el-option value="model.ckpt.meta" label="model.ckpt.meta"></el-option>
                      <el-option value="model.ckpt.data-00000-of-00001" label="model.ckpt.data-00000-of-00001"></el-option>
                    </el-select>
                    <FileUpload :disabled="!model_add.version" upload_id="model_add_param" text="Browse" @upload="fileUploadParam($event,model_add)"></FileUpload>
                    <p style="line-height: 30px;margin: 5px auto;">Upload '.zip' file for params</p>

                    <el-input v-model="model_add.param" clearable></el-input>
                  </el-form-item>

                </el-col>
              </el-row>

              <el-row>
                <el-col :span="22">
                  <el-form-item label="Notes">
                    <div slot="label">
                      Notes
                      <i class="el-icon-question" style="vertical-align: top;" @click="modelNotesVisible = true"></i>
                    </div>

                    <FileUpload :disabled="!model_add.version" upload_id="model_add_notes" text="Browse" @upload="fileUploadNotes($event,model_add)"></FileUpload>
                    Upload DP-Generator (dpgen) parameter files.
                    <el-input v-model="model_add.notes" clearable></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="button-row">
                <el-button round  class="button-submit" @click="modelAddSubmit" v-if="model_add.version&&model_add_button">
                  <img src="../assets/images/提交.png" class="icon-img">
                  <span style="vertical-align:middle">Submit</span>
                </el-button>
                <el-button round  class="button-submit-disable" disabled v-else>
                  <img src="../assets/images/提交.png" class="icon-img">
                  <span style="vertical-align:middle">Submit</span>
                </el-button>
                <el-button round  class="button-cancel" @click="resetForm('model_add')"><span class="cancel-text">Cancel</span></el-button>
              </el-row>
            </el-form>
<!--            <el-form :label-width="labelWidth" v-for="(model, index) in models_info" :key="index" :ref="'model' + index" :model="model" class="form-margin">
              <el-row>
                <el-col :span="10">
                  <el-form-item label="ID">
                    <el-input v-model="model.id" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                  <el-form-item label="Update Time" label-width="1rem">
                    <el-input v-model="model.update_time" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="Version">
                    <MySelect :options="modelOptions" :default="model.version" @success="modelVersionSelect($event,model)"></MySelect>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="22">
                  <el-form-item label="Model">
                    <div style="display: flex">
                      <FileUpload :disabled="!model.version" :upload_id="'model_file'+index" text="Browse" @upload="fileUpdate($event,'models_info', index, 2)"></FileUpload>
                    </div>
                    <span v-if="model_update_progress[index]>0 && model_update_progress[index]!=100" class="file-notice">Waiting for upload, please don't close this page...</span>
                    <el-progress v-if="model_update_progress[index]>0" :stroke-width="15" :percentage="model_update_progress[index]"></el-progress>
                    <el-input v-model="model['data']" clearable></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="22">
                  <el-form-item prop="param">
                    <div slot="label">
                      Param
                      <i class="el-icon-question" style="vertical-align: top;" @click="modelParamVisible = true">

                      </i>
                    </div>
                    <el-select v-model="model.param_type" multiple clearable filterable allow-create style="width: 60%">
                      <el-option value="input.json"></el-option>
                      <el-option value="lcurve.out"></el-option>
                      <el-option value="check.point"></el-option>
                      <el-option value="model.ckpt.index"></el-option>
                      <el-option value="model.ckpt.meta"></el-option>
                      <el-option value="model.ckpt.data-00000-of-00001"></el-option>
                    </el-select>
                    <FileUpload :disabled="!model.version" :upload_id="'model_params'+index" text="Browse" @upload="fileUploadParam($event, model)"></FileUpload>
                    <p style="line-height: 30px;margin: 5px auto;">Upload '.zip' file for params</p>
                    <el-input v-model="model.param" clearable></el-input>

                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="22">
                  <el-form-item label="Notes">
                    <div slot="label">
                      Notes
                      <i class="el-icon-question" style="vertical-align: top;" @click="modelNotesVisible = true">

                      </i>
                    </div>

                    <FileUpload :disabled="!model.version" :upload_id="'model_notes'+index" text="Browse" @upload="fileUploadNotes($event,model)"></FileUpload>
                    Upload notes file for parameters

                    <el-input v-model="model.notes" clearable></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="button-row">
                <el-button round  class="button-submit" @click="modelEditSubmit" v-if="model_update_button[index]">
                  <img src="../assets/images/提交.png" class="icon-img">
                  <span style="vertical-align:middle">Submit</span>
                </el-button>

                <el-button round  class="button-submit-disable" disabled v-else>
                  <img src="../assets/images/提交.png" class="icon-img">
                  <span style="vertical-align:middle">Submit</span>
                </el-button>

                <el-button round  class="button-delete" @click="modelDelete({project_id: project_info['project_id'], model_id: model['id'], type: 'models'})">
                  <img src="../assets/images/删除.png" class="icon-img">
                  <span style="vertical-align:middle">Delete</span>
                </el-button>
              </el-row>
              <hr class="hr-margin" style="border:2px dotted #b6afd7;" v-if="index<models_info.length-1"/>

            </el-form>-->
          </div>

<!--          <div class="card" id="model_add">
            <el-button round  class="button-add" @click="showAddModel = true">Add New Model</el-button>
            <el-form  v-show="showAddModel" ref="model_add" :rules="rules1" :model="model_add" :label-width="labelWidth" class="form-margin">
              <hr style="border:1px dashed #b6afd7;" />
              <el-row>
                <el-col :span="12">
                  <el-form-item label="Version" prop="version">
                    <MySelect :options="modelOptions" @success="modelVersionSelect($event,model_add)"></MySelect>
                  </el-form-item>
                </el-col>

              </el-row>
              <el-row>
                <el-col :span="22">
                  <el-form-item prop="data">
                    <div slot="label">
                      Model
                      <i class="el-icon-question" style="vertical-align: top;" @click="modelDialogVisible = true">

                      </i>
                    </div>
                    <div style="display: flex">
                      <FileUpload :disabled="!model_add.version" upload_id="model_add_data" text="Browse" @upload="fileAdd($event, 'model_add',2)"></FileUpload>
                    </div>

                    <span v-if="model_add_progress>0 && model_add_progress!=100" class="file-notice">Waiting for upload, please don't close this page...</span>
                    <el-progress v-if="model_add_progress>0" :stroke-width="15"  :percentage="model_add_progress"></el-progress>
                    <el-row :gutter="16">
                      <el-col :sapn="12">
                        <el-input  v-model="model_add.data" clearable></el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>

                </el-col>
              </el-row>
              <el-row>
                <el-col :span="22">
                  <el-form-item prop="param">

                    <div slot="label">
                      Parameter
                        <i class="el-icon-question" style="vertical-align: top;" @click="modelParamVisible = true">

                        </i>
                    </div>

                    &lt;!&ndash;                  <el-input v-model="model_add.notes"></el-input>&ndash;&gt;
                    <el-select v-model="model_add.param_type" multiple clearable filterable allow-create style="width: 60%">
                      <el-option value="input.json"></el-option>
                      <el-option value="lcurve.out"></el-option>
                      <el-option value="check.point"></el-option>
                      <el-option value="model.ckpt.index"></el-option>
                      <el-option value="model.ckpt.meta"></el-option>
                      <el-option value="model.ckpt.data-00000-of-00001"></el-option>
                    </el-select>
                    <FileUpload :disabled="!model_add.version" upload_id="model_add_param" text="Browse" @upload="fileUploadParam($event,model_add)"></FileUpload>
                    <p style="line-height: 30px;margin: 5px auto;">Upload '.zip' file for params</p>

                    <el-input v-model="model_add.param" clearable></el-input>
                  </el-form-item>

                </el-col>
              </el-row>

              <el-row>
                <el-col :span="22">
                  <el-form-item label="Notes">
                    <div slot="label">
                      Notes
                      <i class="el-icon-question" style="vertical-align: top;" @click="modelNotesVisible = true">

                      </i>
                    </div>

                    <FileUpload :disabled="!model_add.version" upload_id="model_add_notes" text="Browse" @upload="fileUploadNotes($event,model_add)"></FileUpload>
Upload notes file for parameters

                    <el-input v-model="model_add.notes" clearable></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="button-row">
                  <el-button round  class="button-submit" @click="modelAddSubmit" v-if="model_add.version&&model_add_button">
                    <img src="../assets/images/提交.png" class="icon-img">
                    <span style="vertical-align:middle">Submit</span>
                  </el-button>
                <el-button round  class="button-submit-disable" disabled v-else>
                  <img src="../assets/images/提交.png" class="icon-img">
                  <span style="vertical-align:middle">Submit</span>
                </el-button>
                  <el-button round  class="button-cancel" @click="resetForm('model_add')"><span class="cancel-text">Cancel</span></el-button>
              </el-row>
            </el-form>
          </div>-->
        </el-tab-pane>

        <el-tab-pane label="Raw Data" name="data">
          <div class="card" id="raw_data">
            <h2>Raw Data</h2>
            <hr style="border:1px dashed #b6afd7;" />
            <el-form ref="raw_data" :model="project_info" label-width="180px" class="form-margin">

              <el-row>
                <el-col :span="14">
                  <el-form-item label="Code Type" prop="code">
                    <MySelect :options="rawOptions"  :default="project_info.code_type" @success="codeSelect($event)"></MySelect>
                  </el-form-item>
                </el-col>

              </el-row>

              <el-row>
                <el-col :span="22">
                  <el-form-item label="Parameter File" prop="input_type">
                      <el-select v-model="project_info.input_type">
                        <el-option  value="INCAR"></el-option>
                        <el-option  value="input"></el-option>
                        <!--                      <el-option value="meam"></el-option>-->
                      </el-select>
                      <FileUpload upload_id="inputFile" text="Upload"
                                  @upload="fileUploadInput($event,project_info)"></FileUpload>
                      <el-input placeholder="input file url:" v-model="project_info.input_file" clearable></el-input>

                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="22">
                  <el-form-item prop="code">
                    <div slot="label">
                      PseudoPotential
                      <i class="el-icon-question" style="vertical-align: top;" @click="pseudoVisible = true"></i>
                    </div>
                    <div v-if="isVasp">
                      <div v-for="(item, index) in pseudoList">
                         <el-input style="display: inline-block" :placeholder="item.element+'-'" :key="'vasp' + index" v-model="item.hash"></el-input>
                      </div>
                    </div>
                    <div v-else>
                      <FileUpload  upload_id="pseudoFile" text="Upload"
                                  @upload="pseudoUpload($event)"></FileUpload>
                      <el-input  v-model="pseudo" clearable></el-input>
                    </div>

                  </el-form-item>
                </el-col>
                <el-col :span="11">

                </el-col>

              </el-row>
              <el-row>
                <el-col :span="22">
                  <el-form-item prop="raw_data">
                    <div slot="label">
                      Raw Data
                      <i class="el-icon-question" style="vertical-align: top;" @click="rawDialogVisible = true">

                      </i>
                    </div>

                    <FileUpload upload_id="raw_add_progress_file" text="Browse" @upload="fileAdd($event,'project_info', 2)"></FileUpload>
                    <div>
                      <span v-if="raw_add_progress>0 && raw_add_progress!=100" class="file-notice">Waiting for upload, please don't close this page...</span>
                      <el-progress v-if="raw_add_progress>0" :stroke-width="5"  :percentage="raw_add_progress"></el-progress>

                    </div>
                    <el-input  v-model="project_info.data" clearable></el-input>


                  </el-form-item>

                  <el-form-item prop="notes">
                    <div slot="label">
                      Notes
                      <i class="el-icon-question" style="vertical-align: top;" @click="rawNotesVisible = true">
                      </i>
                    </div>
                    <FileUpload upload_id="modelNotes" text="Upload"
                                @upload="rawNotesUpload($event)"></FileUpload>
                    <el-input  v-model="project_info.notes" clearable></el-input>
                  </el-form-item>
                </el-col>

              </el-row>
              <el-row class="button-row">
                  <el-button round  class="button-submit" @click="projectSubmit" v-if="raw_add_button">
                    <img src="../assets/images/提交.png" class="icon-img">
                    <span style="vertical-align:middle">Submit</span>
                  </el-button>
                  <el-button round  class="button-submit-disable" disabled v-else>
                    <img src="../assets/images/提交.png" class="icon-img">
                    <span style="vertical-align:middle">Submit</span>
                  </el-button>
                  <el-button round  class="button-cancel" @click="reload"><span class="cancel-text">Cancel</span></el-button>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="References" name="references">
          <div class="card" id="references">
<!--            <h2>Paper Information</h2>-->

            <el-collapse v-model="activePapers" @change="handleChange">
              <el-collapse-item :name="paper.id"  v-for="(paper, index) in papers_info" :key="'paper'+index">
                <template slot="title" style="margin-left: 20px">
                  ID: {{ paper.id }}
                </template>
                <el-form v-if="papers_info.length>0" :label-width="labelWidth" :ref="'paper' + index" :key="index" :model="paper" class="form-margin">
                  <hr style="border:1px dashed #b6afd7;" />
                  <el-row>
                    <el-col :span="22">
                      <el-form-item prop="file">
                        <div slot="label">
                          File
                        </div>
                        <FileUpload :upload_id="'paperFile'+index" text="Browse"
                                    @upload="paperFileUpload($event, paper)"></FileUpload>
                        <el-input  v-model="paper.file" clearable></el-input>
                        <p>You can either upload the BibTeX or EndNote file, or fill in the information below.</p>

                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="10">
                      <el-form-item label="Citation">
                        <el-input v-model="paper.citations"></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="10" :offset="2">
                      <el-form-item label="Year">
                        <el-input v-model="paper.year"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="10">
                      <el-form-item label="Title">
                        <el-input v-model="paper.title"></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="10" :offset="2">
                      <el-form-item label="DOI">
                        <el-input v-model="paper.DOI"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="10">
                      <el-form-item label="Author">
                        <el-input v-model="paper_details[index].author"></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="10" :offset="2">
                      <el-form-item label="Volume">
                        <el-input v-model="paper_details[index].volume"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="10">
                      <el-form-item label="Number">
                        <el-input v-model="paper_details[index].number"></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="10" :offset="2">
                      <el-form-item label="Pages">
                        <el-input v-model="paper_details[index].pages"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                  <el-col :span="10">
                    <el-form-item label="Number">
                      <el-input v-model="paper_details[index].publisher"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="10" :offset="2">
                    <el-form-item label="Journal">
                      <el-input v-model="paper_details[index].journal"></el-input>
                    </el-form-item>
                  </el-col>
                  </el-row>


                  <!--<el-row>
                    <el-col :span="22">
                      <el-form-item label="Elements">
                        <ElementPicker :formula="paper.elements" @formchange="paperElementChange($event,index)"></ElementPicker>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="22">
                      <el-form-item label="Keywords">
                        <el-input v-model="paper.keywords"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="22">
                      <el-form-item label="Abstract">
                        <el-input type="textarea" rows="3" v-model="paper.abstract"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>-->
                  <el-row  class="button-row">
                    <el-button round  class="button-submit" @click="paperEditSubmit(index)">
                      <img src="../assets/images/提交.png" class="icon-img">
                      <span style="vertical-align:middle">Submit</span>
                    </el-button>
                    <el-button round  class="button-delete" @click="paperDelete({project_id: project_info['project_id'], paper_id: paper['id'], type: 'papers'})">
                      <img src="../assets/images/删除.png" class="icon-img">
                      <span style="vertical-align:middle">Delete</span>
                    </el-button>
                  </el-row>
                </el-form>
              </el-collapse-item>
            </el-collapse>

            <el-button round class="button-add" @click="showAddPaper = true">Add New Paper</el-button>
            <div id="paper_add" v-show="showAddPaper">
              <hr style="border:1px dashed #b6afd7;" />
              <el-form ref="paper_add" :rules="rules2" :model="paper_add" :label-width="labelWidth" class="form-margin">
                <el-row>
                  <el-col :span="22">
                    <el-form-item prop="file">
                      <div slot="label">
                        File
                      </div>
                      <FileUpload upload_id="paperFileAdd" text="Browse"
                                  @upload="paperFileUpload($event, paper_add)"></FileUpload>
                      <el-input  v-model="paper_add.file" clearable></el-input>
                      <p>You can either upload the BibTeX or EndNote file, or fill in the information below.</p>

                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="10">
                    <el-form-item label="Citation" prop="citations">
                      <el-input v-model="paper_add.citations"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="10" :offset="2">
                    <el-form-item label="Year" prop="year">
                      <el-input v-model="paper_add.year"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>

                  <el-col :span="10">
                    <el-form-item label="Title" prop="title">
                      <el-input v-model="paper_add.title"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" :offset="2">
                    <el-form-item label="DOI" prop="DOI">
                      <el-input v-model="paper_add.DOI"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="Author" prop="author">
                      <el-input v-model="paper_add_details.author"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" :offset="2">
                    <el-form-item label="Volume" prop="volume">
                      <el-input v-model="paper_add_details.volume"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="Number" prop="number">
                      <el-input v-model="paper_add_details.number"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" :offset="2">
                    <el-form-item label="Pages" prop="pages">
                      <el-input v-model="paper_add_details.pages"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="Publisher" prop="publisher">
                      <el-input v-model="paper_add_details.publisher"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" :offset="2">
                    <el-form-item label="Journal" prop="journal">
                      <el-input v-model="paper_add_details.journal"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
<!--                <el-row>
                  <el-col :span="22">
                    <el-form-item label="Elements" prop="elements">
                      <ElementPicker ref="elementPicker" :formula="paper_add.elements" @formchange="paperAddElementChange($event)"></ElementPicker>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="22" prop="keywords">
                    <el-form-item label="Keywords">
                      <el-input v-model="paper_add.keywords"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="22">
                    <el-form-item label="Abstract" prop="abstract">
                      <el-input type="textarea" rows="3" v-model="paper_add.abstract"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>-->
                <el-row  class="button-row">
                  <el-button round  class="button-submit" @click="paperAddSubmit" v-if="(paper_add.citations&&paper_add.title)||paper_add.file">
                    <img src="../assets/images/提交.png" class="icon-img">
                    <span style="vertical-align:middle">Submit</span>
                  </el-button>
                  <el-button round  class="button-submit-disable" disabled v-else>
                    <img src="../assets/images/提交.png" class="icon-img">
                    <span style="vertical-align:middle">Submit</span>
                  </el-button>

                  <el-button round  class="button-cancel" @click="resetForm('paper_add')"><span class="cancel-text">Cancel</span></el-button>
                </el-row>
              </el-form>
            </div>
          </div>

        </el-tab-pane>
        <el-tab-pane label="Test Results" name="results">
          <div class="card" id="results_info" >

            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item :name="result.id" v-for="(result, index) in results_info" :key="'result'+index">
                <template slot="title" style="margin-left: 20px">
                  <i class="el-icon-s-fold"></i>ID: {{ result.id }}
                </template>
                <el-form v-if="results_info.length" label-width="0.92rem"  :key="index" :model="result" class="form-margin">
                  <el-row>
                    <el-col :span="10">
                      <el-form-item label="ID">
                        <el-input v-model="result.id"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="2">
                      <el-form-item  prop="structure">
                        <div slot="label" >
                          Structure
                          <i class="el-icon-question" style="vertical-align: top;" @click="structureVisible = true">

                          </i>
                        </div>

                        <MySelect :options="structureOptions" :default="result.structure" @success="structureSelect($event,result)"></MySelect>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="10">
                      <el-form-item prop="task">
                        <div slot="label">
                          Task
                          <i class="el-icon-question" style="vertical-align: top;" @click="dialogVisible = true">

                          </i>
                        </div>
                        <MySelect :options="taskOptions" :default="result.type" @success="taskSelect($event,result)"></MySelect>

                      </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="2">
                      <el-form-item label="Task Type"  >
                        <MySelect :options="tasktypeOptions" :default="result.models" @success="tasktypeSelect($event,result)"></MySelect>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="22">
                      <el-form-item label="Data">

                        <FileUpload :upload_id="'result_file'+index" text="Browse" @upload="fileUpdate($event, 'results_info', index, 2)"></FileUpload>

                        <span v-if="result_update_progress[index]>0 && result_update_progress[index]!=100" class="file-notice">Waiting for upload, please don't close this page...</span>
                        <el-progress v-if="result_update_progress[index]>0" :stroke-width="15"  :percentage="result_update_progress[index]"></el-progress>
                        <el-input v-model="result['data']" clearable></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row  class="button-row">
                    <el-button round  class="button-submit" @click="resultEditSubmit" v-if="result_update_button[index]">
                      <img src="../assets/images/提交.png" class="icon-img">
                      <span style="vertical-align:middle">Submit</span>
                    </el-button>
                    <el-button round  class="button-submit-disable" disabled v-else>
                      <img src="../assets/images/提交.png" class="icon-img">
                      <span style="vertical-align:middle">Submit</span>
                    </el-button>
                    <el-button round  class="button-delete" @click="resultDelete({project_id: project_info['project_id'], result_id: result['id'], type: 'results'})">
                      <img src="../assets/images/删除.png" class="icon-img">
                      <span style="vertical-align:middle">Delete</span>
                    </el-button>
                  </el-row>
                </el-form>
              </el-collapse-item>
            </el-collapse>
            <el-button round class="button-add" @click="showAddResult = true">Add New Results</el-button>

            <div id="result_add" v-show="showAddResult">
              <hr style="border:1px dashed #b6afd7;" />
              <el-form  ref="result_add" :rules="rules3" :model="result_add"  label-width="0.92rem" class="form-margin">
                <el-row>
                  <el-col :span="22">
                    <el-form-item label="Autotest">
                      <el-button @click="toGit">github</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item prop="structure">
                      <div slot="label" style="display: inline-block;">
                        Structure
                        <i class="el-icon-question" style="vertical-align: top;" @click="structureVisible = true">

                        </i>
                      </div>
                      <MySelect :options="structureOptions" @success="structureSelect($event,result_add)"></MySelect>

                    </el-form-item>
                  </el-col>
                  <el-col :span="10" :offset="2">
                    <el-form-item  prop="task">
                      <div slot="label">
                        Task
                        <i class="el-icon-question" style="vertical-align: top;" @click="dialogVisible = true">

                        </i>
                      </div>
                      <MySelect :options="taskOptions" @success="taskSelect($event,result_add)"></MySelect>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="22">
                    <el-form-item label="Task Type" prop="models">
                      <MySelect :options="tasktypeOptions" :default="result_add.models" @success="tasktypeSelect($event,result_add)"></MySelect>
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row>
                  <el-col :span="22">
                    <el-form-item label="Data" prop="data">
                      <FileUpload upload_id="result_add_file" text="Browse" @upload="fileAdd($event,'result_add', 2)"></FileUpload>
                      <span v-if="result_add_progress>0 && result_add_progress!=100" class="file-notice">Waiting for upload, please don't close this page...</span>
                      <el-progress v-if="result_add_progress>0"  :stroke-width="15"  :percentage="result_add_progress"></el-progress>
                      <el-input v-model="result_add['data']" clearable></el-input>
                    </el-form-item>


                  </el-col>
                </el-row>
                <el-row  class="button-row">
                  <el-button round  class="button-submit" @click="resultAddSubmit" v-if="result_add.structure&&result_add_button">
                    <img src="../assets/images/提交.png" class="icon-img">
                    <span style="vertical-align:middle">Submit</span>
                  </el-button>
                  <el-button round  class="button-submit-disable" disabled v-else>
                    <img src="../assets/images/提交.png" class="icon-img">
                    <span style="vertical-align:middle">Submit</span>

                  </el-button>
                  <el-button round  class="button-cancel" @click="resetForm('result_add')"><span class="cancel-text">Cancel</span></el-button>
                </el-row>
              </el-form>
            </div>
          </div>

        </el-tab-pane>

      </el-tabs>

      <el-dialog
        :visible.sync="structureVisible"
        width="40%">

        <p slot="title" class="dialog_title">
          You can fill in the structure ID from
          <a href="https:materialsproject.org">https:materialsproject.org</a>

        </p>
        <h3>Example:</h3>
        <p>mp-5</p>
        <p>mp-160</p>

      </el-dialog>
      <el-dialog
        title="Reference for task"
        :visible.sync="dialogVisible"
        width="40%">
        <el-tabs tab-position="left" class="dialog-tab">
          <el-tab-pane label="elastic">
            <pre>conf_dir:/data1/yinan/autotest/new-Au/confs/mp-81
   156.91  109.94  104.72    7.37    0.00    0.00
   110.38  156.20  104.72   -7.41   -0.00   -0.00
   105.05  105.05  161.38    0.00    0.00    0.00
     8.10   -8.71   -3.10   19.39    0.00   -0.00
    -0.00   -0.00   -0.00    0.00   19.36    8.42
     0.00    0.00    0.00    0.00    7.97   25.63
  # Bulk   Modulus BV = 123.82 GPa
  # Shear  Modulus GV = 23.22 GPa
  # Youngs Modulus EV = 65.55 GPa
  # Poission Ratio uV = 0.41
            </pre>
          </el-tab-pane>
          <el-tab-pane label="eos">
            <pre>conf_dir:/data1/yinan/autotest/new-Au/confs/mp-81
   VpA(A^3)  EpA(eV)
   10.000    2.4657
   10.500    1.2722
   11.000    0.3122
   11.500   -0.4604
   12.000   -1.0820
   12.500   -1.5812
   13.000   -1.9806
   13.500   -2.2988
   14.000   -2.5507
   14.500   -2.7481
   15.000   -2.9005
   15.500   -3.0154
   16.000   -3.0989
   16.500   -3.1562
   17.000   -3.1921
   17.500   -3.2110
   18.000   -3.2163
   18.500   -3.2111
   19.000   -3.1973
   19.500   -3.1761
   20.000   -3.1486
   20.500   -3.1152
   21.000   -3.0765
   21.500   -3.0332
   22.000   -2.9862
   22.500   -2.9362
   23.000   -2.8841
   23.500   -2.8306
   24.000   -2.7765
   24.500   -2.7221
   25.000   -2.6680
   25.500   -2.6144
   26.000   -2.5614
   26.500   -2.5094
   27.000   -2.4584
   27.500   -2.4086
   28.000   -2.3598
   28.500   -2.3122
   29.000   -2.2657
   29.500   -2.2204
            </pre>

          </el-tab-pane>
          <el-tab-pane label="interstitial">
            <pre>conf_dir:/data1/yinan/autotest/new-Au/confs/mp-81
            Insert_ele-Struct: Inter_E(eV)  E(eV) equi_E(eV)
            struct-Au-3x3x3-000:   4.647  -85.410 -90.058
            struct-Au-3x3x3-001:   2.926  -87.132 -90.058
            </pre>

          </el-tab-pane>
          <el-tab-pane label="vacancy">
            <pre>conf_dir:/data1/yinan/autotest/new-Au/confs/mp-81
Structure: 	Vac_E(eV)  E(eV) equi_E(eV)
struct-3x3x3-000:   0.324  -83.386 -83.710
            </pre>

          </el-tab-pane>
          <el-tab-pane label="interstitial">
            <pre>conf_dir:/data1/yinan/autotest/new-Au/confs/mp-81
Insert_ele-Struct: Inter_E(eV)  E(eV) equi_E(eV)
struct-Au-3x3x3-000:   4.647  -85.410 -90.058
struct-Au-3x3x3-001:   2.926  -87.132 -90.058
            </pre>

          </el-tab-pane>
          <el-tab-pane label="surface">
            <pre>conf_dir:/data1/yinan/autotest/new-Au/confs/mp-81
Miller_Indices: 	Surf_E(J/m^2) EpA(eV) equi_EpA(eV)
struct-000-m1.1.1m:	   0.675     -3.090   -3.216
struct-001-m2.2.1m:	   0.915     -3.012   -3.216
struct-002-m1.1.0m:	   0.874     -3.028   -3.216
struct-003-m2.2.-1m:	   0.922     -3.032   -3.216
struct-004-m2.1.1m:	   0.930     -3.039   -3.216
struct-005-m2.1.-1m:	   0.998     -3.016   -3.216
struct-006-m2.1.-2m:	   0.963     -3.024   -3.216
struct-007-m2.0.-1m:	   0.879     -3.044   -3.216
struct-008-m2.-1.-1m:	   0.860     -3.027   -3.216
            </pre>

          </el-tab-pane>
        </el-tabs>

      </el-dialog>

      <el-dialog title="Raw data reference file" :visible.sync="rawDialogVisible" width="40%">
        <p>We recommend you to check the raw data with dpdata before you upload.</p>
        <pre>sys.000
├── set.000
│   ├── box.npy
│   ├── coord.npy
│   ├── energy.npy
│   ├── force.npy
│   └── virial.npy
├── type_map.raw
└── type.raw
sys.001
├── set.000
│   ├── box.npy
│   ├── coord.npy
│   ├── energy.npy
│   ├── force.npy
│   └── virial.npy
├── type_map.raw
└── type.raw
init.000/
├── set.000
│   ├── box.npy
│   ├── coord.npy
│   ├── energy.npy
│   ├── force.npy
│   └── virial.npy
├── type_map.raw
└── type.raw</pre>
      </el-dialog>

      <el-dialog title="Pseudopotential file" :visible.sync="pseudoVisible" width="40%">
        <p>
          If you generated the raw data by cp2k or Quantum Espresso, please upload the PseudoPotential file directly.
          If you generated the raw data by VASP, please fill in the MD5 hash function of your POTCAR file. You can create it by: $ md5sum POTCAR_1 POTCAR_2 … POTCAR_N > hash.md Then you can fill in the content of the hash.md file.
        </p>
      </el-dialog>
      <el-dialog title="Raw data notes" :visible.sync="rawNotesVisible" width="40%">
        <p>You may describe how you generated the raw data. If you did any ab-initio molecular dynamics
          simulations or other simulations when preparing the initial learning data, we encourage you
          to upload the parameter files here.
        </p>
      </el-dialog>
      <el-dialog title="Input Files Example" :visible.sync="modelParamVisible" width="40%">
        <ul>
          <li>*Input parameter: input.json</li>
          <li>*Checkpoint (from previous deepmd-kit train) :</li>
          <p style="line-height: 20px">
            model.ckpt.data-*<br>
            model.ckpt.index<br>
            model.ckpt.meta
          </p>
          <li>Output file: lcurve.out</li>
        </ul>
        <p style="line-height: 20px">You can package all the files and upload them together.</p>
      </el-dialog>

      <el-dialog title="Model" :visible.sync="modelDialogVisible" width="40%">
      <p style="line-height: 20px">graph.XXX.pb<br>
frozen_model.pb<br>
If you have more than one model, please the upload the zip file.</p>
      </el-dialog>

      <el-dialog title="Notes" :visible.sync="modelNotesVisible" width="40%">
        <p style="line-height: 20px">
          You may describe how you generated the model here. If you employed DP-Generator (dpgen), we encourage you to upload the parameter files of dpgen here.
        </p>
      </el-dialog>
    </div>


    <Footer></Footer>

  </div>
</template>

<script>
  import Vue from 'vue'
  import ElementPicker from "../components/ElementPicker";
  import Header from "../components/Header";
  import Footer from "../components/Footer";
  import style from "../common/style";
  import FileUpload from "../components/FileUpload";
  import MySelect from "../components/MySelect";
  const JSZip = require('jszip');

  let OSS = require('ali-oss');
    export default {
      name: "ProjectEdit",
      inject:['reload'],
      data(){
        return {
          pseudo: '',
          pseudoList: [],
          activePapers: [],
          isVasp: false,
          elementCount: 0,
          activeResults: [],
          showAddModel: false,
          showAddPaper: false,
          showAddResult: false,

          license:{
            radio1: false,
            radio2: false,
            radio3: false,
            radio4: false,
            radio5: false,
          },
          tasktypeOptions:[
            "DFT",
            "deepmd",
            "eam/alloy",
            "eam/fs",
            "meam",
            "lj",
            "others"
          ],
          taskOptions:[
            "elastic",
            "eos",
            "vacancy",
            "interstitial",
            "surface",
            "others"
          ],
          structureOptions:[
            "bcc",
            "fcc",
            "hcp",
            "ICO",
            "others"
          ],
          rawOptions:[
            'vasp',
            'Quantum Espresso',
            'cp2k',
            'others'
          ],
          modelOptions:[
            'v0.12',
            'v1.0',
            'v1.1',
            'v1.2',
            'others'
          ],
          dialogVisible: false,
          modelDialogVisible: false,
          modelNotesVisible: false,
          modelParamVisible: false,
          licenseVisible: false,
          rawDialogVisible: false,
          pseudoVisible: false,
          rawNotesVisible: false,
          structureVisible: false,

          test: 'Cu=Al',
          activeName: 'project',
          project_info: {},
          models_info: [],
          model_add_param_notice: false,
          papers_info: [],
          paper_details: [],
          paparsElementStr: [],
          paparAddElementStr: '',
          results_info: [],
          model_add: {
            version: "",
            data: "",
            notes: "",
            param: "",
            param_type: []
          },
          labelWidth: style.labelWidth,
          paper_add: {
            file: "",
            citations: "",
            title: "",
            elements: "",
            DOI: "",
            keywords: "",
            abstract: "",
            year: "",
            software: "",
            details: ""
          },
          paper_add_details: {
            author: '',
            volumn: '',
            number: '',
            pages: '',
            publisher: '',
            journal: '',
          },
          result_add: {
            structure: "",
            type: "",
            models: "",
            data: ''
          },
          //文件提示
          model_update_progress:[],
          model_add_progress: 0,
          raw_add_progress: false,
          result_update_progress:[],
          result_add_progress:0,
          //提交按钮禁用
          model_update_button:[],
          model_add_button: true,
          model_add_data: false,
          raw_add_button: true,
          result_update_button:[],
          result_add_button: true,


          rules1:{
            version: [
              { required: true, message: 'Input your version', trigger: 'blur' }
            ],
          },
          rules2:{
            citations: [
              { required: true, message: 'Input paper citation', trigger: 'blur' }
            ],
            title: [
              { required: true, message: 'Input paper title', trigger: 'blur' }
            ],
          },
          rules3:{
            structure: [
              { required: true, message: 'Input structure ', trigger: 'blur' }
            ],
          },

          file: ''

        }
      },
      created(){
        this.getData();
      },
      methods: {
        tasktypeSelect(value,result){
          console.log(value);
          result.models = value;
        },
        taskSelect(value,result){
          console.log(value);
          result.type = value;
        },
        structureSelect(value,result){
          console.log(value);
          result.structure = value;
        },
        codeSelect(value){
          console.log(value);
          let input_type = ''
          this.project_info.code_type = value;
          this.isVasp = false
          switch(value){
            case 'vasp':
              input_type = 'INCAR';
              this.isVasp = true
              break;
            case 'cp2k':
              input_type = 'input';
              break;
            case 'Quantum Espresso':
              input_type = 'input';
              break;
            default:
              input_type = 'none';
          }
          this.$set(this.project_info,'input_type',input_type);
        },
        modelVersionSelect(value,model){
          this.$set(model, 'version', value);
        },
        toGit(){
            window.open('https://github.com/deepmodeling/dpgen/wiki');
        },
        projectSubmit(){
          if(this.isVasp){
            this.project_info.pseudo = JSON.stringify({
              elements: this.pseudoList
            })
          }else{
            this.project_info.pseudo = JSON.stringify({
              url: this.pseudo
            });
          }
          console.log(this.project_info)

          this.axios.post('/v1/user/update_project', this.project_info).then(res=>{
            console.log(res.data)
            this.showMessage('Success',"project")
          }).catch(err=>{
            console.log(err)
            this.showMessage('Failure',"project")
          })
        },
        changeAvilable(){
          this.$set(this.project_info, 'available', -1 - this.project_info.available)
          console.log(this.project_info)
          this.axios.post('/v1/user/update_project', this.project_info).then(res=>{
            console.log(res.data)
            this.showMessage('Success',"project")
          }).catch(err=>{
            console.log(err)
            this.showMessage('Failure',"project")
          })
        },
        handleClick(tab, event){
          console.log(tab, event)
        },
        projectDelete: function(args){
          console.log(args)
          this.$confirm('Are you sure to delete the paper?', '', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
            this.axios.get('/v1/user/delete_data?project_id=' + this.project_info.project_id +'&type=' + args['type']).then(res=>{
              console.log(res.data)
              this.$router.push('user_projects')
            }).catch(err=>{
              console.log(err)
            })
            this.$message({
              type: 'success',
              message: 'Success!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: 'Cancel！'
            });
          });
        },

        //model相关
        versionSelect(type){
          if(type=='model_add'){
            this.model_add_data = true
          }
        },
        modelDelete: function(args){
          console.log(args)
          this.$confirm('Are you sure to delete the paper?', '', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
            this.axios.get('/v1/user/delete_data?project_id=' + args['project_id'] + '&model_id='+ args['model_id']+'&type=' + args['type']).then(res=>{
              console.log(res)
              this.reload();
            })
            this.$message({
              type: 'success',
              message: 'Success!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: 'Cancel！'
            });
          });
        },
        modelEditSubmit(){

          for(let model of this.models_info){
            model.param_type = JSON.stringify(model.param_type);
          }

          this.axios.post('/v1/user/update_models', {
            models_data: this.models_info, project_id: this.project_info['project_id']
          }).then(res=>{
            console.log(res.data)
            this.showMessage('Success',"model")
            // this.reload()
          }).catch(err=>{
            console.log(err)
            this.showMessage('Failure',"model")
          })
        },
        modelAddSubmit(){

          for(let model of this.models_info){
            console.log(model.param_type);
            this.$set(model,'param_type',JSON.stringify(model.param_type))
          }
          this.$set(this.model_add,'param_type',JSON.stringify(this.model_add.param_type))
          if(this.model_add.version){
            this.models_info[0] = this.model_add
          }
          let models_data = JSON.parse(JSON.stringify(this.models_info))
          this.axios.post('/v1/user/update_models', {
            models_data: models_data, project_id: this.project_info['project_id']
          }).then(res=>{
            this.showMessage('Success',"model")
            // this.reload()
          }).catch(err=>{
            console.log(err)
            this.showMessage('Failure',"model")
          })
        },

        // paper相关
        paperElementChange(value, index){
          this.paparsElementStr[index] = value
        },
        paperAddElementChange(value){
          console.log(value)
          this.paparAddElementStr = value
        },
        paperDelete(args){
          console.log(args)
          this.$confirm('Are you sure to delete the paper?', '', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
            this.axios.get('/v1/user/delete_data?project_id=' + args['project_id'] + '&paper_id=' + args['paper_id'] + '&type=' + args['type']).then(res => {
              console.log(res)
              // this.reload();
            })
            this.showMessage('Success', 'references')
          }).catch(() => {
            this.showMessage('Failure', 'references')
          });
        },
        paperEditSubmit(index){
          this.papers_info[index].elements = this.paparsElementStr[index]
          for(let i in this.papers_info){
            this.papers_info[i].details = this.paper_details[i]
          }
          this.axios.post('/v1/user/update_papers', {
            papers_data:this.papers_info, project_id: this.project_info['project_id']
          }).then(res=>{
            console.log(res.data)

            this.showMessage('Success', 'references')

          }).catch(err=>{
            console.log(err)
          })
        },
        paperAddSubmit(){
          this.paper_add.details = this.paper_add_details
          if(this.paper_add.title||this.paper_add.file){
            this.papers_info.push(this.paper_add)
          }

          this.axios.post('/v1/user/update_papers', {
            papers_data:this.papers_info, project_id: this.project_info['project_id']
          }).then(res=>{

            console.log(res.data)
            this.showAddPaper = false
            this.showMessage('Success', 'references')
          }).catch(err=>{
            console.log(err)
            this.showMessage('Failure', 'references')
          })
        },
        //result相关
        resultDelete: function(args){
          console.log(args)
          this.$confirm('Are you sure to delete the paper?', '', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
            this.axios.get('/v1/user/delete_data?project_id=' + args['project_id'] + '&result_id='+ args['result_id']+'&type=' + args['type']).then(res=>{
              console.log(res)
              this.showMessage('Success', 'results')
              this.reload();
            })
          }).catch(() => {
            this.showMessage('Failure', 'results')
          });
/*          if(confirm('Are you sure to delete the result?')){
            this.axios.get('/user/delete_data?project_id=' + args['project_id'] + '&result_id='+ args['result_id']+'&type=' + args['type']).then(res=>{
              console.log(res)
              this.reload();
            })
            // window.open('http://39.98.150.188:5002/dplibrary/user/delete_data?project_id=' + args['project_id'] + '&model_id='+ args['model_id']+'&type=' + args['type'])
          }*/
        },

        resultEditSubmit(){
          console.log({
            results_data: this.results_info, project_id: this.project_info['project_id']
          })
          this.axios.post('/v1/user/update_results', {
            results_data: this.results_info, project_id: this.project_info['project_id']
          }).then(res=>{

            console.log(res.data)
            this.showMessage('Success', 'results')

            // this.reload()
          }).catch(err=>{
            console.log(err)
            this.showMessage('Failure', 'results')
          })
        },
        resultAddSubmit(){
          let results_info = JSON.parse(JSON.stringify(this.results_info))
          if(this.result_add.structure){
            results_info.push(this.result_add)
          }

          console.log({
            results_data: results_info, project_id: this.project_info['project_id']
          })
          this.axios.post('/v1/user/update_results', {
            results_data: results_info, project_id: this.project_info['project_id']
          }).then(res=>{

            console.log(res.data)
            this.showMessage('Success', 'results')
            this.showAddResult = false
            // this.reload()
          }).catch(err=>{
            console.log(err)
            this.showMessage('Failure', 'results')
          })
        },
        resetForm(formName) {
          console.log(formName)
          this.$refs[formName].resetFields();
          if(formName=="paper_add"){
            this.$refs['elementPicker'].clearElement();
          }
        },
        rawNotesUpload(file){


          console.log(file)

          const reg = /.zip$/;
          if (reg.test(file.name)) {
            this.axios.get('/v1/user/get_token').then(res => {
              let storeAs = ''

              storeAs = this.$store.state.name + "/" + this.project_info['project_id'] + "/model/param/" + file.name;
              // storeAs = this.$store.state.name + "/" + this.project_info['project_id'] + "/model/" + file.name;

              console.log(res.data)
              let result = res.data.result;
              const client = new OSS({
                accessKeyId: result.AccessKeyId,
                accessKeySecret: result.AccessKeySecret,
                stsToken: result.SecurityToken,
                endpoint: 'oss-cn-beijing.aliyuncs.com',
                bucket: 'deeplibrary0'

              });

              const options = {
                callback: {
                  // 您的回调服务器地址
                  url: 'http://39.98.150.188:5002/dplibrary/test/test_post',
                  // 设置回调请求消息头中Host的值，如oss-cn-hangzhou.aliyuncs.com。
                  host: 'oss-cn-shenzhen.aliyuncs.com',
                  // 设置发起回调请求的Content-Type。
                  body: 'bucket=1',
                  contentType: 'application/x-www-form-urlencoded',
                  // 设置发起回调请求的自定义参数。
                  customValue: {
                    var1: 'value1',
                    var2: 'value2',
                  },
                },
              };
              client.put(storeAs, file, options).then(result => {
                this.$set(this.project_info,'notes',"https://deeplibrary0.oss-cn-beijing.aliyuncs.com/" + storeAs)
              }).catch(err => {
                console.log(err);
              })

            }).catch(err => {
              console.log(err);
            })
          }else {
            // = null;
            alert('请上传zip格式文件');
          }
        },
        paperFileUpload(file, paper){


          console.log(file)

          const reg = /.zip$/;
          if (1) {
            this.axios.get('/v1/user/get_token').then(res => {
              let storeAs = ''

              storeAs = this.$store.state.name + "/" + this.project_info['project_id'] + "/paper/" + file.name;
              // storeAs = this.$store.state.name + "/" + this.project_info['project_id'] + "/model/" + file.name;

              console.log(res.data)
              let result = res.data.result;
              const client = new OSS({
                accessKeyId: result.AccessKeyId,
                accessKeySecret: result.AccessKeySecret,
                stsToken: result.SecurityToken,
                endpoint: 'oss-cn-beijing.aliyuncs.com',
                bucket: 'deeplibrary0'

              });

              const options = {
                callback: {
                  // 您的回调服务器地址
                  url: 'http://39.98.150.188:5002/dplibrary/test/test_post',
                  // 设置回调请求消息头中Host的值，如oss-cn-hangzhou.aliyuncs.com。
                  host: 'oss-cn-shenzhen.aliyuncs.com',
                  // 设置发起回调请求的Content-Type。
                  body: 'bucket=1',
                  contentType: 'application/x-www-form-urlencoded',
                  // 设置发起回调请求的自定义参数。
                  customValue: {
                    var1: 'value1',
                    var2: 'value2',
                  },
                },
              };
              client.put(storeAs, file, options).then(result => {
                this.$set(paper,'file',"https://deeplibrary0.oss-cn-beijing.aliyuncs.com/" + storeAs)
              }).catch(err => {
                console.log(err);
              })

            }).catch(err => {
              console.log(err);
            })
          }else {
            // = null;
            alert('Check your paper file');
          }
        },
        pseudoUpload(file){


          console.log(file)

          const reg = /.zip$/;
          if (reg.test(file.name)) {
            this.axios.get('/v1/user/get_token').then(res => {
              let storeAs = ''

              storeAs = this.$store.state.name + "/" + this.project_info['project_id'] + "/model/param/" + file.name;
              // storeAs = this.$store.state.name + "/" + this.project_info['project_id'] + "/model/" + file.name;

              console.log(res.data)
              let result = res.data.result;
              const client = new OSS({
                accessKeyId: result.AccessKeyId,
                accessKeySecret: result.AccessKeySecret,
                stsToken: result.SecurityToken,
                endpoint: 'oss-cn-beijing.aliyuncs.com',
                bucket: 'deeplibrary0'

              });

              const options = {
                callback: {
                  // 您的回调服务器地址
                  url: 'http://39.98.150.188:5002/dplibrary/test/test_post',
                  // 设置回调请求消息头中Host的值，如oss-cn-hangzhou.aliyuncs.com。
                  host: 'oss-cn-shenzhen.aliyuncs.com',
                  // 设置发起回调请求的Content-Type。
                  body: 'bucket=1',
                  contentType: 'application/x-www-form-urlencoded',
                  // 设置发起回调请求的自定义参数。
                  customValue: {
                    var1: 'value1',
                    var2: 'value2',
                  },
                },
              };
              client.put(storeAs, file, options).then(result => {
                // this.$set(this,'psuedo',"https://deeplibrary0.oss-cn-beijing.aliyuncs.com/" + storeAs)
                console.log("https://deeplibrary0.oss-cn-beijing.aliyuncs.com/" + storeAs)
                this.pseudo = "https://deeplibrary0.oss-cn-beijing.aliyuncs.com/" + storeAs
              }).catch(err => {
                console.log(err);
              })

            }).catch(err => {
              console.log(err);
            })
          }else {
            // = null;
            alert('请上传zip格式文件');
          }
        },
        //flag, 1: 简单上传，2：分片
        fileUploadNotes(file,model){


          console.log(file)
          console.log(model)

          const reg = /.zip$/;
          if (1) {
            const new_zip = new JSZip();
            const entryList = [];
            console.log(model)
            this.axios.get('/v1/user/get_token').then(res => {
              let storeAs = ''

              storeAs = this.$store.state.name + "/" + this.project_info['project_id'] + "/model/notes/" + file.name;
              // storeAs = this.$store.state.name + "/" + this.project_info['project_id'] + "/model/" + file.name;

              console.log(res.data)
              let result = res.data.result;
              const client = new OSS({
                accessKeyId: result.AccessKeyId,
                accessKeySecret: result.AccessKeySecret,
                stsToken: result.SecurityToken,
                endpoint: 'oss-cn-beijing.aliyuncs.com',
                bucket: 'deeplibrary0'
              });

              const options = {
                callback: {
                  // 您的回调服务器地址
                  url: 'http://39.98.150.188:5002/dplibrary/test/test_post',
                  // 设置回调请求消息头中Host的值，如oss-cn-hangzhou.aliyuncs.com。
                  host: 'oss-cn-shenzhen.aliyuncs.com',
                  // 设置发起回调请求的Content-Type。
                  body: 'bucket=1',
                  contentType: 'application/x-www-form-urlencoded',
                  // 设置发起回调请求的自定义参数。
                  customValue: {
                    var1: 'value1',
                    var2: 'value2',
                  },
                },
              };
              client.put(storeAs, file, options).then(result => {
                this.$set(model,'notes',"https://deeplibrary0.oss-cn-beijing.aliyuncs.com/" + storeAs)
              }).catch(err => {
                console.log(err);
              })
            }, (e) => {
              console.log(e);
            })
          }else {
            // = null;
            alert('请上传zip格式文件');
          }
        },
        fileUploadParam(file,model){


          console.log(file)
          console.log(model)
          console.log(this.model_add)

          const reg = /.zip$/;
          if (reg.test(file.name)) {
            const new_zip = new JSZip();
            const entryList = [];
            new_zip.loadAsync(file).then((zip) => {
              zip.forEach((relativePath, zipEntry) => { // 2) print entries
                entryList.push(zipEntry.name);
                console.log(zipEntry.name);
              });


              for (let item of model.param_type) {
                if (entryList.indexOf(item) < 0) {
                  this.$alert('Your param file should consist of file: ' + item, '', {
                    confirmButtonText: 'OK',
                    showClose: true,
                    iconClass: "el-icon-circle-close",
                    center: true,
                    customClass: 'success-box',
                    callback: action => {
                      // this.$refs[ref].value = ""
                      // this[fileType].data=""
                      return
                    }
                  })
                  return
                }
              }


              console.log(model)
              this.axios.get('/v1/user/get_token').then(res => {
                let storeAs = ''

                storeAs = this.$store.state.name + "/" + this.project_info['project_id'] + "/model/param/" + file.name;
                // storeAs = this.$store.state.name + "/" + this.project_info['project_id'] + "/model/" + file.name;

                console.log(res.data)
                let result = res.data.result;
                const client = new OSS({
                  accessKeyId: result.AccessKeyId,
                  accessKeySecret: result.AccessKeySecret,
                  stsToken: result.SecurityToken,
                  endpoint: 'oss-cn-beijing.aliyuncs.com',
                  bucket: 'deeplibrary0'

                });

                const options = {
                  callback: {
                    // 您的回调服务器地址
                    url: 'http://39.98.150.188:5002/dplibrary/test/test_post',
                    // 设置回调请求消息头中Host的值，如oss-cn-hangzhou.aliyuncs.com。
                    host: 'oss-cn-shenzhen.aliyuncs.com',
                    // 设置发起回调请求的Content-Type。
                    body: 'bucket=1',
                    contentType: 'application/x-www-form-urlencoded',
                    // 设置发起回调请求的自定义参数。
                    customValue: {
                      var1: 'value1',
                      var2: 'value2',
                    },
                  },
                };
                client.put(storeAs, file, options).then(result => {
                  this.$set(model,'param',"https://deeplibrary0.oss-cn-beijing.aliyuncs.com/" + storeAs)
                }).catch(err => {
                  console.log(err);
                })


              }).catch(err => {
                console.log(err);
              })
            }, (e) => {
              console.log(e);
            })
          }else {
             // = null;
            alert('请上传zip格式文件');
          }
        },
        fileUploadInput(file){
          console.log(file)
          if(this.project_info!="none"){
            let pattern = this.project_info.input_type+  "$";

            let reg = new RegExp(pattern)
            console.log(reg)
            if(0){
              this.$alert('Your input file should consist of the type you choose!', '', {
                confirmButtonText: 'OK',
                showClose: true,
                iconClass: "el-icon-circle-check",
                center: true,
                customClass: 'success-box',
                callback: action => {
                  // this.$refs[ref].value = ""
                  // this[fileType].data=""
                }
              })
              return
            }
          }

          this.axios.get('/v1/user/get_token').then(res=> {
            let storeAs = this.$store.state.name + "/" + this.project_info['project_id'] + "/input/" + file.name;

            console.log(res.data)
            let result = res.data.result;
            const client = new OSS({
              accessKeyId: result.AccessKeyId,
              accessKeySecret: result.AccessKeySecret,
              stsToken: result.SecurityToken,
              endpoint: 'oss-cn-beijing.aliyuncs.com',
              bucket: 'deeplibrary0'

            });

            const options = {
              callback: {
                // 您的回调服务器地址
                url: 'http://39.98.150.188:5002/dplibrary/test/test_post',
                // 设置回调请求消息头中Host的值，如oss-cn-hangzhou.aliyuncs.com。
                host: 'oss-cn-shenzhen.aliyuncs.com',
                // 设置发起回调请求的Content-Type。
                body: 'bucket=1',
                contentType: 'application/x-www-form-urlencoded',
                // 设置发起回调请求的自定义参数。
                customValue: {
                  var1: 'value1',
                  var2: 'value2',
                },
              },
            };
            client.put(storeAs, file, options).then(result=>{
              this.$set(this.project_info,'input_file',"https://deeplibrary0.oss-cn-beijing.aliyuncs.com/" + storeAs)
              if(!reg.test(file.name)){
                this.$alert('Success','', {
                  confirmButtonText: 'OK',
                  showClose: true,
                  iconClass: "el-icon-circle-close",
                  center: true,
                  customClass: 'success-box',
                  callback: action => {
                    // this.$refs[ref].value = ""
                    // this[fileType].data=""
                  }
                })
                return
              }
            }).catch(err=>{
              console.log(err);
            })


          }).catch(err=>{
            console.log(err);
          })
        },
        fileAdd:function(file, fileType,flag){

          console.log(file)
          if(fileType=='model_add'){
            const reg = /.pb$/
            if(!reg.test(file.name)){
              this.$alert('model data should be type of \'.pb\'' ,'', {
                confirmButtonText: 'OK',
                showClose: true,
                iconClass: "el-icon-circle-close",
                center: true,
                customClass: 'success-box',
                callback: action => {
                  // this.$refs[ref].value = ""
                  // this[fileType].data=""
                }
              })
              return
            }
          }

          if(file.size>1024*1024*1024){
            this.$alert('Size of data <= 1G!' ,'', {
              confirmButtonText: 'OK',
              showClose: true,
              iconClass: "el-icon-circle-close",
              center: true,
              customClass: 'success-box',
              callback: action => {
                // this.$refs[ref].value = ""
                // this[fileType].data=""
              }
            })
          }

          // console.log(ref)
          let storeAs = this.$store.state.name + "/" + this.project_info['project_id'] + "/" + file.name;
          if(fileType=="model_add") {
            storeAs = this.$store.state.name + "/" + this.project_info['project_id'] + "/model/" +
              this.model_add.version + "/" + file.name;
          }

          console.log(storeAs)
          console.log(this[fileType])

          console.log(file.name + ' => ' + storeAs);
          this.axios.get('/v1/user/get_token').then(res=>{

            console.log(res.data)
            let result = res.data.result
            if(result=="failed"){
              this.$alert('Login Failure' ,'', {
                confirmButtonText: 'OK',
                showClose: true,
                iconClass: "el-icon-circle-close",
                center: true,
                customClass: 'success-box',
                callback: action => {
                  // this.reload()
                  return
                }
              })

            }else{
              this.$message({message:"Upload start!"})
              console.log({
                accessKeyId: result.AccessKeyId,
                accessKeySecret: result.AccessKeySecret,
                stsToken: result.SecurityToken,
                endpoint: 'oss-cn-beijing.aliyuncs.com',
                bucket: 'deeplibrary0',

              })

              let client = new OSS({
                accessKeyId: result.AccessKeyId,
                accessKeySecret: result.AccessKeySecret,
                stsToken: result.SecurityToken,
                endpoint: 'oss-cn-beijing.aliyuncs.com',
                bucket: 'deeplibrary0'

              })

              var that = this


              if(flag==1){
                //普通上传
                var options = {
                  callback: {
                    // 您的回调服务器地址，如http://oss-demo.aliyuncs.com:23450或http://127.0.0.1:9090。
                    url: 'http://39.98.150.188:5002/dplibrary/test/test_post',
                    // 设置回调请求消息头中Host的值，如oss-cn-hangzhou.aliyuncs.com。
                    host: 'oss-cn-hangzhou.aliyuncs.com',
                    // 设置发起回调请求的Content-Type。
                    body: 'bucket=1',
                    contentType: 'application/x-www-form-urlencoded',
                    // 设置发起回调请求的自定义参数。
                    customValue: {
                      var1: 'value1',
                      var2: 'value2'
                    }
                  }
                }

                client.put(storeAs, file, options).then(function (result) {
                  console.log(result);

                  that[fileType].data= "https://deeplibrary0.oss-cn-beijing.aliyuncs.com/" + storeAs
                  that[fileType].data_size= file.size


                  // that[ref] = false

                  //文件上传成功消息提示
                  that.$message({message:"Upload successfully！",type:"success"});

                }).catch(function (err) {
                  console.log(err);
                });


              }else if(flag==2){
                //分片上传
                async function multipartUpload() {
                  try {

                    if(fileType=="model_add"){
                      that.model_add_button = false
                    }else if(fileType=="project_info"){
                      that.raw_add_button = false
                    }else{
                      that.result_add_button = false
                    }
                    // object-key可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
                    let result = await client.multipartUpload(storeAs, file, {
                      /*                      parallel: 10, // 分片个数
                                            partSize: 1024 * 1024 * 10, // 分片至少为大小*/
                      partSize: 1024 * 1024 * 10,
                      progress: function (p, checkpoint) {
                        // 断点记录点。浏览器重启后无法直接继续上传，您需要手动触发继续上传。
                        console.log(checkpoint)
                        // p 展示是小数， 表示上传的进度 如 0 0.1 0.5 0.9 1
                        console.log(p)
                        // that[ref]=parseInt(p*100)
                        if(fileType=="model_add"){
                          that.model_add_progress = parseInt(p*100)
                        }else if(fileType=="project_info"){
                          that.raw_add_progress = parseInt(p*100)
                        }else{
                          that.resullt_add_progress = parseInt(p*100)
                        }

                      }
                    })
                    that.$message.success('success')
                    that[fileType].data= "https://deeplibrary0.oss-cn-beijing.aliyuncs.com/" + storeAs
                    that[fileType].data_size= file.size
                    if(fileType=="model_add"){
                      that.model_add_button = true
                    }else if(fileType=="project_info"){
                      that.raw_add_button = true
                    }else{
                      that.result_add_button = true
                    }
                    console.log(result)
                  } catch (e) {
                    console.log(e)
                  }
                }
                multipartUpload();
              }


            }

          }).catch(err=>{
            console.log(err)
          })
            // OSS.urlib是sdk内部封装的发送请求的逻辑，开发者可以使用任何发送请求的库向`sts-server`发送请求

        },
        fileUpdate:function(file, fileType, index,flag){

          if(fileType=='models_info'){
            const reg = /.pb$/
            if(!reg.test(file.name)){
              this.$alert('model data should be type of \'.pb\'' ,'', {
                confirmButtonText: 'OK',
                showClose: true,
                iconClass: "el-icon-circle-close",
                center: true,
                customClass: 'success-box',
                callback: action => {
                  // this.$refs[ref].value = ""
                  // this[fileType].data=""
                }
              })
              return
            }
          }


          if(file.size>1024*1024*1024){
            this.$alert('Size of data <= 1G!' ,'', {
              confirmButtonText: 'OK',
              showClose: true,
              iconClass: "el-icon-circle-close",
              center: true,
              customClass: 'success-box',
              callback: action => {
                // this.$refs[ref].value = ""
                return
              }
            })
          }

          //展示文件等待
          console.log(this.model_update_progress)

          console.log(this[fileType])
          let storeAs = this.$store.state.name + "/" + this.project_info['project_id'] + "/" + file.name;
          if(fileType=="models_info"){

            storeAs = this.$store.state.name + "/" + this.project_info['project_id'] + "/model/" +
              this.models_info[index].version + "/" + file.name;
            console.log(storeAs)
            console.log(file.name + ' => ' + storeAs);

          }

          // OSS.urlib是sdk内部封装的发送请求的逻辑，开发者可以使用任何发送请求的库向`sts-server`发送请求 http://39.98.150.188:5001/get_secret


          this.axios.get('/v1/user/get_token').then(res=>{
            console.log(res.data)
            let result = res.data.result
            if(result=="failed"){
              this.$alert('Login Failure' ,'', {
                confirmButtonText: 'OK',
                showClose: true,
                iconClass: "el-icon-circle-close",
                center: true,
                customClass: 'success-box',
                callback: action => {
                  // this.reload()
                  return
                }
              })

            }else{

              this.$message({message:"Upload start!"})
              console.log({
                accessKeyId: result.AccessKeyId,
                accessKeySecret: result.AccessKeySecret,
                stsToken: result.SecurityToken,
                endpoint: 'oss-cn-beijing.aliyuncs.com',
                bucket: 'deeplibrary0',

              })
              let client = new OSS({
                accessKeyId: result.AccessKeyId,
                accessKeySecret: result.AccessKeySecret,
                stsToken: result.SecurityToken,
                endpoint: 'oss-cn-beijing.aliyuncs.com',
                bucket: 'deeplibrary0'

              })

              var that = this

              if(flag==1){
                var options = {
                  callback: {
                    // 您的回调服务器地址，如http://oss-demo.aliyuncs.com:23450或http://127.0.0.1:9090。
                    url: 'http://39.98.150.188:5002/dplibrary/test/test_post',
                    // 设置回调请求消息头中Host的值，如oss-cn-hangzhou.aliyuncs.com。
                    host: 'oss-cn-hangzhou.aliyuncs.com',
                    // 设置发起回调请求的Content-Type。
                    body: 'bucket=1',
                    contentType: 'application/x-www-form-urlencoded',
                    // 设置发起回调请求的自定义参数。
                    customValue: {
                      var1: 'value1',
                      var2: 'value2'
                    }
                  }
                }
                client.put(storeAs, file, options).then(function (result) {
                  console.log(result);
                  that[fileType].data= "https://deeplibrary0.oss-cn-beijing.aliyuncs.com/" + storeAs
                  that[fileType].data_size= file.size

                  const h = that.$createElement;
                  that.$message({message:"Upload successfully！",type:"success"});
                }).catch(err=>{
                  console.log(err);
                })

              }else if(flag==2){
                if(fileType=="results_info"){
                  this.$set(this.result_update_progress,index,0)
                  this.$set(this.result_update_button,index,false)
                }else if(fileType=="models_info"){
                  this.$set(this.model_update_progress,index,0)
                  this.$set(this.model_update_button,index,false)

                }
                async function multipartUpload() {

                  try {
                    // object-key可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
                    let result = await client.multipartUpload(storeAs, file, {
                      /*                      parallel: 10, // 分片个数
                                            partSize: 1024 * 1024 * 10, // 分片至少为大小*/
                      partSize: 1024 * 1024 * 10,
                      progress: function (p, checkpoint) {
                        // 断点记录点。浏览器重启后无法直接继续上传，您需要手动触发继续上传。
                        console.log(checkpoint)
                        // p 展示是小数， 表示上传的进度 如 0 0.1 0.5 0.9 1
                        console.log(p)
                        if(fileType=="results_info"){
                          that.$set(that.result_update_progress,index,parseInt(p*100))
                        }else if(fileType=="models_info"){
                          that.$set(that.model_update_progress,index,parseInt(p*100))
                        }
                      }
                    })
                    that[fileType][index].data= "https://deeplibrary0.oss-cn-beijing.aliyuncs.com/" + storeAs
                    that[fileType][index].data_size= file.size
                    if(fileType=="results_info"){
                      that.$set(that.result_update_button,index,true)
                    }else if(fileType=="models_info"){
                      that.$set(that.model_update_button,index,true)
                    }
                    that.$message.success('success')
                    console.log(result)
                  } catch (e) {
                    console.log(e)
                  }
                }
                multipartUpload();
              }

            };
          }).catch(err=>{
            console.log(err);
          });


        },
        showMessage(message,activeTab){
          let icon = ''
          if(message=='Success'){
            icon = 'el-icon-circle-check'
          }else{
            icon = 'el-icon-circle-close'
          }
          this.$alert( message,'', {
            confirmButtonText: 'OK',
            showClose: true,
            iconClass: icon,
            center: true,
            customClass: 'success-box',
            callback: action => {
              if(this.$route.query.active!=activeTab){
                console.log("begin update")
                this.model_add = {}
                this.$router.replace({
                  name: 'ProjectEdit',
                  query:{
                    project_id: this.project_info['project_id'],
                    active: activeTab
                  }
                })
              }else{
                this.reload()
              }

              // this.activeName = activeTab
            }
          })
        },
        getData(){
          console.log(this.$route.query.active)
          if(this.$route.query.active){
            this.activeName = this.$route.query.active
          }
          this.axios.get('/v1/projects/project_details?project_id=' + this.$route.query.project_id).then(res=>{
            console.log(res.data)
            let data = res.data
            this.project_info = data.project_info
            this.models_info = data.models_info
            if(data.models_info.length){
              this.model_add = data.models_info[0]
            }

            for(let model of data.models_info){
              this.$set(model,"param_type",JSON.parse(model.param_type))
            }
            this.papers_info = data.papers_info
            console.log(this.papers_info)
            for(let item of this.papers_info){
              console.log(item)
              console.log(item.details)
              if(item.details){
                this.paper_details.push(JSON.parse(item.details))
              }else{
                this.paper_details.push({
                  author: '',
                  volumn: '',
                  number: '',
                  pages: '',
                  publisher: '',
                  journal: '',
                })
              }

            }
            console.log(this.paper_details)
            this.results_info = data.results_info
            //vasp
            let elements = this.project_info.elements.split('-')
            this.elementCount = elements.length
            console.log(elements)
            console.log(this.elementCount)
            if(this.project_info.code_type === "vasp"){
              this.isVasp = true
              if(this.project_info.pseudo.elements){
                this.pseudoList = JSON.parse(this.project_info.pseudo.elements)
              }else{
                for(let element of elements){
                  this.pseudoList = []
                  this.pseudoList.push({
                    element,
                    hash: ''
                  })
                }
              }

            }else{
              for(let element of elements){
                this.pseudoList = []
                this.pseudoList.push({
                  element,
                  hash: ''
                })
              }
              console.log(this.pseudoList)
              if(this.project_info.pseudo){
                this.pseudo = JSON.parse(this.project_info.pseudo).url
              }
            }
            for(let i=0;i<data.results_info.length;i++){
              this.result_update_progress.push(false)
              this.result_update_button.push(true)
            }
            for(let i=0;i<data.models_info.length;i++){
              this.model_update_progress.push(0)
              this.model_update_button.push(true)
            }
            this.formulaString = data.project_info.elements

            if(this.$store.state.email_verify==0){
              console.log(this.$store.state.email_verify)
              this.$message({
                message: "Please verify your email for file upload!",
                type: 'warning'
              })

            }


          }).catch(err=>{
            console.log(err)
          })
        }
      },
      watch: {
        $route:{
          handler(){
            if(this.$route.query.active){
              //调数据
              console.log("dfsadfa")
              this.getData();
            }
          },
          deep: true,
          immediate: true

        }
/*        $route (to, from) {
          console.log(this.$router)
          this.$router.go(0)
        }*/
      },
      components:{
        ElementPicker,
        Header,
        Footer,
        FileUpload,
        MySelect
      }
    }
</script>

<style>

  .el-dialog__body{
    word-break: break-word;
  }

  .referbox{
    height: 500px;
    overflow: scroll;
  }

  #project_edit .el-button{
    font-size: 22px!important;
  }

  .success-box .el-button--small{
    background-color: #303479;
    border-radius: 15px!important;
    padding: 10px 20px;
    border: 0;
  }

  .success-box  .el-icon-circle-check{
    color: #303479;
    height: 40px;
    font-size: 50px!important;
    font-weight: 500;
  }

  .success-box  .el-icon-circle-close{
    color: #c02c38;
    height: 40px;
    font-size: 50px!important;
    font-weight: 500;
  }

  .success-box .el-message-box__content{
    padding-bottom: 30px;
    padding-top: 30px;
    font-size: 22px;
    font-family: "Microsoft Ya Hei";
  }

  .success-box {
    border-radius: 15px;
  }

</style>

<style scoped>

  .header{
    height: 100px;
    background: url("../assets/images/详情页头图.png");
    background-size:100% 100%;
  }

  .body{
    min-height: 800px;
  }

  #project_edit >>> .el-form-item__label{
    font-weight: 700;
    color: #353535;
    font-size: 20px;
  }

  #project_edit >>>.el-input{
    font-size: 22px;
  }
  #project_edit >>>.el-form-item__content{
    font-size: 22px;
  }

  #project_edit >>> .el-input__inner{
    background-color: #f6f6f6;
  }

  .button-share{
    background-color: #e47a00;
    color: #fff;
    border: 0;
  }
  .button-cancel{
    background-color: #e1e1e1;
    color: #fff;
    border: 0;
  }
  .button-delete{
    background-color: #d5334a!important;
    color: #fff;
    border: 0;
  }
  .button-submit{
    background-color: #33327e;
    color: #fff;
    border: 0;
  }

  .button-submit-disable{
    background-color: #b9bade!important;
    color: #fcffff;
    border: 0;
  }

  .icon-img{
    height: 24px;
    vertical-align:middle;
  }

  #project_edit >>> .el-textarea__inner{
    background-color: #f6f6f6;
    resize: none;
    font-size: 22px;
  }



  .card{
    border-radius: 10px;
    box-shadow: 0 0 10px #e6e6f2;
    position: relative;
    padding:20px;
    z-index: 100;
    width: 1400px;
    margin: 20px auto;
  }

  .center-panel >>> .el-table__body{
    border-spacing: 0 30px
  }

  .center-panel >>> .el-table thead tr{
    height: 80px;
    border-radius: 20px;
  }

  .center-panel >>> tbody tr{
    height: 120px;
    margin-top: 10px;
    box-shadow: 0px 0px 20px #e9e9f4;
    border-collapse: separate;
    cellspacing:2px;
    cellpadding:2px;

  }

  .center-panel >>> .el-table__header-wrapper{
    border-radius: 20px;
  }

  .center-panel >>> td{
    border: 0!important;
  }

  .license-button{
    float:right;
    color: #303479;
    padding: 10px;
    cursor: pointer;
  }

  .form-margin{
    margin-top: 30px;
    margin-bottom: 10px;
  }

  .button-row{
    margin: 10px 0;
    text-align: center;
  }

  .hr-margin{
    margin-top: 20px;
  }

  .file-notice{
    color: red;
    font-size: 18px;
    font-family: "Microsoft Ya Hei";
  }

  .cancel-text{
    vertical-align: middle;
    line-height: 24px;
  }

</style>

<style scoped lang="scss">
#project_edit {
  .main-tab >>> {
    .el-tabs__nav-scroll {
      margin-top: 20px;
    }

    .el-tabs__nav-wrap::after {
      height: 0;
    }

    .el-tabs__item.is-active {
      color: #fff;
      background-color: #303479;
    }

    .el-tabs__item {
      color: #333333;
      font-family: "Microsoft Ya Hei";
      font-size: 22px;
      margin: 10px 30px;
      padding: 0;
      width: 200px;
      box-shadow: 0 0 4px #8c939d;
      border-radius: 10px;
      line-height: 60px;
      height: 60px;
      text-align: center;
    }

    .el-tabs__nav {
      width: 1400px;
      margin: 0 260px;
    }

    .el-tabs__active-bar {
      height: 0;
    }
  }

  .dialog-tab{
    height: 400px;
    overflow: scroll;

    >>> .el-tabs__content{
      overflow: scroll;
    }
  }

  .dialog_title {
    line-height: 24PX;
    font-size: 18PX;
    color: #303133;
  }
  .button-add{
    background-color: #303479!important;
    color: #fff;
    border: 0;
    margin-top: 20px;
  }
}



</style>

