// components\common\DeleteBtn\index.js

import { DeleteConfirmDataAtom } from '@/state/atoms/popUp.atom';
import { useRecoilState } from 'recoil';

export default function DeleteBtn({
  id = null,
  confrimMsg = null,
  mutation = null,
  resKey = null,
  onDelete = () => {},
  beforeDelete = () => {
    return true;
  },
  deleteCondition = null,
  variableObj = {}
}) {
  const [deleteConfirmData, setDeleteConfirmData] = useRecoilState(DeleteConfirmDataAtom);

  return (
    <>
      <button
        style={{ cursor: 'pointer', backgroundColor: 'transparent', outline: '0', border: '0' }}
        onClick={() => {
          const shouldDelete = !!deleteCondition ? deleteCondition() : true;

          if (shouldDelete) {
            setDeleteConfirmData({
              showConfirm: true,
              id: id,
              mutation: mutation,
              confirmMsg: confrimMsg,
              onDelete: onDelete,
              beforeDelete: beforeDelete,
              resKey: resKey,
              variableObj: variableObj || {}
            });
          }
        }}>
        <img src="/images/svg/delete-outline.svg" width={20}></img>
      </button>
    </>
  );
}
