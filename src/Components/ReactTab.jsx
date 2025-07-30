
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import JobCard from './JobCard';

const ReactTab = () => {
  const tabList=['Web','Graphics','Digital marketing']
  const tabPanel=['Web','Graphics','Digital marketing']
  return (
    <div className='my-8 max-auto  mx-8'>
      <Tabs>
<div className='flex justify-center items-center'>
<TabList>
  {
    tabList.map((tab, index) => {
      return (
        <Tab
          key={index}
        >
          {tab}
        </Tab>
      )
    })
  }
</TabList>
</div>

{
  tabPanel.map((panel, index) => {
    return (
      <TabPanel key={index}>
        <h2 className='my-5'>Category: {panel}</h2>
        <JobCard></JobCard>
      </TabPanel>
    )
  })
}
      </Tabs>
    </div>
  );
};

export default ReactTab;