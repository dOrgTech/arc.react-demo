import React from "react";
import { Members, Member, MemberData, DAOData } from "@daostack/arc.react";
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";

interface IProps {
  dao?: DAOData
}

export function DAOMembers(props: IProps) {
  return (
    <Members from="DAO">
      <Member.Data>
        {(memberData: MemberData) => {
          const memberPercentage = (Number(memberData.reputation) * 100) / Number(props.dao?.reputationTotalSupply)
          return (
            <List dense={true}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar aria-label="New proposal">
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText style={{ width: 330 }} primary={memberData.address} secondary={`${memberPercentage.toFixed(2)} % Rep.`} />
              </ListItem>
              <Divider />
            </List>
          );
        }}
      </Member.Data>
    </Members>
  );
}
