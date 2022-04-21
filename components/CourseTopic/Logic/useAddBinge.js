import { useRecoilState } from 'recoil';
import { BingeAtom } from '../../../state/atoms/module.atoms';

export default function useAddBinge() {
  // recoil state
  const [bingeData, setBingeData] = useRecoilState(BingeAtom);

  // input handler
  function handleBingeInput(e) {
    if (e.target.type === 'checkbox') {
      return setBingeData({
        ...bingeData,
        [e.target.name]: e.target.checked
      });
    }

    const value = parseInt(e.target.value) || '';
    setBingeData({
      ...bingeData,
      [e.target.name]: value
    });

    console.log(bingeData);
  }

  return { handleBingeInput };
}
