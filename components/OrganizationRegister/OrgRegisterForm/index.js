import Dropdown from "common/components/DropDown"
import PhoneInputBox from "@/components/common/FormComponents/PhoneInputBox"
import Button from "common/components/Button"
import LabeledInputs from "common/components/LabeledInput"
import { orgInputData } from "../helper/orgResiter.helper"
import styles from '../organizationRegister.module.scss' ;
import { useRecoilState } from "recoil"
import { OrganizationDetailsAtom } from "@/state/atoms/organizations.atom"
import { changeHandler } from "@/helper/common.helper"
import LabeledDropdown from "@/components/common/FormComponents/LabeledDropdown"


const OrgRegisterForm = () => {

    const [orgTempDetails , setOrgTempDetails] = useRecoilState(OrganizationDetailsAtom);


const INPUT_OBJECT = {
        'normalInput': function (obj={}){
            // console.log(obj?.inputOptions,'inoutoptionss') 
            // return <>hii</>;
            obj.inputOptions.value = orgTempDetails[`${obj?.inputOptions?.inputName}`]
            return <LabeledInputs inputOptions={obj?.inputOptions} styleClass={styles?.inputStyle} changeHandler={(e) => {
                changeHandler(e, orgTempDetails, setOrgTempDetails);
              }}/>
        } ,
        'phoneInput': function (obj={}){
            return <PhoneInputBox />
        } ,
        'uploadInput': function (obj={}){
            // return <LabeledInputs />
        } ,
        'dropDown': function (obj={}){
            const val = orgTempDetails[`${obj?.inputOptions?.inputName}`] ;
            obj.inputOptions.value = {value:val , label:val } ;
            return <Dropdown dropdownOptions={obj?.inputOptions} styleClass={styles?.inputStyle} changeHandler={(e) => changeHandler(e, orgTempDetails, setOrgTempDetails, `${obj?.inputOptions?.inputName}`)} />
        } ,
        'textArea': function (obj={}){
            // return <LabeledInputs />
        } 
    }
  return (
    <div className={`${styles?.orgRegisterContainer}`}>
      {orgInputData?.map((form) => {
        return <div>{INPUT_OBJECT[`${form?.type}`](form)}</div>
      })}
      <button onClick={()=>{console.log(orgTempDetails)}}>hello</button>
    </div>
  )
}

export default OrgRegisterForm ;