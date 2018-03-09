import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import Eventualities from './eventualities';
import EventualitiesList from './eventualitiesList';
import { emptyTabEventuality } from '../../state/eventuality/action';

const TabPane = Tabs.TabPane;

class EventualityTabs extends Component {
  state = {
    currentTab: '1',
  };

  componentWillMount() {
    this.props.emptyTabEventuality();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.defaultTab === null &&
      nextProps.defaultTab !== null
    ) {
      this.onChange(nextProps.defaultTab);
    }
  }

  onChange = (currentTab) => {
    this.setState({ currentTab });
  }

  render() {
    const { changeCurrent } = this.props;
    const { currentTab } = this.state;

    const dataTabs = [
      {
        index: 1,
        text: 'Eventualidades',
        component: <EventualitiesList />,
      },
      {
        index: 2,
        text: 'Importación',
        component: <Eventualities changeCurrent={changeCurrent} />,
      },
    ];

    return (
      <Tabs activeKey={currentTab.toString()} onChange={this.onChange}>
        {dataTabs.map(data => (
          <TabPane tab={data.text} key={data.index}>
            {data.component}
          </TabPane>
        ))}
      </Tabs>
    );
  }
}

const mapStateToProps = state => ({
  defaultTab: state.eventuality.defaultTab,
});

export default connect(
  mapStateToProps,
  { emptyTabEventuality },
)(EventualityTabs);
