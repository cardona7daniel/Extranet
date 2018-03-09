import React from 'react';
import { Tabs } from 'antd';
import PropTypes from 'prop-types';

const TabPane = Tabs.TabPane;

function Tab({ dataTabs, defaultTab = '1' }) {
  return (
    <Tabs defaultActiveKey={defaultTab}>
      {dataTabs.map(data => (
        <TabPane tab={data.text} key={data.index}>
          {data.component}
        </TabPane>
      ))}
    </Tabs>
  );
}

Tab.propTypes = {
  dataTabs: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      index: PropTypes.number,
      component: PropTypes.object,
    }),
  ).isRequired,
};

export default Tab;
