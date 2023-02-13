import { API_LINKS } from '@/api/api.helper';
import OrgHomepage from '@/components/OrgHomepage';
import { ORG_DOMAINS } from '@/helper/constants.helper';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import HomePage from '../../components/HomePage';

const Home = () => {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const [org, setOrg] = useState(null);
  const [origin, setOrigin] = useState('');
  const [orgData, setOrgData] = useRecoilState(UsersOrganizationAtom);

  useEffect(async () => {
    setOrigin(window?.location?.origin);
    ref.current = document.body;
    const _org = await getOrg();
    let data = _org?.data;
    // const _org = {
    //   data: {
    //     org_id: 'Wmljb3BzIFN0YWdpbmcgSW5zdGFuY2V6aWNvcHMuY29tU29mdHdhcmU=',
    //     name: 'Zicops Staging Instance',
    //     logo_url:
    //       'https://storage.googleapis.com/users-zicops-one/orgs/logos/Wmljb3BzIFN0YWdpbmcgSW5zdGFuY2V6aWNvcHMuY29tU29mdHdhcmU%3D/logo.png?X-Goog-Algorithm=GOOG4-RSA-SHA256\u0026X-Goog-Credential=zicops-cc%40zicops-one.iam.gserviceaccount.com%2F20221225%2Fauto%2Fstorage%2Fgoog4_request\u0026X-Goog-Date=20221225T070409Z\u0026X-Goog-Expires=86399\u0026X-Goog-Signature=7ec44482773c422a3f4366165e5af58db8f20e91e248ed3b9aa84f23218b7c20a53c144d838c67f2291c4bcfc62d153453904cf15087603c59d0a5db1ae3d3b0a172d800612d3258ea81c917a90f823c10a925f26b4d0ac0dd5a416445d4634c974fa7f025657aaadfbca411a38865af68a7be61d902642d022fcc3e9e842b715c41760e7b3e406ea8438c44626042f6083ce0f7ea22417c67c8072fd289fb5e2e9d733f8576c067253c9774645bdc2be8cea65d5c96aa88997a41dad6ceb3e2cb06b39af08c750d54afcc7057bf5cdeda309fc85742f47499ead9fdb6b8f4b30f447aa8261242db7ae0909aa2a9885417f78b9dbb25b89c6c8ed5a499c4eec9\u0026X-Goog-SignedHeaders=host',
    //     industry: 'Software',
    //     type: 'Private',
    //     subdomain: 'staging.zicops.com',
    //     employee_count: 100,
    //     website: 'zicops.com',
    //     linkedin_url: '',
    //     facebook_url: '',
    //     twitter_url: '',
    //     status: 'Active',
    //     created_at: 'puneet@zicops.com',
    //     updated_at: 'puneet@zicops.com',
    //     created_by: 'puneet@zicops.com',
    //     updated_by: 'puneet@zicops.com'
    //   }
    // };
    setOrg(_org?.data);
    setOrgData((prev) => ({
      ...prev,
      logo_url: _org?.data?.logo_url,
      organization_name: _org?.data?.name,
      organization_id: _org?.data?.org_id
    }));
    sessionStorage?.setItem('org_id',_org?.data?.org_id);

    setMounted(true);
  }, []);

  async function getOrg() {
    if(!API_LINKS?.getOrg?.split('/')?.[0]) return {};
    const data = await fetch(API_LINKS?.getOrg);
    return await data.json();
  }

  if (!mounted) return <></>;
  return (
    <>
      {/* <Head>
        <script src="https://aframe.io/releases/0.5.0/aframe.min.js"></script>
      </Head>

      {mounted ? createPortal(<VrBackground />, ref.current) : null} */}
      {/* {org ? <OrgHomepage data={org} /> : <HomePage />} */}
      {!ORG_DOMAINS?.includes(origin) ? <OrgHomepage data={org} /> : <HomePage />}
      {/* {(org && org?.subdomain !== 'zicops.com') || !ORG_DOMAINS?.includes(origin) ? (
        <OrgHomepage data={org} />
      ) : (
        <HomePage />
      )} */}
    </>
  );
};

export default Home;
