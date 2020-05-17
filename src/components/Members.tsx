import * as React from "react";
import { Members, Member, MemberData } from "@daostack/arc.react";

export const DAOMembers = () => (
  <Members from="DAO">
    <Member.Data>
      {(memberData: MemberData) => (
        <>
          <div>{"Address: " + memberData.address}</div>
          <div>{"Reputation: " + memberData.reputation}</div>
        </>
      )}
    </Member.Data>
  </Members>
);
