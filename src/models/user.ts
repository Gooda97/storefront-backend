import client from "../database";
import bcrypt from 'bcrypt'

export type User = {
    id?: number;
    username: string;
    first_name: string;
    last_name: string;
    password: string;
  };

const {
    PEPPER,
    SALT_ROUNDS
} = process.env;

export class user_table {
    async index(): Promise<User[]> {
        try 
        {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users';
        
            const result = await conn.query(sql);
        
            conn.release();
        
            return result.rows;
        } 
        catch (err) 
        {
            throw new Error(`unable to get users: ${err}`);
        } 
    }
    
    async show(id: number): Promise<User> 
    {
        try
        {
            const sql = 'SELECT * FROM users WHERE id=($1)'
            const conn = await client.connect()
        
            const result = await conn.query(sql, [id])
        
            conn.release()
        
            return result.rows[0]
        } 
        catch (err) 
        {
            throw new Error(`unable show the user wit id: ${id} .. ${err}`);
        }
    }

    async create(u: User): Promise<User> 
    {
        try 
        {
          const conn = await client.connect();
          const sql = 'INSERT INTO users (username, first_name, last_name, password) values ($1, $2, $3, $4) RETURNING *';
          const result = await conn.query(sql, [u.username, u.first_name, u.last_name, (bcrypt.hashSync(`${u.password}${PEPPER}`, parseInt(SALT_ROUNDS as unknown as string)).toString())]);
          const user = result.rows[0];
          conn.release();
          return user;
        } catch (err) 
        {
          throw new Error(`Unable to create a new user: ${err}`);
        }
    }
    
    async delete(id: number): Promise<User>
    {
        try 
        {
            const conn = await client.connect();
            const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
            
            const result = await conn.query(sql, [id])

            const user = result.rows[0]

            conn.release()

            return user
        }
        catch(err)
        {
          throw new Error(`unable delete user (${id}): ${err}`)
        }
    }
    
    async update (newdata: User): Promise<User> 
    {
        const { id, first_name, last_name, password} = newdata
    
        try 
        {
            const sql = "UPDATE users SET first_name = $1, last_name= $2, password= $3 WHERE id = $4 RETURNING *"
            const conn = await client.connect()
            const result = await conn.query(sql, [first_name, last_name, (bcrypt.hashSync(`${password}${PEPPER}`, parseInt(SALT_ROUNDS as unknown as string)).toString()), id])
    
            const user = result.rows[0];

            conn.release()

            return user
        } 
        catch (err) 
        {
            throw new Error(`${err}`)
        }
    }
    async authenticate (username: string, password: string): Promise<boolean> {
        try{
            const conn = await client.connect();
            const sql = 'SELECT password FROM users WHERE username=$1';
            const result = await conn.query(sql, [username]);
            if(result.rows.length !=0) {
                if(bcrypt.compareSync(`${password}${PEPPER}`, result.rows[0].password)) {
                    return true;
                }
                conn.release();
                return false;
            }
            conn.release();
            return false;
        }catch(err) {
            throw new Error(`${err}`)
        }
    }
    async deleteAll()
    {
        try 
        {
            const conn = await client.connect();
            const sql = 'DELETE FROM users';
            const del = conn.query(sql);
        }
        catch(err)
        {
          throw new Error(`${err}`)
        }
    }
}

export default User;
    