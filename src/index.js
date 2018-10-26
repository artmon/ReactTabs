import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  Tabs,
  DragTabList,
  DragTab,
  PanelList,
  Panel,
  ExtraButton
} from "react-tabtab";
import Plus from "react-icons/lib/fa/plus";
import { arrayMove } from "react-sortable-hoc";
import { makeData } from "./utils";

export default class MyTabs extends Component {
  constructor(props) {
    super(props);
    const tabs = makeData(100, "Drag");

    this.state = {
      tabs,
      activeIndex: 0,
      numberOfTabs: tabs.length,
      showExtra: true,
      showModal: true,
      showArrow: true
    };
  }

  handleExtraButton = () => {
    const { tabs } = this.state;
    const newTabs = [
      ...tabs,
      { title: "New Draggable Tab", content: "New Content" }
    ];
    this.setState({ tabs: newTabs, activeIndex: newTabs.length - 1 });
  };

  handleTabChange = index => {
    this.setState({ activeIndex: index });
  };

  handleTabSequenceChange = ({ oldIndex, newIndex }) => {
    const { tabs } = this.state;
    const updateTabs = arrayMove(tabs, oldIndex, newIndex);
    this.setState({ tabs: updateTabs, activeIndex: newIndex });
  };

  handleEdit = ({ type, index }) => {
    let { tabs, activeIndex } = this.state;
    if (type === "delete") {
      tabs.splice(index, 1);
    }
    if (index - 1 >= 0) {
      activeIndex = index - 1;
    } else {
      activeIndex = 0;
    }
    this.setState({ tabs, activeIndex });
  };

  handleChangeTabsNumber = e => {
    let number = e.target.value;
    if (number <= 0 || !number) {
      number = 1;
    }
    if (number > 3000) {
      number = 3000;
    }
    const tabs = makeData(number, "Drag");
    this.setState({ tabs, activeIndex: 0, numberOfTabs: number });
  };

  handleToggleExtra = e => {
    const showExtra = e.target.checked;
    this.setState({ showExtra });
  };

  handleToggleModal = e => {
    const showModal = e.target.checked;
    this.setState({ showModal });
  };

  handleToggleArrow = e => {
    const showArrow = e.target.checked;
    this.setState({ showArrow });
  };

  render() {
    const {
      tabs,
      activeIndex,
      numberOfTabs,
      showArrow,
      showModal,
      showExtra
    } = this.state;
    const tabTemplate = [];
    const panelTemplate = [];
    tabs.forEach((tab, i) => {
      const closable = tabs.length > 1;
      tabTemplate.push(
        <DragTab key={i} closable={closable}>
          {tab.title}
        </DragTab>
      );
      panelTemplate.push(<Panel key={i}>{tab.content}</Panel>);
    });

    return (
      <div>
        <Tabs
          onTabEdit={this.handleEdit}
          onTabChange={this.handleTabChange}
          activeIndex={activeIndex}
          customStyle={this.props.customStyle}
          onTabSequenceChange={this.handleTabSequenceChange}
          showModalButton={showModal}
          showArrowButton={showArrow}
          ExtraButton={
            showExtra && (
              <ExtraButton onClick={this.handleExtraButton}>
                <Plus />
              </ExtraButton>
            )
          }
        >
          <DragTabList>{tabTemplate}</DragTabList>
          <PanelList>{panelTemplate}</PanelList>
        </Tabs>
      </div>
    );
  }
}
ReactDOM.render(<MyTabs />, document.getElementById("root"));
